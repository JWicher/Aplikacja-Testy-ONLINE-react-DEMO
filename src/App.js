import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom';
import StronaGlowna from './components/strona główna/StronaGlowna';
import Test from './components/test/Test';
import InformacjaKońcowa from './components/test/InformacjaKońcowa';
import PanelKlienta from './components/panel klienta/PanelKlienta';
import {NotificationContainer} from 'react-notifications';
import './main.css';

class App extends Component {
  constructor(props){
      super(props)
      this.state = {}
      document.title = "TESTY ONLINE"
  }

  render() { 
    return ( 
      <div className="App">
        <NotificationContainer/>
        <Switch>
            <Route path="/panel-klienta" component={PanelKlienta} />
            <Route path="/test/informacja-koncowa" component={InformacjaKońcowa} />
            <Route path="/test" component={Test} />
            <Route path="/" component={StronaGlowna} />
        </Switch>

      </div>
     );
  }
}
 
export default App;
