import React from 'react';
import wspólneService from '../../../../../services/wspólneService';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../../services/wersjaJęzykowaService';

const Email = ({email, onUsuńEmail}) => {
    const tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.testy.poziom3_szczegóły.Email");

    return ( 
        <p className="m-0 animated fadeIn">
            <span className="mr-2">{email}</span>
            <span className="badge badge-pill badge-danger ml-2 px-3 p-1 pb-0 m-0"
                  onClick={ () => onUsuńEmail(email) }
                  onKeyPress={ (target) => wspólneService.enterUruchamiaFunkcję(target, () => onUsuńEmail(email)) }
                  >{tekst.etykietaUsuńEmail}
            </span>
        </p>
     );
}
 
export default Email;