import React, { PureComponent } from 'react';
import GeneratorKodu from './poziom 3 - szczegóły/GeneratorKodu';
import ModyfikowanieTestu from './poziom 3 - szczegóły/ModyfikujTest';
import ZadaniaTestu from './poziom 3 - szczegóły/ZadaniaTestu';
import { MDBTabContent, MDBTabPane } from "mdbreact";

import { connect } from 'react-redux';

class PanelKlientaTesPoziom3 extends PureComponent {
    state = {}
    render() {
        const { test } = this.props;
        const { otwartaZakładka } = this.props.stanRedux.reducerPanelKlienta;

        return (
            <MDBTabContent activeItem={otwartaZakładka} >
                <MDBTabPane className="animated fadeIn" tabId={`${test._id}-1`} role="tabpanel">
                    <ZadaniaTestu test={test} onZapiszZmiany={this.props.onZapiszZmiany} />
                </MDBTabPane>
                <MDBTabPane className="animated fadeIn" tabId={`${test._id}-2`} role="tabpanel">
                    <ModyfikowanieTestu test={test}
                        onZapiszZmiany={this.props.onZapiszZmiany} />
                </MDBTabPane>
                <MDBTabPane className="animated fadeIn" tabId={`${test._id}-3`} role="tabpanel">
                    <GeneratorKodu test={test} />
                </MDBTabPane>
            </MDBTabContent>
        );
    }
}


const mapStateToProps = (state) => {
    return { stanRedux: state };
};


export default connect(
    mapStateToProps
)(PanelKlientaTesPoziom3)
