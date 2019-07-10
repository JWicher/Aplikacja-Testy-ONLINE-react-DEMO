import React from 'react';

const RadioCheckbox = ({etykieta, _id, zaznaczenie, onZmiana }) => {
    return ( 
        <div className="custom-control custom-radio" >
            <input type="radio" className="custom-control-input" id={_id}
                    checked={ zaznaczenie }
                    onChange={ onZmiana }/>
            <label className="custom-control-label" htmlFor={_id}>{etykieta}</label>
        </div>
     );
}
 
export default RadioCheckbox;