import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import użytkownikService from '../../../../services/użytkownikService';


class WykazUzytkownikow extends Component {
    constructor(){
        super()
        this.state = { 
            użytkownicy: []
         }

    }

    async componentDidMount() {
        const użytkownicy = await użytkownikService.pobierzUżytkowników();
        this.setState({użytkownicy})
    }

    usuńUżytkownika = async użytkownikDoUsunięcia => {
        try{
            const użytkownik = await użytkownikService.usuńUżytkownika(użytkownikDoUsunięcia);
            const użytkownicy =  [ ...this.state.użytkownicy ];
            const indeks = użytkownicy.findIndex( u => u._id === użytkownik._id );
            użytkownicy.splice(indeks, 1);
            this.setState({użytkownicy})
        }
        catch(błąd){
            if(błąd && błąd.response)
                NotificationManager.error(błąd.response.data);
        }
        
    }

    render() { 
        const {użytkownicy} = this.state;

        return ( 
            <div>
                { użytkownicy.map( użytkownik => 
                    <div key={użytkownik._id}>
                        <span className="mr-2">{użytkownik.nazwa},</span>
                        <span>{użytkownik.email}</span>
                        <span onClick={ () => this.usuńUżytkownika(użytkownik) } className="badge badge-pill badge-danger ml-2 px-3 p-1 pb-0 m-0">Usuń</span>
                    </div>
                )}
            </div>
         );
    }
}
 
export default WykazUzytkownikow;