import React, { PureComponent } from 'react';
import GeneratorKodu from './poziom 3 - szczegóły/GeneratorKodu';
import ModyfikowanieTestu from './poziom 3 - szczegóły/ModyfikujTest';
import ZadaniaTestu from './poziom 3 - szczegóły/ZadaniaTestu';
import { MDBTabContent, MDBTabPane } from "mdbreact";

class PanelKlientaTesPoziom3 extends PureComponent {
    state = {  }
    render() { 
        const { test, activeItem } = this.props;

        return ( 
                <MDBTabContent activeItem={activeItem} >
                    <MDBTabPane className="animated fadeIn" tabId="1" role="tabpanel">
                        <ZadaniaTestu test={test} onZapiszZmiany={this.props.onZapiszZmiany} />
                    </MDBTabPane>
                    <MDBTabPane className="animated fadeIn" tabId="2" role="tabpanel">
                        <ModyfikowanieTestu test={test} onUsuńTest={this.props.onUsuńTest}
                                            onZapiszZmiany={this.props.onZapiszZmiany} />
                    </MDBTabPane>
                    <MDBTabPane className="animated fadeIn" tabId="3" role="tabpanel">
                        <GeneratorKodu test={test}/>
                    </MDBTabPane>
                </MDBTabContent>  
         );
    }
}
 
export default PanelKlientaTesPoziom3;