import React, { PureComponent } from "react";
import { MDBBtn, MDBCollapse } from "mdbreact";
import PanelKlientaTesPoziom1 from './PanelKlientaTest-Poziom1';
import PanelKlientaTesPoziom2 from './PanelKlientaTest-Poziom2';
import PanelKlientaTesPoziom3 from './PanelKlientaTest-Poziom3';

class PanelKlientaTest extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      test: props.test    
    }
  }

  componentDidMount() {
    this.setState({test: this.props.test})
  }

  static getDerivedStateFromProps(props, state) {
    if ( JSON.stringify(props.test) !== JSON.stringify(state.test) ) {
        return { test: props.test };
    }
    return null;
  }



  zawijanieTestu = (collapseID) => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
      activeItem: ""
    }));
  }
  wyświetlZakładkę = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
    else this.setState({ activeItem: "" })
  };
  onZapiszZmianyIZwińTest = (zmiany) => {
    this.props.onZapiszZmiany(zmiany);
    if(!zmiany.zadania)
      this.setState({ activeItem:''});
  }
  render() { 
    const { test } = this.state;
    if (!test) return <p>Brak testu</p>;

    return (
        <div className="panel-klienta__tresc p-0 border-1 border-primary btn-block">

            <MDBBtn className="m-0" color="link" outline block onClick={this.zawijanieTestu("basicCollapse")} >
                <PanelKlientaTesPoziom1 test={test} />
            </MDBBtn>

            <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                <div className="text-dark">
                    <PanelKlientaTesPoziom2 test={test} activeItem={this.state.activeItem} toggle={this.wyświetlZakładkę} />
                    <PanelKlientaTesPoziom3 test={test} activeItem={this.state.activeItem}
                                onUsuńTest={this.props.onUsuńTest}
                                onZapiszZmiany={ this.onZapiszZmianyIZwińTest } />
                </div>
            </MDBCollapse>

        </div>
    )
  }
}
 
export default PanelKlientaTest;