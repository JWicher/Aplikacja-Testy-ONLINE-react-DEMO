import httpService from "./httpService";
import axios from 'axios';

const apiEndPoint = "/logowanie";
const tokenKey = "token";

axios.defaults.headers.common['x-auth-token'] = getJwt();

export async function login( email, haslo ){
    const { data: jwt } = await httpService.post(apiEndPoint + "/", { email, haslo } );
    localStorage.setItem(tokenKey, jwt);
    axios.defaults.headers.common['x-auth-token'] = getJwt();

    return jwt;
}
export function setJwt(jwt){
    return localStorage.setItem(tokenKey, jwt);
}
export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    setJwt,
    getJwt,
}