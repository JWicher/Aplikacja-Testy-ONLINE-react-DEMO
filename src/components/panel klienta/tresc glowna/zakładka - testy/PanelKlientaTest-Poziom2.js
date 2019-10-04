import React from 'react';
import { MDBBtn } from "mdbreact";
import użytkownikService from '../../../../services/użytkownikService';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../services/wersjaJęzykowaService';

import { rozwińZakładkę } from '../../../../redux/actions/actionsPanelKlienta';
import { connect } from 'react-redux';

const PanelKlientaTesPoziom2 = ({ test, rozwińZakładkę }) => {

    const użytkownik = użytkownikService.getUserFromJWT();
    const użytkownikToAutor = użytkownik._id === test.zarejestrowal._id;
    const tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.testy.PanelKlientaTestPoziom2");

    return (
        <header className="d-flex flex-column flex-sm-row align-items-start justify-content-between p-0 text-left">
            <div className="d-flex m-1 m-md-2 m-lg-3">
                <div className="JW_RWD-p text-right">
                    <p className="m-0 font-weight-bold">{tekst.blokIlośćZadań.etykietaŁącznaIlosćZadań}</p>
                    <p className="m-0">{tekst.blokIlośćZadań.etykietaZamkniętych}</p>
                    <p className="m-0">{tekst.blokIlośćZadań.etykietaOtwartych}</p>
                </div>
                <div className="JW_RWD-p ml-1 text-left">
                    <p className="m-0 text-right font-weight-bold">{test.zadania.length}</p>
                    <p className="m-0 text-right">{test.zadania.filter(z => z.typ === "zamknięte").length}</p>
                    <p className="m-0 text-right">{test.zadania.filter(z => z.typ === "otwarte").length}</p>
                </div>
                <div className="JW_RWD-p text-right ml-5">
                    <p className="m-0 font-weight-bold">{tekst.blokZarządzanieTestem.etykietaZarządzaTestem}</p>
                    <p className="m-0 font-weight-bold">{tekst.blokZarządzanieTestem.etykietaDataRejestracji}</p>
                    <p className="m-0 font-weight-bold">{tekst.blokZarządzanieTestem.etykietaDataModyfikacji}</p>
                </div>
                <div className="JW_RWD-p ml-1 text-left">
                    <p className="m-0">{test.zarejestrowal.nazwa}</p>
                    <p className="m-0">{test.zarejestrowal.data}</p>
                    <p className="m-0">{test.modyfikowal.nazwa ? test.modyfikowal.data : "---"}</p>
                </div>
            </div>

            <div className="m-0 m-md-2 d-flex align-self-center flex-row flex-sm-column flex-lg-row flex-wrap">
                <MDBBtn size="sm" className="JW_RWD-button-sm my-0 my-sm-1" color="elegant" outline onClick={() => rozwińZakładkę(`${test._id}-1`)} >{tekst.blokPrzycisków.etykietaZadania}</MDBBtn>
                <MDBBtn size="sm" className="JW_RWD-button-sm my-0 my-sm-1" color="elegant" disabled={!użytkownikToAutor} outline onClick={() => rozwińZakładkę(`${test._id}-2`)} >{tekst.blokPrzycisków.etykietaUstawieniaTestu}</MDBBtn>
                <MDBBtn size="sm" className="JW_RWD-button-sm my-0 my-sm-1" color="blue" disabled={test.zadania.length <= 0} onClick={() => rozwińZakładkę(`${test._id}-3`)} >{tekst.blokPrzycisków.etykietaWygenerujKod}</MDBBtn>
            </div>

        </header>

    )
}


const mapStateToProps = (state) => {
    return { stanRedux: state };
};
const mapDispatchToProps = (dispatch) => {
    return {
        rozwińZakładkę: zakładka => dispatch(rozwińZakładkę(zakładka)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelKlientaTesPoziom2)
