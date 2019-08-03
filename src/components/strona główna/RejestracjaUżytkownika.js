import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBInput } from "mdbreact";
import Joi from 'joi-browser';
import { NotificationManager } from 'react-notifications';
import Loader from '../współne/loader';
import użytkownikService from '../../services/użytkownikService';
import wspólneService from '../../services/wspólneService';
import { zdobądźTekstyWersjiJęzykowej } from '../../services/wersjaJęzykowaService';

class RejestracjaUzytkownika extends Component {
    constructor(){
        super()
        this.state = { 
            czekamNaOdpowiedźSerwera: false,
            użytkownik: {
                nazwa: "",
                email: "",
                haslo: "",
                hasloPowrorzenie: ''
            },
            wysłano: false
        };
        this.tekst = zdobądźTekstyWersjiJęzykowej("stronaGłówna.RejestracjaUżytkownika")
    }
    schema = {
        nazwa: Joi.string().min(1).max(255).required().error( () => {return { message: this.tekst.błędy.nazwa };}),
        email: Joi.string().min(1).required().error( () => {return { message: this.tekst.błędy.email };}),
        haslo: Joi.string().min(5).required().error( () => {return { message: this.tekst.błędy.haslo };}),
        hasloPowrorzenie: Joi.string().min(5).required().error( () => {return { message: this.tekst.błędy.hasloPowrorzenie };})
    };

    walidujDane(user){
        const { error } = Joi.validate(user, this.schema);
        return error ? error.details[0].message : null;
    };

    zarejestrujNowegoUżytkownika = async () => {
        try{
            const { użytkownik } = this.state;
            const błąd = this.walidujDane(użytkownik, this.schema);
            if(błąd){
                NotificationManager.error(błąd);
                return;
            }
            if(użytkownik.haslo !== użytkownik.hasloPowrorzenie){
                NotificationManager.error(this.tekst.błędy.notyfikacjaHasloPowrorzenie);
                return;
            }


            delete użytkownik.hasloPowrorzenie;
            await użytkownikService.dodajUżytkownika(użytkownik);
            this.setState({wysłano: true})
        }
        catch(błąd){
            NotificationManager.error(błąd.response.data)
        }
    }

    wprowadzanieDanychUżytkownika = ({currentTarget: input}) => {
        const użytkownik = { ...this.state.użytkownik };
        użytkownik[input.name] = input.value;
        this.setState({ użytkownik })
    }


    uruchomLoader(mode){
        this.setState({ czekamNaOdpowiedźSerwera: mode })
    };

    render() { 
        const { czekamNaOdpowiedźSerwera, użytkownik, wysłano } = this.state;
        const { zamieńPrzycisk } = this.props;

        return ( 
            <form className="strona-glowna__rejestracja-uzytkownika animated fadeIn faster" >
               { !wysłano && <div className="strona-glowna__rejestracja-uzytkownika_pojemnik">
                    <h2 className="text-center text-uppercase font-weight-bold text-primary mb-4">{this.tekst.tytuł}</h2>
                    
                        <MDBInput label={this.tekst.inputy.nazwa} name="nazwa" autoComplete="off"
                                    onChange={this.wprowadzanieDanychUżytkownika} onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.zarejestrujNowegoUżytkownika) } />
                        <MDBInput label={this.tekst.inputy.email} name="email" autoComplete="off"
                                    onChange={this.wprowadzanieDanychUżytkownika}  onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.zarejestrujNowegoUżytkownika) } />
                        <MDBInput label={this.tekst.inputy.hasło} name="haslo" type="password" autoComplete="off"
                                    onChange={this.wprowadzanieDanychUżytkownika}  onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.zarejestrujNowegoUżytkownika) } />
                        <MDBInput label={this.tekst.inputy.powtórzHasło} name="hasloPowrorzenie" autoComplete="off" type="password"
                                    onChange={this.wprowadzanieDanychUżytkownika}  onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.zarejestrujNowegoUżytkownika) } />

                        <div className="strona-glowna__rejestracja-uzytkownika_przycisk d-flex justify-content-center align-items-center">
                            { !czekamNaOdpowiedźSerwera && <MDBBtn color="primary" onClick={this.zarejestrujNowegoUżytkownika}>{this.tekst.przyciskZarejestruj}</MDBBtn> }
                            { czekamNaOdpowiedźSerwera && <Loader opcje="logo-obrot" /> }
                        </div>
                </div>
               }

                { wysłano && 
                    
                    <div className="strona-glowna__rejestracja-uzytkownika_informacja p-5 animated fadeIn faster text-primary font-weight-bold">

                        {`Aby dokończyć rejestrację, kliknij w link umieszczony w wiadomości wysłanej na adres: ${użytkownik.email}.`}
                            <Link to="/">
                                <div className="d-flex justify-content-center mt-2">
                                    <MDBBtn color="default" onClick={ () => zamieńPrzycisk("rejestruj")} >{this.tekst.przyciskPotwierdzenie}</MDBBtn>
                                </div>
                            </Link>
                    </div>
                }
            </form>
         );
    }
}
 
export default RejestracjaUzytkownika;