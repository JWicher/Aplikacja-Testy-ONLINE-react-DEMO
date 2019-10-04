import React, { Component } from 'react';
import PanelKlientaTest from './zakładka - testy/PanelKlientaTest';
import { NotificationManager } from 'react-notifications';
import testService from '../../../services/testService';
import użytkownikService from '../../../services/użytkownikService';
import { zdobądźTekstyWersjiJęzykowej } from '../../../services/wersjaJęzykowaService';
import { auktualizujListęTestów } from '../../../redux/actions/actionsPanelKlienta';
import { connect } from 'react-redux';


class PanelKlientaTesty extends Component {
    constructor() {
        super();
        this.state = {}
        this.tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.PanelKlientaTesty");
    };

    async componentDidMount() {
        const { testy: testyRedux } = this.props.stanRedux.reducerPanelKlienta
        const testy = testyRedux.length > 0 ? testyRedux : await testService.getTests();
        this.setState({ testy })
        this.props.auktualizujListęTestów(testy)
    }

    static getDerivedStateFromProps(props, state) {
        const propstesty = props.stanRedux.reducerPanelKlienta.testy;
        if (propstesty !== state.testy) {
            return {
                testy: propstesty,
            };
        }
        return null;
    }

    zapiszZmiany = async (testZeZmianą) => {
        try {
            const użytkownik = użytkownikService.getUserFromJWT();

            testZeZmianą.modyfikowal = {
                nazwa: użytkownik.nazwa,
                _id: użytkownik._id,
                data: new Date().toISOString().slice(0, 10)
            };

            const zapisaneDaneTestu = await testService.zmodyfikujTest(testZeZmianą._id, testZeZmianą);

            const testy = [...this.state.testy];
            const indeks = testy.findIndex(test => test._id === zapisaneDaneTestu._id)
            testy[indeks] = zapisaneDaneTestu;

            this.setState({ testy })
            NotificationManager.success(this.tekst.notyfikacje.zapiszZmiany.sukces);
        }
        catch (błąd) {
            if (błąd.response) {
                NotificationManager.error(this.tekst.notyfikacje.zapiszZmiany.niepowodzenie);
            }
        }
    }


    render() {
        const { testy } = this.props.stanRedux.reducerPanelKlienta

        return (
            <React.Fragment>
                {testy.map(test => <PanelKlientaTest
                    key={test._id} test={test}
                    onZapiszZmiany={this.zapiszZmiany} />)}
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return { stanRedux: state };
};
const mapDispatchToProps = (dispatch) => {
    return {
        auktualizujListęTestów: testy => dispatch(auktualizujListęTestów(testy)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelKlientaTesty)
