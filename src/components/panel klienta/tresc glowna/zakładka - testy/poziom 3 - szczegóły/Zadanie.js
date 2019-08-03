import React, { Component } from 'react';
import Joi from 'joi-browser';
import { NotificationManager } from 'react-notifications';
import OryginalneZadanie from './OryginalneZadanie';
import EdytowaneZadanie from './EdytowaneZadanie';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../../services/wersjaJęzykowaService';

class Zadanie extends Component {
    constructor(props){
        super(props);
        this.state = { 
            zadanie: props.zadanie,
            trybEdycji: false,
        }
        this.dostępneWartośćiId = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        this.tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.testy.poziom3_szczegóły.Zadanie");
    }

    schemaZadanieOtwarte = Joi.object().keys({
        tresc: Joi.string().min(1).error( () => {return { message: this.tekst.walidacjaInfoBłąd.treść };}),
    }).unknown(true);

    schemaZadanieZamknięte = Joi.object().keys({
        tresc: Joi.string().min(1).error( () => {return { message: this.tekst.walidacjaInfoBłąd.treść };}),
        opcje_wyboru: Joi.array().min(1).required().items(
            Joi.object().keys({
                id: Joi.string().required(),
                tresc: Joi.string().required().error( () => {return { message: this.tekst.walidacjaInfoBłąd.treść_opcja };}
            )}).unknown(true)
        ).error( () => { return { message: this.tekst.walidacjaInfoBłąd.niePodanoOpcji } })
    }).unknown(true);

    walidujDane(zadanie){
        const schema = zadanie.typ === "otwarte" ? this.schemaZadanieOtwarte :  this.schemaZadanieZamknięte;
        const { error } = Joi.validate(zadanie, schema);
        return error ? error.details[0].message : null;
    };


    static getDerivedStateFromProps(props, state) {
          if ( props.zadanie._id !== state.zadanie._id ) {
            return { zadanie: props.zadanie };
          }
          return null;
    }

    przełączTrybEdycji = () => {
        this.setState({trybEdycji: !this.state.trybEdycji})
    }

    zapiszZmianęZadania = async() => {
        const { zadanie } = this.state;
        const bład = this.walidujDane(zadanie);
        if(bład){
            NotificationManager.error(bład);
            return; 
        }
        this.przełączTrybEdycji();

        zadanie.tresc = zadanie.tresc.trim();
        zadanie.opcje_wyboru = zadanie.opcje_wyboru.map( opcja => Object.assign( {}, opcja, 
            { tresc: opcja.tresc.trim() }
        ))

        this.props.onWyślijZmianyZadań(zadanie);
    }
    odrzućZmiany = () => {
        const zadanie = { ...this.props.zadanie }
        this.przełączTrybEdycji();
        this.setState({zadanie})
    }

    przechwyćZmianęTreści = ({currentTarget: input}) => {
        const zadanie = { ...this.state.zadanie };
        zadanie[input.name] = input.value;
        this.setState({zadanie});
    }

    przechwyćZmianęTreściOpcji = ({currentTarget: input}) => {
        const opcje_wyboru = [ ...this.state.zadanie.opcje_wyboru ];
        const zadanie = { ...this.state.zadanie};
        const indeks = opcje_wyboru.findIndex( opcja => opcja.id === input.name );
        opcje_wyboru[indeks] = {
            id: opcje_wyboru[indeks].id,
            tresc: input.value
        };
        zadanie.opcje_wyboru = opcje_wyboru;
        
        this.setState({zadanie});
    }
    onPrzechwyćZmianęPoprawnejOdpowiedzi = ({ currentTarget: input }) => {
        const zadanie = { ...this.state.zadanie };
        zadanie.poprawna_odpowiedz = input.value;
        this.setState({zadanie})
    }
    dodajOpcję = async () => {
        const zadanie = { ...this.state.zadanie };
        const nrNowejOpcji = zadanie.opcje_wyboru.length -1;
        const noweId = this.dostępneWartośćiId[ nrNowejOpcji + 1 ];
        zadanie.opcje_wyboru = [...zadanie.opcje_wyboru, {id: noweId, tresc: this.tekst.dodajOpcję.treść }]
        this.setState({zadanie})
    }
    usuńOpcję = async (usuwanaOpcja) => {
        const zadanie = { ...this.state.zadanie };
        let opcje_wyboru = [ ...zadanie.opcje_wyboru ];

        const indeks = zadanie.opcje_wyboru.findIndex( opcja => opcja.id === usuwanaOpcja.id );

        opcje_wyboru.splice(indeks, 1);
        opcje_wyboru = opcje_wyboru.map( (opcja, indeksOpcji) => 
            Object.assign({}, opcja, {id: this.dostępneWartośćiId[ indeksOpcji ]} ) )

        zadanie.opcje_wyboru = opcje_wyboru;
        this.setState({zadanie})
    }

    czyDokonanoZmian(){
        return JSON.stringify(this.state.zadanie) === JSON.stringify(this.props.zadanie)
    }

    render() { 
        const { zadanie, trybEdycji } = this.state;
        const { użytkownikToAutor } = this.props;
        
        if(!zadanie) return <p>Brak zadania</p>
        const dokonanoZmian = this.czyDokonanoZmian();

        const stylPojemnika = trybEdycji ? "d-flex border border-danger border-2" : ""; 
        return ( 
            <div className={stylPojemnika}>
                { !trybEdycji && <OryginalneZadanie
                                    zadanie={zadanie}
                                    użytkownikToAutor={użytkownikToAutor}
                                    onPrzełączTrybEdycji={this.przełączTrybEdycji}
                                    />}
                { trybEdycji && <EdytowaneZadanie
                                    zadanie={zadanie}
                                    dokonanoZmian={dokonanoZmian}
                                    onPrzełączTrybEdycji={this.przełączTrybEdycji}
                                    onPrzechwyćZmianęTreści={this.przechwyćZmianęTreści}
                                    onPrzechwyćZmianęTreściOpcji={this.przechwyćZmianęTreściOpcji}
                                    onPrzechwyćZmianęPoprawnejOdpowiedzi={this.onPrzechwyćZmianęPoprawnejOdpowiedzi}
                                    onZapiszZmianęZadania={this.zapiszZmianęZadania}
                                    onOdrzućZmiany={this.odrzućZmiany}
                                    onDodajOpcję={this.dodajOpcję}
                                    onUsuńOpcję={this.usuńOpcję}
                                    onUsuńZadanie={ () => { this.przełączTrybEdycji(); this.props.onUsuńZadanie(zadanie) } }
                                    />}
            </div>
         );
    }
}

export default Zadanie;