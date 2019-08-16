import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StronaGlownaNaglowek from './StronaGlownaNaglowek';
import WeryfikacjaKodu from './WeryfikacjaKodu';
import Stopka from './Stopka';
import RejestracjaUzytkownika from './RejestracjaUżytkownika';
import InformacjaPotwierdzenieKonta from './InformacjaPotwierdzenieKonta';
import Flagi from './Flagi';

const StronaGlowna = () => {
    return ( 
        <div className="strona-glowna d-flex flex-column">
            <StronaGlownaNaglowek />
            <Flagi />
            <Switch>
                <Route path="/rejestracja/:id" component={ (props) => <InformacjaPotwierdzenieKonta {...props} />} />
                <Route path="/rejestracja" component={ (props) => <RejestracjaUzytkownika />} />
                <Route path="/" component={WeryfikacjaKodu} />
            </Switch>
            <Stopka />
        </div>
            
     );
}
 
export default StronaGlowna
