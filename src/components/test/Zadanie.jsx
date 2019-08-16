import React, { PureComponent } from 'react';
import { MDBJumbotron, MDBAlert } from "mdbreact";
import OpcjaWyboru from './OpcjaWyboru';
import { zdobądźTekstyWersjiJęzykowej } from '../../services/wersjaJęzykowaService';

class Zadanie extends PureComponent {
  constructor(props){
    super();
    this.state = {
      obecnieWybranaOpcja: props.zadanie.udzielonaOdpowiedz,
      probaKopiowania: false
    }
  }


  componentDidMount() {
   const { zadanie } = this.props;
   this.setState({ obecnieWybranaOpcja: zadanie.udzielonaOdpowiedz });
  }

  zaznaczOpcję = (nowoWybranaOpcja) => {
    const { zadanie, onZaktualizujOdpowiedzi } = this.props;
    let { obecnieWybranaOpcja } = this.state;
        
        obecnieWybranaOpcja = obecnieWybranaOpcja.id === nowoWybranaOpcja.id ? {id: "", tresc: ""} : nowoWybranaOpcja;
    onZaktualizujOdpowiedzi( {numerZadania: zadanie.numer, aktualnaOdpowiedz: obecnieWybranaOpcja } )
    this.setState({ obecnieWybranaOpcja });
  }

  zapiszTrescZadaniaOtwartego = ({ currentTarget }) => {
    const { zadanie, onZaktualizujOdpowiedzi } = this.props;
    const tresc = currentTarget.value !== "" ? currentTarget.value :  "";
    const odpowiedz = { numerZadania: zadanie.numer, aktualnaOdpowiedz: { id: "", tresc } };
    onZaktualizujOdpowiedzi(odpowiedz)
  }
  
  zakazWklejania = (e) => {
    e.preventDefault();
    this.setState({ probaKopiowania: true })
    setTimeout( ()=> {this.setState({probaKopiowania: false}) }, 3000 )
  }

  wygenerujZadanieZamknięte(zadanie){
    const { obecnieWybranaOpcja } = this.state;
    const tekst = zdobądźTekstyWersjiJęzykowej("test.Zadanie");

    return (
      <MDBJumbotron className="p-3 test__zadania_zadanie">
              <p className="text-left test__zadania_zadanie_numer-zadania">{`${tekst.etykietaZadanieNr} ${zadanie.numer}`} </p>
              <p className="lead"> {zadanie.tresc} </p>
              { zadanie.opcje_wyboru.map( opcja =>
                  <OpcjaWyboru
                        key={opcja.id}
                        opcja={opcja}
                        obecnieWybranaOpcja={ obecnieWybranaOpcja }
                        numerZadania={zadanie.numer}
                        onZaznaczOpcję = {this.zaznaczOpcję}
                        />
              )}
      </MDBJumbotron>
    )
  }
  wygenerujZadanieOtwarte(zadanie){
    const { odpowiedzi }= this.props;
    const index = odpowiedzi.findIndex( odp => odp.numerZadania === zadanie.numer);
    const tekst = zdobądźTekstyWersjiJęzykowej("test.Zadanie");

    const trescOdpowiedzi = odpowiedzi[index].odpowiedz !== "" ? odpowiedzi[index].odpowiedz.tresc : "";
    return (
      <MDBJumbotron className="p-3 test__zadania_zadanie">
              <p className="text-left test__zadania_zadanie_numer-zadania">{`${tekst.etykietaZadanieNr} ${zadanie.numer}`}</p>
              <h2 className="lead font-weight-bold"> {zadanie.tytul} </h2>
              <p className="lead"> {zadanie.tresc} </p>
              <div className="form-group shadow-textarea">
                { this.state.probaKopiowania && <MDBAlert className="" color="danger">{tekst.informacjaPrzyPróbieWklejania}</MDBAlert> }
                <textarea
                  className="form-control z-depth-1"
                  rows="10"
                  defaultValue={trescOdpowiedzi}
                  placeholder="Write your answer here..."
                  onChange={this.zapiszTrescZadaniaOtwartego}
                  onPaste={this.zakazWklejania}
                  >
                </textarea> 
              </div>
            </MDBJumbotron>
    )
  }
  render() { 
    const { zadanie } = this.props;
    return ( 
      <div className="mt-4 text-left container">
              { zadanie.typ === "zamknięte" &&  this.wygenerujZadanieZamknięte(zadanie) }
              { zadanie.typ === "otwarte" &&  this.wygenerujZadanieOtwarte(zadanie) }
      </div>
    );
  }
}
 
export default Zadanie;