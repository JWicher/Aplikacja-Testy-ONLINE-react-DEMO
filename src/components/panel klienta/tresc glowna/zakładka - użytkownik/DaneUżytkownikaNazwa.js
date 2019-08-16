import React, { Component } from 'react';
import Joi from 'joi-browser';
import { NotificationManager } from 'react-notifications';
import { MDBBtn } from "mdbreact";
import BlokInputu from './BlokInputu';
import wspólneService from '../../../../services/wspólneService';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../services/wersjaJęzykowaService';
import { ustawEdytowanyElement } from '../../../../redux/actions/actionsPanelKlienta';
import { connect } from 'react-redux';

class DaneUzytkownikaNazwa extends Component {
    constructor(props){
        super(props)
        this.state = { 
            użytkownik: props.użytkownik,
            trybEdycji: false,
            tekst: zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.użytkownik.DaneUzytkownikaNazwa")
         };

    }
        
    schema = Joi.object().keys({
        nazwa: Joi.string().min(1).required().error( () => {return { message: this.state.tekst.notyfikacja.błądNazwa };}),
    }).unknown(true);

    static getDerivedStateFromProps(nextProps,prevProps) {
        if( nextProps !==  prevProps )
        return {
            tekst: zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.użytkownik.DaneUzytkownikaNazwa")
        }
      }

    zapiszZmianęDanych = async() => {
        const { użytkownik } = this.state;
        const błąd = this.walidujDane(użytkownik);
        if(błąd) {
            NotificationManager.error(błąd);
            return null;
        }
        this.props.onWyślijAktualizacjęUżytkownika(użytkownik);
        this.props.ustawEdytowanyElement("");
    }

    odrzućZmiany = () => {
        const użytkownik = { ...this.props.użytkownik };

        this.props.ustawEdytowanyElement("");
        this.setState({użytkownik})
    }

    przechwyćZmianęTreści = ({currentTarget: input}) => {
        const użytkownik = { ...this.state.użytkownik };
        użytkownik[input.name] = input.value;
        this.setState({użytkownik});
    }
    
 
    walidujDane(użytkownik){
        const { error } = Joi.validate(użytkownik, this.schema);
        return error ? error.details[0].message : null;
    };

    render(){
        const {użytkownik, tekst} = this.state;
        const { edytowanyElement } = this.props.stanRedux.reducerPanelKlienta;

        return ( 
            <div>
                { edytowanyElement === "" && 
                    <div>
                        <p className="mb-0 font-weight-bold">{tekst.imieInazwisko}</p>
                        <div className="d-flex">
                            <p className="ml-2 mr-4">{użytkownik.nazwa }</p>
                            <i className="fas fa-edit "
                                style={{cursor:"pointer"}}
                                onClick={ () => this.props.ustawEdytowanyElement("ustawienia-nazwa") }>
                            </i>
                        </div>
                    </div>
                }

                { edytowanyElement === "ustawienia-nazwa" && 
                    <div className="md-form border border-danger p-2 animated fadeIn faster">
                        <p className="font-weight-bold text-danger">{tekst.trybEdycji}</p>
                        <BlokInputu etykieta={tekst.imieInazwisko} name="nazwa" value={użytkownik.nazwa}
                                    onChange={this.przechwyćZmianęTreści}
                                    onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.zapiszZmianęDanych) }
                                    />
                        <div className="mt-2">
                            <MDBBtn className="" color="danger" size="sm" onClick={this.odrzućZmiany} >{tekst.przycisk.zamknij}</ MDBBtn>
                            <MDBBtn className="" color="success" size="sm" onClick={this.zapiszZmianęDanych} >{tekst.przycisk.zapisz}</ MDBBtn>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { stanRedux: state };
  };

const mapDispatchToProps = (dispatch) => {
    return {
    ustawEdytowanyElement: edytowanyElement => dispatch( ustawEdytowanyElement(edytowanyElement) ),
    }
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DaneUzytkownikaNazwa)

