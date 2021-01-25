import client from './client';

export const getid = ({ username }) =>
    client.get('api/user/' + username);

export const syncbj = ({ username }) =>{
    return client.post('api/user/syncbj', { u_id: username })
}
    


export const weak = ({ username }) =>{
    console.log('weak')
    return client.post('api/user/weak', { u_id: username })
}


export const level = ({ username }) =>{
    return client.post('api/user/level', { u_id: username })
}