import React, { PureComponent } from "react";
import { MDBBtn, MDBCollapse } from "mdbreact";
import PanelKlientaTesPoziom1 from './PanelKlientaTest-Poziom1';
import PanelKlientaTesPoziom2 from './PanelKlientaTest-Poziom2';
import PanelKlientaTesPoziom3 from './PanelKlientaTest-Poziom3';
import { connect } from 'react-redux';
import { rozwińTest, rozwińZakładkę, ustawEdytowanyElement } from '../../../../redux/actions/actionsPanelKlienta';

class PanelKlientaTest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      test: props.test,
    }
  }

  componentDidMount() {
    this.setState({ test: this.props.test })
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.test) !== JSON.stringify(state.test)) {
      return { test: props.test };
    }

    return null;
  }


  zawijanieTestu = (collapse_Test_ID) => () => {
    const { id_otwartegoTestu } = this.props.stanRedux.reducerPanelKlienta;
    let ustawianaWartość = collapse_Test_ID;

    if (id_otwartegoTestu === collapse_Test_ID) {
      ustawianaWartość = "";
    }

    this.props.rozwińTest(ustawianaWartość)
    this.props.rozwińZakładkę("")
    this.props.ustawEdytowanyElement("")

  }

  onZapiszZmianyIZwińTest = (zmiany) => {
    this.props.onZapiszZmiany(zmiany);
    if (!zmiany.zadania) {
      this.props.rozwińZakładkę("")
      this.props.ustawEdytowanyElement("")
    }
  }
  render() {
    const { test } = this.state;
    const { id_otwartegoTestu } = this.props.stanRedux.reducerPanelKlienta;

    if (!test) return <p>Brak testu</p>;

    return (
      <div className="panel-klienta__tresc_test p-0 border-1 border-primary btn-block">

        <MDBBtn className="m-0 p-2 p-sm-3 p-md-4" color="link" outline block onClick={this.zawijanieTestu(test._id)} >
          <PanelKlientaTesPoziom1 test={test} />
        </MDBBtn>

        <MDBCollapse id={test._id} isOpen={id_otwartegoTestu === test._id}>
          <PanelKlientaTesPoziom2 test={test} />
          <PanelKlientaTesPoziom3 test={test} onZapiszZmiany={this.onZapiszZmianyIZwińTest} />
        </MDBCollapse>

      </div>
    )
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
)(PanelKlientaTest)
