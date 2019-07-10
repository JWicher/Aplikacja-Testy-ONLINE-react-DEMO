import React, { Component } from 'react';
import Joi from 'joi-browser';
import { NotificationManager } from 'react-notifications';
import { MDBBtn } from "mdbreact";
import BlokInputu from './BlokInputu';
import wspólneService from '../../../../services/wspólneService';
class DaneUzytkownikaNazwa extends Component {
    constructor(props){
        super(props)
        this.state = { 
            użytkownik: props.użytkownik,
            trybEdycji: false
         }
    }
    schema = Joi.object().keys({
        nazwa: Joi.string().min(1).required().error( () => {return { message: "Nazwa nie może być pusta"};}),
    }).unknown(true);

    zapiszZmianęDanych = async() => {
        const { użytkownik } = this.state;
        const błąd = this.walidujDane(użytkownik);
        if(błąd) {
            NotificationManager.error(błąd);
            return null;
        }
        this.props.onWyślijAktualizacjęUżytkownika(użytkownik);
        this.przełączTrybEdycji();
    }
    odrzućZmiany = () => {
        const użytkownik = { ...this.props.użytkownik };

        this.przełączTrybEdycji();
        this.setState({użytkownik})
    }

    przechwyćZmianęTreści = ({currentTarget: input}) => {
        const użytkownik = { ...this.state.użytkownik };
        użytkownik[input.name] = input.value;
        this.setState({użytkownik});
    }
    
    przełączTrybEdycji = () => {
        this.setState({trybEdycji: !this.state.trybEdycji})
    }
    walidujDane(użytkownik){
        const { error } = Joi.validate(użytkownik, this.schema);
        return error ? error.details[0].message : null;
    };
    render(){
        const {użytkownik, trybEdycji} = this.state;

        return ( 
            <div>
                { !trybEdycji && 
                    <div>
                        <p className="mb-0 font-weight-bold">Imię i nazwisko</p>
                        <div className="d-flex">
                            <p className="ml-2 mr-4">{użytkownik.nazwa }</p>
                            <i className="fas fa-edit " style={{cursor:"pointer"}} onClick={this.przełączTrybEdycji}></i>
                        </div>
                    </div>
                }
                { trybEdycji && 
                    <div className="md-form border border-danger p-2 animated fadeIn faster">
                        <p className="font-weight-bold text-danger">Tryb edycji</p>
                        <BlokInputu etykieta="Imię i nazwisko" name="nazwa" value={użytkownik.nazwa}
                                    onChange={this.przechwyćZmianęTreści}
                                    onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.zapiszZmianęDanych) }
                                    />
                        <div className="mt-2">
                            <MDBBtn className="" color="danger" size="sm" onClick={this.odrzućZmiany} >Zamknij</ MDBBtn>
                            <MDBBtn className="" color="success" size="sm" onClick={this.zapiszZmianęDanych} >Zapisz</ MDBBtn>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default DaneUzytkownikaNazwa;