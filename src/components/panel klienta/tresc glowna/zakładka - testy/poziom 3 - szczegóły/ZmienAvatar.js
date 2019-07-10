import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { zwróćListęAvatarów } from '../../../../../pliki do załadowania/avataryTestów';

class ZmienAvatar extends Component {

    constructor(props){
        super()
        this.state = {
            avatar: props.aktualnieWybranyAvatar
        }
    }


    componentDidMount() {
        this.setState({avatar: this.props.aktualnieWybranyAvatar})
    }

    zmieńZaznaczonyAvatar = avatar => {
        this.setState({avatar})
    }

    render() {

            const listaAvatarów = zwróćListęAvatarów();

            return ( 
                <div className="panel-klienta__tresc_test-modyfikuj-avatar d-flex flex-column align-items-center border border-primary p-2 animated fadeIn faster white">
                    <p className="font-weight-bold text-center text-uppercase">Wybierz obraz reprezentujący test</p>
                    <div className="d-flex justify-content-center flex-wrap">
        
                        { listaAvatarów.map( avatar => 
                            <div key={avatar}
                                 className={`panel-klienta__tresc_test-modyfikuj-avatar-avatar ${this.state.avatar === avatar ? "ble border-default animated tada slow infinite" : ""}`}
                                 style={{backgroundImage: `url("/images/avatary/${avatar}")`, cursor: "pointer"}}
                                 onClick={ () => this.zmieńZaznaczonyAvatar(avatar) }
                                 >
                            </div>    
                        )}
        
                    </div>
        
                    <hr /> 
        
                    <div>
                        <MDBBtn color="primary" outline size="sm" onClick={ () =>{ this.props.onZmieńAvatar(this.state.avatar); this.props.onClose() } }>Zamknij</MDBBtn>
                    </div>
        
                </div>
             );
    }
}
 
export default ZmienAvatar;