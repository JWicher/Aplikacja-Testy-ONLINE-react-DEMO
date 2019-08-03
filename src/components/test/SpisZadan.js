import React from 'react';
import { zdobądźTekstyWersjiJęzykowej } from '../../services/wersjaJęzykowaService';

const SpisZadan = ({pytania}) => {

    const tekst = zdobądźTekstyWersjiJęzykowej("test.SpisZadan");

    return ( 
            <div className="list-group">
                { pytania.map( pytanie => 
                    <a key={pytanie.numer} className="list-group-item list-group-item-action" href={"#pytanie" + pytanie.numer}>{ tekst.etykietaPytanie + " " + pytanie.numer }</a>
                    ) }
            </div>
     );
}
 
export default SpisZadan;