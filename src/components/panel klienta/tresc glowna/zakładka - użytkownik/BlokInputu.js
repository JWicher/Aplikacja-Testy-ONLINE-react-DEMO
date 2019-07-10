import React from 'react';

const BlokInputu = ({etykieta, ...rest}) => {
    return ( 
        <React.Fragment>
            <p className="mb-0 font-weight-bold">{etykieta}</p>
            <input name="nazwa"
                {...rest}
                autoComplete="off"
                className="form-control p-0 ml-2 m-0"
            />
        </React.Fragment>
     );
}
 
export default BlokInputu;