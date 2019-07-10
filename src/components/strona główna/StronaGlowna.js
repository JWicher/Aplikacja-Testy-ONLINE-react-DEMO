import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import StronaGlownaNaglowek from './StronaGlownaNaglowek';
import WeryfikacjaKodu from './WeryfikacjaKodu';
import Stopka from './Stopka';
import RejestracjaUzytkownika from './RejestracjaUżytkownika';
import InformacjaPotwierdzenieKonta from './InformacjaPotwierdzenieKonta';

class StronaGlowna extends Component {
    state = { 
        wyświetlonyPrzycisk: "rejestruj"
     }

     zamieńPrzycisk = (przycisk) => {
        this.setState({ wyświetlonyPrzycisk: przycisk })
    }

    render() { 
        const { wyświetlonyPrzycisk } = this.state;

        return ( 
            <div className="strona-glowna d-flex flex-column">
                <StronaGlownaNaglowek wyświetlonyPrzycisk={wyświetlonyPrzycisk} zamieńPrzycisk={this.zamieńPrzycisk}/>
                <Switch>
                    <Route path="/rejestracja/:id" component={ (props) => <InformacjaPotwierdzenieKonta {...props} zamieńPrzycisk={this.zamieńPrzycisk} />} />
                    <Route path="/rejestracja" component={ (props) => <RejestracjaUzytkownika zamieńPrzycisk={this.zamieńPrzycisk} />} />
                    <Route path="/" component={WeryfikacjaKodu} />
                </Switch>
                <Stopka />
            </div>
                
         );
    }
}
 
export default StronaGlowna;