import React, { Component } from 'react';
import PanelKlientaTest from './zakładka - testy/PanelKlientaTest';
import { MDBBtn } from "mdbreact";
import { NotificationManager } from 'react-notifications';
import testService from '../../../services/testService';
import użytkownikService from '../../../services/użytkownikService';

class PanelKlientaTesty extends Component {
    state = { 
        testy: []
    };
  
    async componentDidMount() {
        this.mounted = true;
        const testy = await testService.getTests();
        if(this.mounted)
            this.setState({ testy });
    }
    componentWillUnmount(){
        this.mounted = false;
    }

    dodajTest = async () => {
        const użytkownik = użytkownikService.getUserFromJWT();
        const { testy } = this.state;
        const szkieletPustegoTestu = {
            nazwa: "Nowy test - pusta formatka",
            krotkiOpis: "Nowy test - krótki opis",
            zarejestrowal: {
                nazwa: użytkownik.nazwa,
                _id: użytkownik._id,
                data: new Date().toISOString().slice(0,10)
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
        
        try{
            const nowyTest = await testService.zarejstrujNowyTest(szkieletPustegoTestu);
            testy.unshift(nowyTest);
            this.setState({testy});
            NotificationManager.success("Dodano nowy test");

        }
        catch(błąd){
            if(błąd.response) {
                NotificationManager.error(błąd.response.data);
            }
        }
    }
    onUsuńTest = async test => {
        try{
            const usuniętyTest = await testService.usuńTest(test);
            const testy = [...this.state.testy];
            const indeks = testy.findIndex( test => test._id === usuniętyTest._id )
            testy.splice(indeks, 1);
            NotificationManager.success("Usunięto test");
            this.setState({testy})
        }
        catch(błąd){
            if(błąd.response) {
                NotificationManager.error("Próba usunięcia się nie powiodła");
            }
        }
    }
    zapiszZmiany = async (testZeZmianą) => {
        try{
           const testy = [...this.state.testy];
           const użytkownik = użytkownikService.getUserFromJWT();

           testZeZmianą.modyfikowal = {
                nazwa: użytkownik.nazwa,
                _id: użytkownik._id,
                data: new Date().toISOString().slice(0,10)
            };

           const zapisaneDaneTestu = await testService.zmodyfikujTest(testZeZmianą._id, testZeZmianą);
           const indeks = testy.findIndex( test => test._id === zapisaneDaneTestu._id )
           testy[indeks] = zapisaneDaneTestu;

           this.setState({testy})
           NotificationManager.success("Zapisano zmiany");
       }
       catch(błąd){
           if(błąd.response) {
               NotificationManager.error(błąd.response.data);
           }
       }
   }

  
    render() { 
        const { testy } = this.state;
        return ( 
            <div>
                <MDBBtn color="success" onClick={ this.dodajTest } >Dodaj test</MDBBtn>
                <hr />
                { testy.map( test => <PanelKlientaTest key={test._id} test={test} onUsuńTest={this.onUsuńTest} onZapiszZmiany={this.zapiszZmiany}/>)}
            </div>
         );
    }
}
 
export default PanelKlientaTesty;