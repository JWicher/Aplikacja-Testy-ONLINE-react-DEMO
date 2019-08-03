import React, { PureComponent } from 'react';
import Joi from 'joi-browser';
import { MDBInput, MDBBtn } from "mdbreact";
import { confirmAlert } from 'react-confirm-alert';
import { NotificationManager } from 'react-notifications';
import RadioCheckbox from '../../../../współne/RadioCheckbox';
import ZmienAvatar from './ZmienAvatar';
import użytkownikService from '../../../../../services/użytkownikService';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../../services/wersjaJęzykowaService';

class ModyfikowanieTestu extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            daneTestu: {
                nazwa: "",
                publiczny: false,
                ktoWidziTest: {id: "", nazwa: "" },
                krotkiOpis: "",
                avatar: "",
                limitCzasowy : {
                    czyLimit: false,
                    minuty: 0,
                    sekundy: 0
                },
                instrukcja: "",
            },
            radio: props.test.ktoWidziTest._id,
        };

        this.tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.testy.poziom3_szczegóły.ModyfikujTest");
    }

    schemaModyfikowanyTest = Joi.object().keys({
        nazwa: Joi.string().min(1).max(60).required().error( () => {return { message: this.tekst.walidacjaInfoBłąd.nazwa };} ),
        krotkiOpis: Joi.string().min(1).max(60).required().error( () => {return { message: this.tekst.walidacjaInfoBłąd.krótkiOpis };} ),
        limitCzasowy: Joi.object().keys({
            sekundy: Joi.number().max(59).error( () => {return { message: this.tekst.walidacjaInfoBłąd.limitCzasowySekundy };} )
        }).unknown(true)
    }).unknown(true);
    
    walidujDane(daneTestu){
        const { error } = Joi.validate(daneTestu, this.schemaModyfikowanyTest);
        return error ? error.details[0].message : null;
    };

    componentDidMount() {
        this.początkoweUstawienia();
    }
    początkoweUstawienia = () => {
        const daneTestu = this.zwróćKontekstZmian();
        this.setState({ daneTestu, radio: daneTestu.ktoWidziTest._id })
    }
    zwróćKontekstZmian(){
        const { test } = this.props;
        return {
            _id: test._id,
            nazwa: test.nazwa,
            modyfikowal: test.modyfikowal,
            publiczny: test.publiczny,
            ktoWidziTest: {
                _id: test.ktoWidziTest._id,
                nazwa: test.ktoWidziTest.nazwa
            },
            krotkiOpis: test.krotkiOpis,
            avatar: test.avatar,
            limitCzasowy : {
                czyLimit: test.limitCzasowy.czyLimit,
                minuty: test.limitCzasowy.minuty,
                sekundy: test.limitCzasowy.sekundy
            },
            instrukcja: test.instrukcja,
        };
    }
    wprowadzanieZmian = ({currentTarget: input}) => {
        const daneTestu = { ...this.state.daneTestu };
        if(input.name === "czyLimit" || input.name ===  "minuty" || input.name === "sekundy")
            daneTestu.limitCzasowy[input.name] = input.name === "czyLimit" ? input.checked : input.value;
        else daneTestu[input.name] = input.value;
        this.setState({ daneTestu })
    }

    zaznaczDostępTestu = (radio, ktoWidziTest) => {
        const daneTestu = { ...this.state.daneTestu };
        daneTestu.ktoWidziTest = {
            _id: ktoWidziTest._id,
            nazwa: ktoWidziTest.nazwa
        };
        this.setState({ radio, daneTestu });
    }

    zmieńAvatar = avatar => {
        const daneTestu = { ...this.state.daneTestu };
        daneTestu.avatar = avatar;
        this.setState({daneTestu})
    }
    
    sprZaznaczenie(wartość){
        return this.state.radio === wartość;
    }

    czyDokonanoZmian(){
        const test = this.zwróćKontekstZmian();
        return JSON.stringify(this.state.daneTestu) === JSON.stringify(test)
    }

    uruchomOstrzeżenieDlaTestu = (test) => {
        confirmAlert({
        customUI: ({ onClose }) => {
            return (
            <div className='react-confirm-alert__body'>
                <h1>{this.tekst.confirmAlertTest.tytuł}</h1>
                <p>{this.tekst.confirmAlertTest.treśćOstrzeżenia1}</p>
                <p className="mt-2 m-0">{this.tekst.confirmAlertTest.treśćOstrzeżenia2}</p>
                <p className="ml-3 mt-0 font-italic text-danger">{`- ${test.nazwa}`}</p>
                <div className="d-flex">
                    <MDBBtn onClick={onClose} color="danger" size="sm">{this.tekst.confirmAlertTest.nie}</MDBBtn>
                    <MDBBtn onClick={ () => { this.props.onUsuńTest(test); onClose() }} color="success" size="sm">{this.tekst.confirmAlertTest.tak}</MDBBtn>
                </div>
            </div>
            );
        }
        });
    };

    uruchomOkienkoWyboruAvatara = (aktualnieWybranyAvatar) => {
        confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <ZmienAvatar aktualnieWybranyAvatar={aktualnieWybranyAvatar} onZmieńAvatar={this.zmieńAvatar} onClose={onClose}/>
            );
        }
        });
    };

    sprawdźDaneIWyślijDoZapisu = () => {
        const { daneTestu: zmiany } = this.state;
        const błąd = this.walidujDane(zmiany);
        if(błąd){
            NotificationManager.error(błąd);
            return;
        }

        zmiany.nazwa = zmiany.nazwa.trim();
        zmiany.krotkiOpis = zmiany.krotkiOpis.trim();
        zmiany.instrukcja = zmiany.instrukcja.trim();

        this.props.onZapiszZmiany(zmiany)
    }

    render() { 
        const { daneTestu: test } = this.state;
        const użytkownik = użytkownikService.getUserFromJWT();
        const dokonanoZmian = this.czyDokonanoZmian();
        const użytkownikNależyDoGrupy = użytkownik.firma.nazwa !== "" ? true : false;

        return ( 
            <main className="text-left p-3">
                <hr className="mt-0"/>
                <div className="d-flex justify-content-between">
                    <h5 className="font-weight-bold mb-4">{this.tekst.tytuł}</h5>
                    <div>
                        <MDBBtn color="danger" size="sm" outline onClick={ () => this.uruchomOstrzeżenieDlaTestu(test) } >{this.tekst.przycisk.usuńTest}</MDBBtn>
                        <MDBBtn color="danger" size="sm" disabled={dokonanoZmian} onClick={this.początkoweUstawienia}>{this.tekst.przycisk.resetuj}</MDBBtn>
                        <MDBBtn color="success" size="sm" disabled={dokonanoZmian} onClick={ this.sprawdźDaneIWyślijDoZapisu  }>{this.tekst.przycisk.zatwierdźZmiany}</MDBBtn>
                    </div>
                </div>

                <span className="font-weight-bold">{this.tekst.opis}</span>
                <MDBInput label={this.tekst.inputy.labelNazwaTestu} autoComplete="off" value={ test.nazwa } className="mr-5" name="nazwa" onChange={this.wprowadzanieZmian} />
                <MDBInput label={this.tekst.inputy.labelKrótkiOpis} autoComplete="off" value={ test.krotkiOpis } className="mr-5" name="krotkiOpis" onChange={this.wprowadzanieZmian}/>


                <div className="mb-3 d-flex flex-column">
                        <span className="font-weight-bold">{this.tekst.awatar.tytuł}</span>
                        <div className="d-flex align-items-center">
                            <p className="mr-2 m-0">{this.tekst.awatar.aktualny}</p>
                                <div className="panel-klienta__tresc_test-modyfikuj-avatar-avatar"
                                    style={{backgroundImage: `url("/images/avatary/${test.avatar}")`, cursor: 'pointer', }}
                                    onClick={ () => this.uruchomOkienkoWyboruAvatara(test.avatar) }>
                                </div>

                        </div>
                </div>

                <div className="mb-3">
                    <span className="font-weight-bold">{this.tekst.dostępDoTestu.tytuł}</span>
                    <RadioCheckbox etykieta={ `${this.tekst.dostępDoTestu.etykietaTylkoTy} (${użytkownik.nazwa})` } _id={test._id + "radio1"}
                                    zaznaczenie={this.sprZaznaczenie(użytkownik._id)}
                                    onZmiana= {() => this.zaznaczDostępTestu(użytkownik._id, użytkownik)}
                    />
                    
                    { użytkownikNależyDoGrupy &&
                        <RadioCheckbox etykieta={ `${this.tekst.dostępDoTestu.grupa} ${użytkownik.firma.nazwa}`} _id={test._id + "radio3"}
                                        zaznaczenie={this.sprZaznaczenie(użytkownik.firma._id)}
                                        onZmiana= {() => this.zaznaczDostępTestu(użytkownik.firma._id, użytkownik.firma)}
                        />
                    }

                    <RadioCheckbox etykieta={this.tekst.dostępDoTestu.wszyscy} _id={test._id + "radio4"}
                                    zaznaczenie={this.sprZaznaczenie("")}
                                    onZmiana= {() => this.zaznaczDostępTestu("", {id: "", nazwa: ""} )}
                    />
                </div>     

                <span className="font-weight-bold">{this.tekst.limitCzasowy.tytuł}</span>
                <div className="mb-3 m-0 p-0">
                    <div className="custom-control custom-checkbox">
                        <input name="czyLimit" type="checkbox" checked={test.limitCzasowy.czyLimit} className="custom-control-input" id={test.nazwa + "checkbox1"} onChange={this.wprowadzanieZmian} />
                        <label className="custom-control-label" htmlFor={test.nazwa + "checkbox1"} >{this.tekst.limitCzasowy.label.limitCzasowy}</label>
                    </div>
                    { this.state.daneTestu.limitCzasowy.czyLimit && 
                        <div className="animated fadeIn">
                            <MDBInput name="minuty"  type="number" label={this.tekst.limitCzasowy.label.minuty} autoComplete="off" value={ test.limitCzasowy.minuty } className="m-0" onChange={this.wprowadzanieZmian}/>
                            <MDBInput name="sekundy" type="number" label={this.tekst.limitCzasowy.label.sekundy} autoComplete="off" value={ test.limitCzasowy.sekundy } className="m-0" onChange={this.wprowadzanieZmian}/>
                        </div>
                    }
                </div>
                
                <span className="font-weight-bold">{this.tekst.instrukcja.tytuł}</span>
                <MDBInput name="instrukcja" type="textarea" label={this.tekst.instrukcja.inputLabel} autoComplete="off" rows='10' value={test.instrukcja} onChange={this.wprowadzanieZmian}/>

            </main>
         );
    }
}
 
export default ModyfikowanieTestu;