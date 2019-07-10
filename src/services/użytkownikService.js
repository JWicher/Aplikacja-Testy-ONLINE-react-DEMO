import httpService from "./httpService";
import jwtDecode from 'jwt-decode';

const apiEndPoint = "/uzytkownicy";


export async function pobierzUżytkowników(){
    const { data } = await httpService.get(apiEndPoint );
    return data;
}
export async function pobierzUżytkownika(użytkownik){
    const { data } = await httpService.get(apiEndPoint + "/" + użytkownik._id );
    return data;
}
export async function dodajUżytkownika(użytkownik){
    const { data } = await httpService.post(apiEndPoint, użytkownik);
    return data;
}
export async function zaktualizujDaneUżytkownika(użytkownik){
    const { data } = await httpService.patch(apiEndPoint + "/" + użytkownik._id, użytkownik );
    return data;
}
export async function usuńUżytkownika(użytkownik){
    const { data } = await httpService.delete(apiEndPoint + "/" + użytkownik._id );
    return data;
}

export function getUserFromJWT(){
    const jwt = localStorage.getItem("token");
    return jwt ? jwtDecode(jwt) : undefined;
}

export default {
    pobierzUżytkowników,
    pobierzUżytkownika,
    dodajUżytkownika,
    zaktualizujDaneUżytkownika,
    usuńUżytkownika,
    getUserFromJWT
}