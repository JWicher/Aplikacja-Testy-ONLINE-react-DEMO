import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PanelKlientaTesty from './tresc glowna/PanelKlientaTesty';
import PanelKlientaKody from './tresc glowna/PanelKlientaKody';
import MenuBoczne from './menu boczne/MenuBoczne';
import Naglowek from './nagłówek/Naglowek';
import PanelKlientaUżytkownik from './tresc glowna/PanelKlientaUżytkownik';
import WykazUzytkownikow from './tresc glowna/zakładka - użytkownik/WykazUzytkownikow';
import użytkownikService from '../../services/użytkownikService';
import { rozwińTest, rozwińZakładkę, ustawEdytowanyElement } from '../../redux/actions/actionsPanelKlienta';
import { connect } from 'react-redux';

class PanelKlienta extends Component {
    constructor() {
        super();
        this.state = {
            otwartaZakładka: "/panel-klienta/testy",
        }
    }
    componentDidMount() {
        this.setState({ otwartaZakładka: window.location.pathname })
    }
    zmianaZakładki = (zakładka) => {

        this.props.rozwińTest("")
        this.props.rozwińZakładkę("");
        this.props.ustawEdytowanyElement("")

        this.setState({ otwartaZakładka: zakładka })
    }
    render() {
        const użytkownik = użytkownikService.getUserFromJWT();
        return (
            <div className="panel-klienta p-0 col">
                <Naglowek />
                <div className="col panel-klienta__czesc-robocza">
                    <div className="row d-flex flex-column flex-sm-row h-100">
                        {/* <div className="col col-sm-2 px-2 panel-klienta__menu-boczne d-flex flex-column flex-grow-0"> */}
                        <MenuBoczne onZmianaZakładki={this.zmianaZakładki} otwartaZakładka={this.state.otwartaZakładka} />
                        {/* </div> */}
                        <div className="col px-2 panel-klienta__tresc">
                            <Switch>
                                <Route path="/panel-klienta/testy" component={PanelKlientaTesty} />
                                <Route path="/panel-klienta/kody" component={PanelKlientaKody} />
                                <Route path="/panel-klienta/uzytkownik" component={PanelKlientaUżytkownik} />
                                {użytkownik.czyAdmin && <Route path="/panel-klienta/uzytkownicy" component={WykazUzytkownikow} />}
                                <Route path="/panel-klienta/" component={PanelKlientaTesty} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return { stanRedux: state };
};

const mapDispatchToProps = (dispatch) => {
    return {
        rozwińTest: test => dispatch(rozwińTest(test)),
        rozwińZakładkę: zakładka => dispatch(rozwińZakładkę(zakładka)),
        ustawEdytowanyElement: edytowanyElement => dispatch(ustawEdytowanyElement(edytowanyElement)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelKlienta)
