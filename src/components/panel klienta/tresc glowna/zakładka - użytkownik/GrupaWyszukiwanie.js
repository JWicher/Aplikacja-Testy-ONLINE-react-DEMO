import React, { Component } from 'react';
import { MDBBtn, MDBInput } from "mdbreact";
import { NotificationManager } from 'react-notifications';
import grupaService from '../../../../services/grupaService';
import wspólneService from '../../../../services/wspólneService';

class GrupaWyszukiwanie extends Component {
    state = { 
        znalezionaGrupa: {},
        czekamNaOdpowiedźSerwera: false
    }

    wyszukiwarkaWprowadzanie = ({currentTarget: input}) => {
        this.setState({nazwaSzukanejGrupy: input.value});
    }

    szukajFirmy = async () => { // tu firma nip 
        this.uruchomLoader(true);
        try{
            const znalezionaGrupa = await grupaService.getGrupa(this.state.nazwaSzukanejGrupy);
            this.setState({znalezionaGrupa});
        }
        catch(ex){
            this.setState({nazwaSzukanejGrupy: ""})
            NotificationManager.error("Nie znaleziono takiej grupy w bazie danych");
        }
        finally {
            this.uruchomLoader(false);
        }
    }

    uruchomLoader = mode => {
        this.setState({ czekamNaOdpowiedźSerwera: mode })
    };

    render(){
        const { znalezionaGrupa, nazwaSzukanejGrupy } = this.state;

        return ( 
            <React.Fragment>
                { !znalezionaGrupa._id &&
                    <div>
                        <p className="mb-2 font-weight-bold">Wyszukaj grupę po nazwie</p>
                        <div className="ml-3">
                            <MDBInput label="Nazwa grupy" autoComplete="off" value={nazwaSzukanejGrupy} containerClass="m-0 mb-1" autoFocus
                                        onChange={this.wyszukiwarkaWprowadzanie}
                                        onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.szukajFirmy) }
                                        />
                            <div>
                                <MDBBtn className="ml-0" block color="info" size="sm" onClick={this.szukajFirmy} >Szukaj</ MDBBtn>
                            </div>
                        </div>
                    </div>
                }

                { znalezionaGrupa._id &&
                    <div>
                        <p className="mb-2 font-weight-bold">Znaleizono grupę</p>
                        <div className="ml-3">
                            <p className="mb-0"><span className="font-weight-bold mr-2">Nazwa:</span>{znalezionaGrupa.nazwa}</p>
                            <p className="mb-0">Czy przypisać grupę do Twojego konta?</p>
                            <div className="mt-2 d-flex">
                                <div className="ml-0 mr-2">
                                    <MDBBtn color="danger" outline size="sm" onClick={ () => { this.wyczyśćInput(); this.props.niePrzypisujDoGrupy() } } >Nie</ MDBBtn>
                                </div>
                                <div>
                                    <MDBBtn color="success" outline size="sm" onClick={ () => this.props.przypiszDoGrupy(znalezionaGrupa)} >Tak</ MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}
 
export default GrupaWyszukiwanie;