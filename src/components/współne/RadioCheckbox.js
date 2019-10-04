import React from 'react';

const RadioCheckbox = ({etykieta, _id, zaznaczenie, onZmiana }) => {
    return ( 
        <div className="custom-control custom-radio d-flex" >
            <input type="radio" className="custom-control-input" id={_id}
                    checked={ zaznaczenie }
                    onChange={ onZmiana }/>
            <label className="custom-control-label align-self-center" htmlFor={_id}>{etykieta}</label>
        </div>
     );
}
 
export default RadioCheckbox;