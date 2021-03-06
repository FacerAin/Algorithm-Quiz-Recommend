import pandas as pd
from bs4 import BeautifulSoup
import requests
import csv
import json
import numpy as np
import pymysql
from dotenv import load_dotenv
import os
import sys
import json
load_dotenv(verbose=True)


users_pd = pd.DataFrame(columns=['u_name', 'u_bj_id'])
users = set()
problems = set()

def setup():
    db = pymysql.connect(host='127.0.0.1', user='root', port=int(os.getenv('PORT')), db='algodb', charset='utf8', passwd = str(os.getenv('PASSWORD')) )
    db_cursor = db.cursor(pymysql.cursors.DictCursor)
    return db, db_cursor
    
def save_user(db, db_cursor):
    query = '''INSERT INTO user (u_id, u_name, u_password) VALUES ('{}', '{}', "{}");'''.format('syw5141','송용우','1234')
    db_cursor.execute(query)
    db.commit()

def save_problem_info(db, db_cursor, problems_pd):
    for i in problems_pd.index:
        p_row = problems_pd.loc[i]
        p_bj_id = int(p_row['p_bj_id'])
        p_name = str(p_row['p_name']).replace("'","\\'")[:99]
        p_level = int(p_row['p_level'])
        p_link = str('https://www.acmicpc.net/problem/' + str(int(p_row['p_bj_id'])))
        p_solve_num = int(p_row['p_submit_num'])
        p_correct_num = int(p_row['p_correct_num'])
        p_answer_rate = round(float(p_row['p_answer_rate'][:-1]), 2)
        query = '''INSERT INTO problem (p_id, p_bj_id, p_level, p_link, submit_num, correct_num, answer_rate, p_name) VALUES ({},{}, {}, '{}', {}, {}, {}, '{}');'''.format(i,p_bj_id, p_level, p_link, p_solve_num, p_correct_num, p_answer_rate, p_name)
        db_cursor.execute(query)
    db.commit()




def isNaN(num):
    return num != num

def get_school_member(school_id):
    page_num = 0
    while (1):
        res=requests.get('https://www.acmicpc.net/school/ranklist/{}/{}'.format(school_id,page_num))
        if res.status_code == 404:
            break
        bs = BeautifulSoup(res.text,'html.parser')
        userlists_a = bs.select('#ranklist > tbody > tr > td:nth-child(2) > a')
        for userlist in userlists_a:
            user = userlist['href'].split('/')[-1]
            users.add(user)
        page_num += 1

def get_problem_by_user(user_id):
    res=requests.get('https://acmicpc.net/user/'+user_id)
    if res.status_code == 404:
        return
    soup = BeautifulSoup(res.text, 'html.parser')
    problemNums_a = soup.select('body > div.wrapper > div.container.content > div.row > div:nth-child(2) > div > div.col-md-9 > div:nth-child(1) > div.panel-body > a')
    for problemNum_a in problemNums_a:
        problemNum = problemNum_a['href'].split('/')[-1]
        problems.add(problemNum)

def get_problem_by_category():
    pageNum=1
    res=requests.get('https://api.solved.ac/v2/tags/stats.json?page={}'.format(pageNum))
    taglist = []
    taglist_r=json.loads(res.text)
    totalPages = taglist_r['result']['total_page']
    for pageNum in range(1,totalPages+1):
        res=requests.get('https://api.solved.ac/v2/tags/stats.json?page={}'.format(pageNum))
        taglist_r=json.loads(res.text)
        taglist.extend(taglist_r['result']['tags'])
    for tag in taglist:
        p_list = []
        pageNum = 1
        res=requests.get('https://api.solved.ac/v2/search/problems.json?query=solvable:true+tag:{}&page={}&sort=id&sort_direction=ascending'.format(tag['tag_name'],pageNum))
        p_r=json.loads(res.text)
        totalPages=p_r['result']['total_page']
        p_list.extend(p_r['result']['problems'])
        for pageNum in range(2,totalPages+1):
            res=requests.get('https://api.solved.ac/v2/search/problems.json?query=solvable:true+tag:{}&page={}&sort=id&sort_direction=ascending'.format(tag['tag_name'],pageNum))
            p_r=json.loads(res.text)
            p_list.extend(p_r['result']['problems'])
        idx = 0
        p_list_len = len(p_list)
        for pitem in p_list:
            problems.add(pitem['id']) 

def get_problem_info(problem_id, problems_pd):
    problem_id = int(problem_id)
    res = requests.get('https://www.acmicpc.net/problem/{}'.format(problem_id))
    soup = BeautifulSoup(res.text, 'html.parser')
    Ptitle = soup.select('#problem_title')[0].text
    soup=soup.select('#problem-info > tbody > tr > td')
    PsubmitNum = soup[2].text
    PcorrectNum = soup[4].text
    PanswerRate = soup[5].text
    problems_pd.loc[problems_pd.p_bj_id==problem_id,'p_name'] = Ptitle
    problems_pd.loc[problems_pd.p_bj_id==problem_id,'p_submit_num'] = PsubmitNum
    problems_pd.loc[problems_pd.p_bj_id==problem_id,'p_correct_num'] = PcorrectNum
    problems_pd.loc[problems_pd.p_bj_id==problem_id,'p_answer_rate'] = PanswerRate
    return problems_pd

def get_level(problem_id, problems_pd):
    res=requests.get('https://api.solved.ac/v2/search/problems.json?query={}&page=1&sort=id&sort_direction=ascending'.format(problem_id))
    data_json = json.loads(res.text)
    for data in data_json['result']['problems']:
        if int(data['id'])==int(problem_id):
            problems_pd.loc[problems_pd.p_bj_id==int(problem_id),'p_level'] = data["level"]
            break
    return problems_pd


def get_category(problems_pd):
    problems_pd.sort_values(['p_bj_id'],inplace=True,ignore_index=True)
    problems_pd['category']=np.nan
    problems_pd['category']=problems_pd['category'].fillna(json.dumps([]))
    pageNum = 1
    res=requests.get('https://api.solved.ac/v2/tags/stats.json?page={}'.format(pageNum))
    taglist = []
    taglist_r=json.loads(res.text)
    totalPages = taglist_r['result']['total_page']
    for pageNum in range(1,totalPages+1):
        res=requests.get('https://api.solved.ac/v2/tags/stats.json?page={}'.format(pageNum))
        taglist_r=json.loads(res.text)
        taglist.extend(taglist_r['result']['tags'])
    for tag in taglist:
        p_list = []
        pageNum = 1
        res=requests.get('https://api.solved.ac/v2/search/problems.json?query=solvable:true+tag:{}&page={}&sort=id&sort_direction=ascending'.format(tag['tag_name'],pageNum))
        p_r=json.loads(res.text)
        totalPages=p_r['result']['total_page']
        p_list.extend(p_r['result']['problems'])
        for pageNum in range(2,totalPages+1):
            res=requests.get('https://api.solved.ac/v2/search/problems.json?query=solvable:true+tag:{}&page={}&sort=id&sort_direction=ascending'.format(tag['tag_name'],pageNum))
            p_r=json.loads(res.text)
            p_list.extend(p_r['result']['problems'])
        idx = 0
        p_list_len = len(p_list)
        for problemNum in problems_pd['p_bj_id'].values:
            if idx<p_list_len and int(p_list[idx]['id'])==int(problemNum):
                try:
                    category=json.loads(problems_pd.loc[problems_pd.p_bj_id==problemNum,'category'].values[0])
                    category.append(tag['tag_name'])
                    problems_pd.loc[problems_pd.p_bj_id==problemNum,'category']=json.dumps(category,ensure_ascii=False)
                    idx+=1
                except UnicodeEncodeError:
                    pass
    return problems_pd



def pd_to_csv(problems_pd):
    problems_pd.to_csv('problem_pd.csv', mode='w', index=False)




def write_to_csv():
    with open('problems.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(list(problems))
    with open('users.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(list(users))





p_id = sys.argv[1]
problems_pd = pd.DataFrame(columns=['p_bj_id', 'p_name', 'p_submit_num',  'p_correct_num', 'p_answer_rate', 'p_level','category'])
problems_pd = problems_pd.append({'p_bj_id': int(p_id)}, ignore_index=True)
problems_pd = get_problem_info(p_id, problems_pd)
problems_pd = get_level(p_id, problems_pd)
problems_pd = get_category(problems_pd)
json_object = {
    'p_bj_id':problems_pd.loc[0]['p_bj_id'], 
    'p_name':problems_pd.loc[0]['p_name'],  
    'p_submit_num': problems_pd.loc[0]['p_submit_num'],
    'p_correct_num': problems_pd.loc[0]['p_correct_num'], 
    'p_answer_rate': problems_pd.loc[0]['p_answer_rate'], 
    'p_level': problems_pd.loc[0]['p_level'],
    'category': problems_pd.loc[0]['category']
}
print(json.dumps(json_object))