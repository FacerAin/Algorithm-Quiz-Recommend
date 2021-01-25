import client from './client';

export const set = ({ u_id, weak, u_level, c_level, c_num, end_date}) =>{
    console.log(u_id, weak, u_level, c_level, c_num, end_date)
    return client.post('api/challenge/set', {u_id, weak, u_level, c_level, c_num, end_date});
}
    
export const get = () => {
    console.log(get)
    return client.get('api/challenge/')
}