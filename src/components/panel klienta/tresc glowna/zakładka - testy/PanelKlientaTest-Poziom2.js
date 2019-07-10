import React from 'react';
import { MDBBtn } from "mdbreact";
import użytkownikService from '../../../../services/użytkownikService';

const PanelKlientaTesPoziom2 = ({test, toggle }) => {
    
    const użytkownik = użytkownikService.getUserFromJWT();
    const użytkownikToAutor = użytkownik._id === test.zarejestrowal._id;

    return ( 
        <header className="d-flex  align-items-start justify-content-between p-0 text-left">
            <div className="d-flex m-3">
                <div className="text-right">
                    <p className="m-0 font-weight-bold">Łączna ilość zadań: </p>
                    <p className="m-0">- zamkniętych: </p>
                    <p className="m-0">- otwartych: </p>
                </div>
                <div className="ml-1 text-left">
                    <p className="m-0 text-right font-weight-bold">{test.zadania.length}</p>
                    <p className="m-0 text-right">{test.zadania.filter( z => z.typ === "zamknięte").length}</p>
                    <p className="m-0 text-right">{test.zadania.filter( z => z.typ === "otwarte").length}</p>
                </div>
                <div className="text-right ml-5">
                    <p className="m-0 font-weight-bold">Zarządza testem: </p>
                    <p className="m-0 font-weight-bold">Data rejestracji: </p>
                    <p className="m-0 font-weight-bold">Data modyfikacji: </p>
                </div>
                <div className="ml-1 text-left">
                    <p className="m-0">{test.zarejestrowal.nazwa}</p>
                    <p className="m-0">{test.zarejestrowal.data}</p>
                    <p className="m-0">{test.modyfikowal.nazwa ? test.modyfikowal.data : "---"}</p>
                </div>
            </div>
 
            <div className="m-3 d-flex align-self-center">
                <MDBBtn size="sm" color="elegant" outline onClick={toggle("1")} >Zadania</MDBBtn>
                <MDBBtn size="sm" color="elegant" disabled={!użytkownikToAutor} outline onClick={toggle("2")} >Ustawienia testu</MDBBtn>
                <MDBBtn size="sm" color="blue" disabled={test.zadania.length <= 0} onClick={toggle("3")} >Wygeneruj kod</MDBBtn>
            </div>
            
        </header>

    )
}
 
export default PanelKlientaTesPoziom2;