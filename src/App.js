import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom';
import ChronionaSciezka from './components/współne/ChronionaSciezka';
import StronaGlowna from './components/strona główna/StronaGlowna';
import TestWezel from './components/test/TestWezel';
import PanelKlienta from './components/panel klienta/PanelKlienta';
import {NotificationContainer} from 'react-notifications';

import httpService from "./services/httpService";

class App extends Component {
  constructor(props){
      super(props)
      this.state = {}
      document.title = "JW TESTY ONLINE"
  }

  async componentDidMount() {
    const ping = await httpService.get()
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
