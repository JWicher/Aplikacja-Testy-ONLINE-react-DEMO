import React from 'react';

const SpisZadan = ({pytania}) => {
    return ( 
            <div className="list-group">
                { pytania.map( pytanie => 
                    <a key={pytanie.numer} className="list-group-item list-group-item-action" href={"#pytanie" + pytanie.numer}>{ "Pytanie " + pytanie.numer }</a>
                    ) }
            </div>
     );
}
 
export default SpisZadan;