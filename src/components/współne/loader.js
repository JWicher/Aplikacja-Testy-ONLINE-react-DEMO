import React from 'react';

const Loader = ({opcje, wielkosc="logo40x40"}) => {
    return <div className={`logo__pojemnik ${opcje} ${wielkosc}`} >
                <div className={`logo__logo ${wielkosc}`}></div>
            </div>
}
 
export default Loader;