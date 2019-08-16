import React, { Component } from 'react';
import { MDBInput, MDBBtn } from "mdbreact";
import Joi from 'joi-browser';
import { NotificationManager } from 'react-notifications';
import Loader from '../współne/loader';
import kodTestutService from '../../services/kodTestuService';
import wspólneService from '../../services/wspólneService';
import { zdobądźTekstyWersjiJęzykowej } from '../../services/wersjaJęzykowaService';

class WeryfikacjaKodu extends Component {
    constructor(){
        super()
        this.state = { 
            czekamNaOdpowiedźSerwera: false
        }

        this.schema = {
            kod: Joi.string().min(13).max(13).required().error( () => {return { message: "Nieprawidłowa długość kodu."};})
        };
    }
    

    zdobąćTest = async () => {
        const obiektKoduDostępu = JSON.parse( localStorage.getItem("obiektKoduDostępu") );
        if(!obiektKoduDostępu || obiektKoduDostępu.kod !== this.state.kod){
            const { kod } = this.state;
            const błąd = this.walidujKod({kod});
            if(błąd) { NotificationManager.error(błąd); return null; }

            this.przeczyśćCoTrzeba();
            this.uruchomLoader(true);

            try{

                const obiektKoduDostępu = await kodTestutService.zdobądźTest( kod )
                localStorage.setItem("obiektKoduDostępu", JSON.stringify(obiektKoduDostępu) )
                const odpowiedzi = obiektKoduDostępu.test.zadania.map( zadanie => zadanie = {numerZadania: zadanie.numer, odpowiedz: { tresc: ""} })
                localStorage.setItem("odpowiedzi", JSON.stringify(odpowiedzi) );
                window.location = "/test/instrukcja"
            }
            catch(ex){
                if(ex.response && ex.response.data ) {
                    NotificationManager.error(ex.response.data);
                }

                this.uruchomLoader(false);
            }
        }   
    }
    walidujKod(kod){
        const { error } = Joi.validate(kod, this.schema);
        return error ? error.details[0].message : null;
    };

    przeczyśćCoTrzeba(){
            localStorage.removeItem("obiektKoduDostępu");
            localStorage.removeItem("odpowiedzi");
            localStorage.removeItem("czas");
    }
    wprowadzanieKodu = ({currentTarget}) => {
        const kod = currentTarget.value.trim();
        this.setState({ kod })
    }
    uruchomLoader(mode){
        this.setState({ czekamNaOdpowiedźSerwera: mode })
    };

    render() { 
        const { czekamNaOdpowiedźSerwera } = this.state;
        const tekst = zdobądźTekstyWersjiJęzykowej("stronaGłówna.WeryfikacjaKodu" )
        const widokMenu = window.store.getState().reducerStronaGłówna.widoczneMenu && window.innerWidth <= 991 ? "ukryj" : "";

        return ( 
            <div className={ `strona-glowna__weryfikacja-kodu align-self-center align-self-lg-end mr-md-4 animated fadeIn faster ${widokMenu}` }>
                <div className="strona-glowna__weryfikacja-kodu_strefa-klienta border-primary rounded">
                    <h2 className="text-center text-uppercase font-weight-bold text-primary mb-1 mb-sm-4">{tekst.tytuł}</h2>
                    <p>{tekst.opis}</p>
                    
                        <MDBInput label="Podaj kod" autoComplete="off" type="text" onChange={this.wprowadzanieKodu} onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.zdobąćTest) }/>
                        <div className="strona-glowna__weryfikacja-kodu_przycisk d-flex justify-content-center align-items-center">
                            { !czekamNaOdpowiedźSerwera && <MDBBtn color="primary" onClick={this.zdobąćTest}>{tekst.przyciskRozpocznij}</MDBBtn> }
                            { czekamNaOdpowiedźSerwera && <Loader opcje="logo-obrot" /> }
                        </div>
                </div>
            </div>
         );
    }
}
 
export default WeryfikacjaKodu
