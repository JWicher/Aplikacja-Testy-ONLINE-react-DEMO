import React from 'react';

const Flagi = ({zmieńWersjęJęzykową}) => {

    return ( 
        <div className="strona-glowna__wersja-jezykowa_pojemnik align-self-end d-flex justify-content-around align-items-center">
            <div className="strona-glowna__wersja-jezykowa_flaga"
                 style={{backgroundImage: `url("/images/avatary/lang_pl.jpg")`, cursor: "pointer"}}
                 onClick={ () => zmieńWersjęJęzykową("pl")}
            ></div>
            <div className="strona-glowna__wersja-jezykowa_flaga"
                 style={{backgroundImage: `url("/images/avatary/lang_en.jpg")`, cursor: "pointer"}}
                 onClick={ () => zmieńWersjęJęzykową("en")}
            ></div>
        </div>
     );
}
 
export default Flagi;