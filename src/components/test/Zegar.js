import React from 'react';
import { zdobądźTekstyWersjiJęzykowej } from '../../services/wersjaJęzykowaService';

const Zegar = ({czas}) => {
    const minuty = czas.minuty < 10 ? "0" + czas.minuty : czas.minuty
    const sekundy = czas.sekundy < 10 ? "0" + czas.sekundy : czas.sekundy
    const tekst = zdobądźTekstyWersjiJęzykowej("test.Zegar");

    return ( 
        <div className="test__naglowek_zegar d-flex flex-column badge badge-danger p-2">
            <span>{tekst.etykietaZegara}</span>
            <span className="">
                {minuty}:{sekundy}
            </span>
        </div>
     );
}
 
export default Zegar;