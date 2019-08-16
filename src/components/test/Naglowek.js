import React, { Component } from 'react';
import Zegar from './Zegar';
import Loader from '../współne/loader';
import { zdobądźTekstyWersjiJęzykowej } from '../../services/wersjaJęzykowaService';

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
        const { iloscZaznaczonych, iloscZadan, czas } = this.props;
        const tekst = zdobądźTekstyWersjiJęzykowej("test.Naglowek");

        return ( 
            <nav className="test__naglowek navbar navbar-expand-lg navbar-dark blue d-flex justify-content-between">
                
                <Zegar czas={czas} />

                <div className="d-flex flex-column text-center">
                    <div className="test__naglowek_licznik-zadan">
                        {tekst.etykietaOdpowiedzi} <span className="test__naglowek_licznik-zadan-liczby">{ iloscZaznaczonych } / { iloscZadan }</span>
                    </div>
                </div>

                { !czekamNaOdpowiedźSerwera ? 
                    <button className="btn btn-success m-0" onClick={ this.przekażWynikiDoWysłania }>{tekst.przyciskWyśljWyniki}</button>
                    :
                    <Loader opcje="logo-obrot" />
                }

            </nav>
         );
    }
}
 
export default Naglowek;

