import React from 'react';
import { MDBBtn } from "mdbreact";
import { NotificationManager } from 'react-notifications';
import { zdobądźTekstyWersjiJęzykowej } from '../../../services/wersjaJęzykowaService';
import użytkownikService from '../../../services/użytkownikService';
import testService from '../../../services/testService';

import { connect } from 'react-redux';
import { auktualizujListęTestów } from '../../../redux/actions/actionsPanelKlienta';

const PrzyciskDodajTest = (props) => {

    const tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.PanelKlientaTesty");

    const dodajTest = async () => {
        const użytkownik = użytkownikService.getUserFromJWT();
        const { testy } = props.stanRedux.reducerPanelKlienta


        const szkieletPustegoTestu = {
            nazwa: tekst.dodajTest.nazwa,
            krotkiOpis: tekst.dodajTest.krótkiOpis,
            zarejestrowal: {
                nazwa: użytkownik.nazwa,
                _id: użytkownik._id,
                data: new Date().toISOString().slice(0, 10)
            },
            modyfikowal: {
                nazwa: "",
                _id: użytkownik._id,
                data: ""
            },
            publiczny: false,
            avatar: "i_000.jpg",
            ktoWidziTest: { _id: użytkownik._id, nazwa: użytkownik.nazwa },
            limitCzasowy: { czyLimit: true, minuty: "25", sekundy: "0" },
            instrukcja: "",
            zadania: []
        };

        try {
            const nowyTest = await testService.zarejstrujNowyTest(szkieletPustegoTestu);
            testy.unshift(nowyTest);
            props.auktualizujListęTestów(testy)

        }
        catch (błąd) {
            if (błąd.response) {
                NotificationManager.error(błąd.response.data);
            }
        }
    }


    return (
        <MDBBtn
            block
            className={props.className}
            color="success"
            onClick={dodajTest}
        >{tekst.przycisk.dodajTest}
        </MDBBtn>
    );
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
)(PrzyciskDodajTest)
