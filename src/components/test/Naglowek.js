import React, { Component } from 'react';
import Zegar from './Zegar';
import Loader from '../współne/loader';

class Naglowek extends Component {
    constructor(){
        super();
        this.state = { 
            czekamNaOdpowiedźSerwera: false,
         }
    }
    
    uruchomLoader(mode){
        this.setState({ czekamNaOdpowiedźSerwera: mode })
    };

    przekażWynikiDoWysłania = () => {
       this.uruchomLoader(true);
       this.props.onWyślijWyniki();
    }
    render() { 
        const { czekamNaOdpowiedźSerwera } = this.state;
        const {nazwaTestu, iloscZaznaczonych, iloscZadan, czas} = this.props;

        return ( 
            <nav className="test__naglowek navbar navbar-expand-lg navbar-dark blue d-flex justify-content-between">
                <Zegar czas={czas} />
                <div className="d-flex flex-column text-center">
                    <h2 className="text-uppercase font-weight-bold">{nazwaTestu}</h2>
                    <div className="test__naglowek_licznik-zadan">
                        Ilość udzielonych odpowiedzi: <span className="test__naglowek_licznik-zadan-liczby">{ iloscZaznaczonych } / { iloscZadan }</span>
                    </div>
                </div>
                <div className="w-175px d-flex justify-content-center">
                    { !czekamNaOdpowiedźSerwera ? 
                        <button className="btn btn-success" onClick={ this.przekażWynikiDoWysłania }>Wyślij wyniki</button>
                        :
                        <Loader opcje="logo-obrot" />
                    }
                </div>
            </nav>
         );
    }
}
 
export default Naglowek;

