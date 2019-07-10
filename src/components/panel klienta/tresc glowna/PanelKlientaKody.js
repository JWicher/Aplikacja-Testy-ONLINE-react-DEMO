import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import KodTestuNaglowek from './zakładka - kody testów/KodTestuNaglowek';
import KodTestu from './zakładka - kody testów/KodTestu';
import kodTestuService from '../../../services/kodTestuService';

class PanelKlientaKody extends Component {
    constructor(){
        super();
        this.state = { 
            kodyTestów: []
         };

    }

    async componentDidMount() {
        const kodyTestów = await kodTestuService.getKodyTestów();
        this.setState({ kodyTestów });
    }
    usuńKod = async (kod) => {
        try{
            const {kodyTestów} = this.state;
            await kodTestuService.usuńKodTestu(kod);
            const indeks = kodyTestów.findIndex( kodTestu => kodTestu.kod === kod );
            kodyTestów.splice(indeks, 1);
            this.setState({kodyTestów})
        }
        catch(błąd){
            NotificationManager.error(błąd.response.data);
        }
    }

    uruchomOstrzeżenieDlaKoduTestu = (kod) => {
        confirmAlert({
        customUI: ({ onClose }) => {
            return (
            <div className='react-confirm-alert__body'>
                <h1>Usuwanie zapisu</h1>
                <p className="mt-2 m-0">Czy napewno chcesz usunąć ten kod?</p>
                <div className="d-flex">
                    <MDBBtn onClick={onClose} color="danger" size="sm">Nie</MDBBtn>
                    <MDBBtn onClick={ () => { this.usuńKod(kod); onClose() }} color="success" size="sm">Tak</MDBBtn>
                </div>
            </div>
            );
        }
        });
    };

    render() { 
        const { kodyTestów } = this.state;
        if(!kodyTestów.length) return <p className="font-weight-bold">Brak kodów.</p>
        return ( 
            <div className="panel-klienta__tresc_kody-testow">

                <KodTestuNaglowek />

                <AutoSizer >
                    {({ height, width }) => (
                    <FixedSizeList
                            itemData={kodyTestów}
                            height={height - 55}
                            width={width}
                            itemCount={kodyTestów.length}
                            itemSize={55}
                        >
                        {({data, index, style }) => {
                            const kod = data[index];
                            return (
                                <div style={{ ...style }}>
                                    <KodTestu
                                        key={kod._id}
                                        indeks={index}
                                        kod={kod}
                                        uruchomOstrzeżenieDlaKoduTestu={this.uruchomOstrzeżenieDlaKoduTestu}
                                        >
                                    </KodTestu>
                                </div>
                        )}}
                    </FixedSizeList>
                    )}
                </AutoSizer>
                
            </div>
         );
    }
}
 
export default PanelKlientaKody;