import httpService from "./httpService";

const apiEndPoint = "/grupy";

export async function getGrupy(){
        const { data } = await httpService.get(apiEndPoint);
        return data;
}
export async function getGrupa(nazwa){
        const { data } = await httpService.get(apiEndPoint + "/" + nazwa);
        return data;
}
export async function zarejstrujNowąGrupę(grupa){
        const { data } = await httpService.post(apiEndPoint, grupa);
        return data;
}



export default {
    getGrupy,
    getGrupa,
    zarejstrujNowąGrupę,
}