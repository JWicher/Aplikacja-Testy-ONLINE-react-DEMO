import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import Loader from '../../../współne/loader';
import GrupaWyszukiwanie from './GrupaWyszukiwanie';
import GrupaRejestracja from './GrupaRejestracja';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../services/wersjaJęzykowaService';

class DaneUżytkownikaGrupa extends Component {
    constructor(props){
        super(props);
        this.state = { 
            użytkownik: props.użytkownik,
            trybEdycji: false,
            czekamNaOdpowiedźSerwera: false,
        } 
    }


    przełączTrybEdycji = () => {
        this.setState({trybEdycji: !this.state.trybEdycji})
    }


    przypiszDoGrupy = (grupa) => {
        const { użytkownik } = this.state;
        użytkownik.firma = grupa;
        this.props.onWyślijAktualizacjęUżytkownika(użytkownik);
        this.przełączTrybEdycji();
    }


    niePrzypisujDoGrupy = () => {
        this.przełączTrybEdycji();
    }
    
    uruchomLoader = mode => {
        this.setState({ czekamNaOdpowiedźSerwera: mode })
    };
    sprZaznaczenie(wartość){
        return this.state.radio === wartość;
    }

    render(){
        const { użytkownik, trybEdycji, czekamNaOdpowiedźSerwera } = this.state;
        const tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.użytkownik.DaneUżytkownikaGrupa");

        return ( 
            <React.Fragment>
                { !trybEdycji && 
                    <React.Fragment>
                        <p className="mb-0 font-weight-bold">{tekst.grupa}</p>
                        <div className="d-flex">
                            <p className="ml-2 mr-4">{użytkownik.firma.nazwa !== "" ? użytkownik.firma.nazwa : tekst.niePrzypisano }</p>
                            <i className="fas fa-edit " style={{cursor:"pointer"}} onClick={this.przełączTrybEdycji}></i>
                        </div>
                    </React.Fragment>
                }

                { trybEdycji && 
                    <div className="md-form d-flex flex-column align-items-start border border-danger p-2 animated fadeIn faster">
                        { !czekamNaOdpowiedźSerwera &&
                            <React.Fragment>
                                <div className="d-flex align-items-center font-weight-bold text-danger mb-3">{tekst.trybEdycji}</div>
                                <GrupaWyszukiwanie przypiszDoGrupy={this.przypiszDoGrupy} niePrzypisujDoGrupy={this.niePrzypisujDoGrupy} />
                                <GrupaRejestracja przypiszDoGrupy={this.przypiszDoGrupy} niePrzypisujDoGrupy={this.niePrzypisujDoGrupy} />
                            </React.Fragment>
                        }
                        
                        { czekamNaOdpowiedźSerwera && <Loader opcje="logo-obrot"/> }

                        <MDBBtn className="" color="danger" size="sm" onClick={this.przełączTrybEdycji} >{tekst.przyciskZamknij}</ MDBBtn>
                    </div>
                }

            </React.Fragment>
        );
    }
}
export default DaneUżytkownikaGrupa;