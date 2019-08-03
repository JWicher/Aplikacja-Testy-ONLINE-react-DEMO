import React, { Component } from 'react';
import Joi from 'joi-browser';
import { MDBBtn } from "mdbreact";
import { NotificationManager } from 'react-notifications';
import { zdobądźTekstyWersjiJęzykowej, ustawWersjęJęzykową } from '../../../../services/wersjaJęzykowaService';

class UstawienieJezyka extends Component {
    constructor(props){
        super(props);
        this.state = { 
            użytkownik: props.użytkownik,
            trybEdycji: false
         }

        this.tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.użytkownik.UstawienieJęzyka");
        this.schema = Joi.object().keys({
            język: Joi.string().required(),
        }).unknown(true);
    }

    walidujDane(użytkownik){
        const { error } = Joi.validate(użytkownik, this.schema);
        return error ? error.details[0].message : null;
    };
    
    zapiszZmianęDanych = async() => {
        const { użytkownik } = this.state;
        const błąd = this.walidujDane(użytkownik);
        if(błąd) {
            NotificationManager.error(this.tekst.notyfikacja.błądJęzyk);
            return null;
        }

        this.props.onWyślijAktualizacjęUżytkownika(użytkownik);
        this.przełączTrybEdycji();
        ustawWersjęJęzykową(użytkownik.język)
        window.location = "/panel-klienta/uzytkownik"
    }

    odrzućZmiany = () => {
        const użytkownik = { ...this.props.użytkownik };
        this.przełączTrybEdycji();
        this.setState({użytkownik})
    }

    onPrzechwyćZmianęJęzyka = ({ currentTarget: input }) => {
        const użytkownik = { ...this.state.użytkownik };
        użytkownik.język = input.value;
        this.setState({użytkownik})
    }

    przełączTrybEdycji = () => {
        this.setState({trybEdycji: !this.state.trybEdycji})
    }

    render() { 
        const {użytkownik, trybEdycji} = this.state;

        return ( 
            <div>
                { !trybEdycji && 
                    <div>
                    <p className="mb-0 font-weight-bold">{this.tekst.tytuł}</p>
                        <div className="d-flex">
                            <p className="ml-2 mr-4">{ this.tekst.pełnaNazwaJęzyka[użytkownik.język] }</p>
                            <i className="fas fa-edit " style={{cursor:"pointer"}} onClick={this.przełączTrybEdycji}></i>
                            
                        </div>
                    </div>
                }
                { trybEdycji && 
                    <div className="md-form border border-danger p-2 animated fadeIn faster">
                        <p className="font-weight-bold text-danger">{this.tekst.trybEdycji}</p>
                        <p className="mb-0 font-weight-bold">{this.tekst.tytuł}</p>
                        <select style={{cursor: "pointer"}} className="browser-default custom-select rgba_255_0_0_02 border-primary px-3"
                                    defaultValue={ użytkownik.język }
                                    onChange={ this.onPrzechwyćZmianęJęzyka }
                        >
                                    <option value="pl">{this.tekst.pełnaNazwaJęzyka.pl}</option>
                                    <option value="en">{this.tekst.pełnaNazwaJęzyka.en}</option>
                        </select>
                        <div className="mt-2">
                            <MDBBtn className="" color="danger" size="sm" onClick={this.odrzućZmiany} >{this.tekst.przycisk.zamknij}</ MDBBtn>
                            <MDBBtn className="" color="success" size="sm" onClick={this.zapiszZmianęDanych} >{this.tekst.przycisk.zapisz}</ MDBBtn>
                        </div>
                    </div>
                }
            </div>

        );
    }
}
 
export default UstawienieJezyka;