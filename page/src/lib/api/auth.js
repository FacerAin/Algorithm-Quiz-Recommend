import client from './client';

export const login = ({ username, password }) =>
  client.post('api/auth/login', { u_id: username, u_password: password });

export const register = ({ username, password, nickname, bjid }) =>
{
    return client.post('api/auth/register', { u_id: username, u_password: password, u_name: nickname, u_bj_id: bjid });
}
 

export const check = () => client.get('api/auth/check');

export const logout = () => client.get('/api/auth/logout');