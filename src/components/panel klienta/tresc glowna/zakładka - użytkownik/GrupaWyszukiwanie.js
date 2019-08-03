import React, { Component } from 'react';
import { MDBBtn, MDBInput } from "mdbreact";
import { NotificationManager } from 'react-notifications';
import grupaService from '../../../../services/grupaService';
import wspólneService from '../../../../services/wspólneService';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../services/wersjaJęzykowaService';

class GrupaWyszukiwanie extends Component {
    constructor(){
        super();
        this.state = { 
            znalezionaGrupa: {},
            czekamNaOdpowiedźSerwera: false
        }

        this.tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.użytkownik.GrupaWyszukiwanie");
    }

    wyczyśćInput = () => {
        this.setState({znalezionaGrupa: {nazwa: ""}})
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
            NotificationManager.error(this.tekst.notyfikacja.błądNieznalezionoGrupy);
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
                        <p className="mb-2 font-weight-bold">{this.tekst.blokNieznalezionoGrupy.tytuł}</p>
                        <div className="ml-3">
                            <MDBInput label="Nazwa grupy" autoComplete="off" value={nazwaSzukanejGrupy} containerClass="m-0 mb-1" autoFocus
                                        onChange={this.wyszukiwarkaWprowadzanie}
                                        onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, this.szukajFirmy) }
                                        />
                            <div>
                                <MDBBtn className="ml-0" block color="info" size="sm" onClick={this.szukajFirmy} >{this.tekst.przycisk.szukaj}</ MDBBtn>
                            </div>
                        </div>
                    </div>
                }

                { znalezionaGrupa._id &&
                    <div>
                        <p className="mb-2 font-weight-bold">{this.tekst.tytuł}</p>
                        <div className="ml-3">
                            <p className="mb-0"><span className="font-weight-bold mr-2">`${this.tekst.nazwa}:`</span>{znalezionaGrupa.nazwa}</p>
                            <p className="mb-0">{this.tekst.czyPrzypisać}</p>
                            <div className="mt-2 d-flex">
                                <div className="ml-0 mr-2">
                                    <MDBBtn color="danger" outline size="sm" onClick={ () => { this.wyczyśćInput(); this.props.niePrzypisujDoGrupy() } } >{this.tekst.przycisk.zaprzeczenie}</ MDBBtn>
                                </div>
                                <div>
                                    <MDBBtn color="success" outline size="sm" onClick={ () => this.props.przypiszDoGrupy(znalezionaGrupa)} >{this.tekst.przycisk.potwierdzenie}</ MDBBtn>
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