import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom';
import ChronionaSciezka from './components/współne/ChronionaSciezka';
import StronaGlowna from './components/strona główna/StronaGlowna';
import TestWezel from './components/test/TestWezel';
// import InformacjaKońcowa from './components/test/InformacjaKońcowa';
import PanelKlienta from './components/panel klienta/PanelKlienta';
import {NotificationContainer} from 'react-notifications';
import './main.css';

class App extends Component {
  constructor(props){
      super(props)
      this.state = {}
      document.title = "JW TESTY ONLINE"
  }

  render() { 
    return ( 
      <div className="App">
        <NotificationContainer/>
        <Switch>
          <ChronionaSciezka path="/panel-klienta" component={PanelKlienta} warunek="użytkownik" />
          <ChronionaSciezka path="/test" component={TestWezel} warunek="kod" />
          <Route path="/" component={StronaGlowna} />
        </Switch>

      </div>
     );
  }
}
 
export default App;
