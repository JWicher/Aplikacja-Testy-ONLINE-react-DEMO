import httpService from "./httpService";

const apiEndPoint = "/testy";

export async function getTests(){
        const { data } = await httpService.get(apiEndPoint);
        return data.reverse();
}
export async function getTest(kod){
        const { data } = await httpService.get(apiEndPoint + "/" + kod);
        return data;
}
export async function zarejstrujNowyTest(test){
        const { data } = await httpService.post(apiEndPoint, test);
        return data;
}
export async function zmodyfikujTest(idTestu, fragmentTestu){
        const { data } = await httpService.patch(apiEndPoint + "/" + idTestu, fragmentTestu);
        return data;
}
export async function usuńTest(test){
        const { data } = await httpService.delete(apiEndPoint + "/" + test._id);
        return data;
}


export default {
    getTests,
    getTest,
    zarejstrujNowyTest,
    zmodyfikujTest,
    usuńTest
}