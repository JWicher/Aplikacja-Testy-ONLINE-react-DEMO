import React, { Component } from 'react';
import Joi from 'joi-browser';
import { MDBJumbotron, MDBInput } from "mdbreact";
import { NotificationManager } from 'react-notifications';
import Loader from '../współne/loader';
import kodTestuService from '../../services/kodTestuService';

class InstrukcjaTestu extends Component {
    constructor(){
        super();
        this.state = {
            obiektKoduDostępu: JSON.parse( localStorage.getItem("obiektKoduDostępu") ),
            kandydat: {
                imie: JSON.parse( localStorage.getItem("obiektKoduDostępu") ).kandydat.imie,
                nazwisko: JSON.parse( localStorage.getItem("obiektKoduDostępu") ).kandydat.nazwisko
            },
            czekamNaOdpowiedźSerwera: false,
        } 
    }
    schema = {
        imie: Joi.string().required().error( () => {return { message: "Name can not be empty"};}),
        nazwisko: Joi.string().required().error( () => {return { message: "Surname can not be empty"};})
    };


    wprowadzanieDanychKandydata = ({currentTarget}) => {
        const { kandydat } = this.state;
        kandydat[currentTarget.name] = currentTarget.value;
        this.setState({kandydat})
    }
    walidujDane(user){
        const { error } = Joi.validate(user, this.schema);
        return error ? error.details[0].message : null;
    };

    sprawdźCzyKandydatPodałDane = async () => {
        
        const obiektKoduDostępu = JSON.parse( localStorage.getItem("obiektKoduDostępu") );

        if( obiektKoduDostępu.czasRozpoczęciaTestu ){
            window.location = "/test/test";
            return;
        }
        
        try{
            this.uruchomLoader(true);
            const { kandydat } = this.state;
            const błąd = this.walidujDane( kandydat );

            if(błąd) {
                NotificationManager.error(błąd);
                return null;
            }

            kandydat.imie = kandydat.imie.trim();
            kandydat.nazwisko = kandydat.nazwisko.trim();

            const zmiany = { kandydat, czasRozpoczęciaTestu: new Date().getTime(), rozpoczęty: true };
            const zaktualizowanyObiektKoduDostępu = await kodTestuService.aktualizujObiektKodu(obiektKoduDostępu.kod, zmiany );

            localStorage.setItem("obiektKoduDostępu", JSON.stringify( zaktualizowanyObiektKoduDostępu ));

            window.location = "/test/test";

        }
        catch(błąd){
            if(błąd && błąd.response)
                NotificationManager.error(błąd.response.data);
        }

        finally{
            this.uruchomLoader(false);
        }
    }

    czyPodałSwojeDane()  {
        const { imie, nazwisko } = this.state.kandydat;
        if( !imie.length || !nazwisko.length )
            return true;
        
        return false;
    };

    uruchomLoader(mode){
        this.setState({ czekamNaOdpowiedźSerwera: mode })
    };

    render() { 
        const { czekamNaOdpowiedźSerwera,  } = this.state;
        const { test } = this.state.obiektKoduDostępu;
        const { kandydat, czasRozpoczęciaTestu } = JSON.parse( localStorage.getItem("obiektKoduDostępu") );

        return ( 
            <div className="test__instrukcja d-flex align-items-center justify-content-center p-5 blue lighten-2">
                    <MDBJumbotron className="m-0">

                        <h2 className="text-center font-weight-bold">{test.nazwa}</h2>
                        <hr />

                        { test.instrukcja.length > 0 &&
                            <div className="test__instrukcja_info">
                                <p className="mt-3 font-weight-bold">Note</p>
                                <p className="m-0">{test.instrukcja}</p> 
                                <hr />
                            </div>
                        }

                        <p className="mt-2 font-weight-bold">Please enter your name and surname</p>
                        <MDBInput label="Name" autoComplete="off" name="imie"
                                    disabled={ kandydat.imie.length } onChange={this.wprowadzanieDanychKandydata}
                                    value={this.state.kandydat.imie}
                        />
                        <MDBInput label="Surname" autoComplete="off" name="nazwisko"
                                    disabled={ kandydat.nazwisko.length } onChange={this.wprowadzanieDanychKandydata}
                                    value={this.state.kandydat.nazwisko}
                        />

                        <div className="d-flex justify-content-center px-5">
                            { !czekamNaOdpowiedźSerwera ?
                                    <button className="btn btn-primary btn-block btn-lg" disabled={ this.czyPodałSwojeDane() } onClick={ this.sprawdźCzyKandydatPodałDane }>
                                        { czasRozpoczęciaTestu ? "Test" : "Start" }
                                    </button>
                                    :
                                    <Loader opcje="logo-obrot" />
                            }
                        </div>
                        
                    </MDBJumbotron>
            </div>
    
         );
    }
}

export default InstrukcjaTestu;