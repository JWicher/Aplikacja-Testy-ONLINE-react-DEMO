import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from "mdbreact";
import użytkownikService from '../../services/użytkownikService';
import { NotificationManager } from 'react-notifications';

class InformacjaPotwierdzenieKonta extends Component {
    constructor(){
        super()
        this.state = { 
            potwierdzonyProfil: false
         }

    }

    async componentDidMount() {
        try{
            const _id = this.props.match.params.id;
            await użytkownikService.zaktualizujDaneUżytkownika( {_id, potwierdzonyProfil: true} );

            NotificationManager.success("Zarejestrowano pomyślnie")
            this.setState({potwierdzonyProfil: true})
        }
        catch(błąd){
            if(błąd && błąd.response)
            NotificationManager.error(błąd.response.data)
        }
    }

    render() { 
        const { potwierdzonyProfil } = this.state;
        const wiadomośćPotwierdzenie = <p>Konto zostało aktywowane. Możesz się teraz zalogować.</p>;
        const wiadomośćNegacja = <p className='text-danger'>Konto nie zostało aktywowane. Wystąpił błąd.</p>;

        return ( 
            <div className="strona-glowna__rejestracja-uzytkownika animated fadeIn faster" >
                 <div className="strona-glowna__rejestracja-uzytkownika_informacja p-5 animated fadeIn faster text-primary font-weight-bold">
                        
                        { potwierdzonyProfil ? wiadomośćPotwierdzenie : wiadomośćNegacja }
                     
                         <Link to="/rejestracja">
                             <div className="d-flex justify-content-center mt-2">
                                 <MDBBtn color="default" onClick={ () => this.props.zamieńPrzycisk("kod")} >OK</MDBBtn>
                             </div>
                         </Link>
    
                 </div>
         </div>
         );
    }
}
 
export default InformacjaPotwierdzenieKonta;