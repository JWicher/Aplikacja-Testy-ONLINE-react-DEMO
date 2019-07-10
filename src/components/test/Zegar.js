import React from 'react';

const Zegar = ({czas}) => {
    const minuty = czas.minuty < 10 ? "0" + czas.minuty : czas.minuty
    const sekundy = czas.sekundy < 10 ? "0" + czas.sekundy : czas.sekundy
    return ( 
        <div className="test__naglowek_zegar d-flex flex-column badge badge-danger p-2">
            <span>Pozostały czas</span>
            <span className="">
                {minuty}:{sekundy}
            </span>
        </div>
     );
}
 
export default Zegar;