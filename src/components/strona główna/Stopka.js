import React from 'react';
import { zdobądźTekstyWersjiJęzykowej } from '../../services/wersjaJęzykowaService';

const Stopka = () => {

    const tekst = zdobądźTekstyWersjiJęzykowej("stronaGłówna.Stopka")

    return ( 
        <div className="strona-glowna__stopka text-right d-flex align-items-center justify-content-end pr-3">
            <div>
                <div>
                    <small className="font-italic">{tekst.autor}</small>
                </div>
                <div>
                    <small className="font-italic">{tekst.prawaAutorskie}.</small>

                </div>
            </div>
        </div>
     );
}

export default Stopka
