import React, { Component } from 'react';
import { MDBBtn, MDBBadge } from "mdbreact";
import kodTestuService from '../../../../services/kodTestuService';
import Loader from '../../../współne/loader';
import { NotificationManager } from 'react-notifications';

class KodTestu extends Component {
    state = { 
        czekamNaOdpowiedźSerwera: false,
    }

    ściągnijWynikiDoPlikuPDF = async () => {
        try{
            this.uruchomLoader(true);
            await kodTestuService.ściągnijPlikPDFZWynikami(this.props.kod)
            this.uruchomLoader(false);
        }
        catch(błąd){
            NotificationManager.error("Nie udało się ściągnąć pliku")
            this.uruchomLoader(false);
        }
    }

    uruchomLoader(mode){
        this.setState({ czekamNaOdpowiedźSerwera: mode })
    };

    render() { 
        const {kod, indeks, uruchomOstrzeżenieDlaKoduTestu} = this.props;
        const {czekamNaOdpowiedźSerwera} = this.state;

        return ( 
                <div className="panel-klienta__tresc_kody-testow_kod d-flex justify-content-between">
                        <div className="panel-klienta__tresc_kody-testow_kod-indeks">{indeks +1 }</div>
                        <div className="panel-klienta__tresc_kody-testow_kod-data-wygenerowania">{kod.dataWygenerowania.dataISO}</div>
                        <div className="panel-klienta__tresc_kody-testow_kod-kandydat">{kod.kandydat.imie !== "" ? `${kod.kandydat.nazwisko} ${kod.kandydat.imie}` : "---"}</div>
                        <div className="panel-klienta__tresc_kody-testow_kod-test">{kod.test.nazwa}</div>
                        <div className="panel-klienta__tresc_kody-testow_kod-kod">{kod.kod}</div>
                        <div className="panel-klienta__tresc_kody-testow_kod-adresaci">{kod.adresaci.join(', ')}</div>
                        <div className="panel-klienta__tresc_kody-testow_kod-termin-waznosci">{kod.terminWażności.dataISO}</div>
                        <div className="panel-klienta__tresc_kody-testow_kod-wyniki">
                            {kod.zakończony ?
                                <React.Fragment>
                                 {!czekamNaOdpowiedźSerwera ?
                                    <MDBBtn size="sm" color="success" className="kura m-0 px-3 py-2" onClick={ this.ściągnijWynikiDoPlikuPDF } >
                                        <i className="fa fa-download" aria-hidden="true"></i>
                                    </MDBBtn>
                                    :
                                    <Loader opcje="logo-obrot" wielkosc="logo20x20"/>}
                                    </React.Fragment>
                            :
                                <MDBBadge size="sm" color="danger" className="kura m-0 p-2">
                                    Brak
                                </MDBBadge>
                            }
                        </div>
                        <div className="panel-klienta__tresc_kody-testow_kod-usun">
                            <MDBBtn outline color="danger" size="sm" className="rounded m-0 px-2"
                                    onClick={ () => uruchomOstrzeżenieDlaKoduTestu(kod.kod) }
                                    >Usuń
                            </MDBBtn>
                        </div>
                </div>
             );
    }
}
 
export default KodTestu;