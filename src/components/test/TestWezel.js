import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import InstrukcjaTestu from './InstrukcjaTestu';
import InformacjaKońcowa from './InformacjaKońcowa';
import Test from './Test';

const TestWezel = () => {
    return ( 
        <Switch>
            <Route path="/test/instrukcja" component={InstrukcjaTestu} />
            <Route path="/test/informacja-koncowa" component={InformacjaKońcowa} />
            <Route path="/test/test" component={Test} />
            <Redirect from="/test" to="/test/instrukcja" />
        </Switch>

     );
}
 
export default TestWezel;