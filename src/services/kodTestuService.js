import httpService from "./httpService";
import { toast } from "react-toastify";
import filesaver from 'file-saver';

const apiEndPoint = "/kodyDostepuDoTestow";

export async function getKodyTestów(){
    const { data } = await httpService.get(apiEndPoint);
    return data.reverse();
}
export async function zdobądźTest(kodTestu){
    const { data } = await httpService.get(apiEndPoint + "/" + kodTestu);
    return data;
}
export async function aktualizujObiektKodu(kodTestu, aktualizacja){
    const { data } = await httpService.patch(apiEndPoint + "/" + kodTestu, aktualizacja);
    return data;
}
export async function postKodTestu(kodTestu){
    const { data } = await httpService.post(apiEndPoint, kodTestu);
    return data;
}
export async function usuńKodTestu(kodTestu){
    const { data } = await httpService.delete(apiEndPoint + "/" + kodTestu);
    return data;
}


export async function ściągnijPlikPDFZWynikami(kodTestu){
    try{
        const {data} = await httpService.get("generujPDFzWynikami/" + kodTestu.kod, { responseType: 'arraybuffer' });
        const nazwaPliku = `${kodTestu.test.nazwa} - ${kodTestu.kandydat.nazwisko} ${kodTestu.kandydat.imie} - ${kodTestu.kod}.pdf`
        const blob = new Blob([data], {type: "application/pdf;charset=utf-8"} )
        filesaver.saveAs(blob, nazwaPliku);
    }
    catch(ex){
        toast.error("Nie można ściągnąć pliku.")
    }
}


export default {
    getKodyTestów,
    postKodTestu,
    zdobądźTest,
    aktualizujObiektKodu,
    usuńKodTestu,
    ściągnijPlikPDFZWynikami
}