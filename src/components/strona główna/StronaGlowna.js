import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import StronaGlownaNaglowek from './StronaGlownaNaglowek';
import WeryfikacjaKodu from './WeryfikacjaKodu';
import Stopka from './Stopka';
import RejestracjaUzytkownika from './RejestracjaUżytkownika';
import InformacjaPotwierdzenieKonta from './InformacjaPotwierdzenieKonta';
import Flagi from './Flagi';
import { ustawWersjęJęzykową } from '../../services/wersjaJęzykowaService';

import { connect } from 'react-redux';
import { zmieńWidocznośćMenu } from '../../redux/actions/actionsStronaGłówna';

class StronaGlowna extends Component {
    constructor(){
        super();
        this.state = { 
            wyświetlonyPrzycisk: "rejestruj",
            wersjaJęzykowa: 'pl'
        }
    }

    zmieńWersjęJęzykową = język => {
        ustawWersjęJęzykową(język)
        this.setState({wersjaJęzykowa: język})
    }
    
    zamieńPrzycisk = (przycisk) => {
        this.setState({ wyświetlonyPrzycisk: przycisk }) ;
        if (window.innerWidth <= 991)
            this.props.zmienWidocznoscMenu()
    }

    render() { 
        const { wyświetlonyPrzycisk } = this.state;

        return ( 
            <div className="strona-glowna d-flex flex-column">
                <StronaGlownaNaglowek wyświetlonyPrzycisk={wyświetlonyPrzycisk} zamieńPrzycisk={this.zamieńPrzycisk}/>
                <Flagi zmieńWersjęJęzykową={this.zmieńWersjęJęzykową}/>
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

  const mapStateToProps = (state) => {
        return { stanRedux: state };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      zmienWidocznoscMenu: () => dispatch( zmieńWidocznośćMenu() ),
    }
  };
  

  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(StronaGlowna)
    