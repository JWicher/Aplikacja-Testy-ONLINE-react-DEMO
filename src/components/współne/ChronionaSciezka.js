import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import użytkownikService from '../../services/użytkownikService';

const ChronionaSciezka = ({ path, warunek, komponent: Component, render, ...reszta }) => {
    let szukanyObiekt = "";
    if (warunek === "kod") szukanyObiekt = localStorage.getItem("obiektKoduDostępu");
    if (warunek === "użytkownik") szukanyObiekt = użytkownikService.getUserFromJWT();

    if(!szukanyObiekt) return <Redirect to="/" />

    return ( 
        <Route path={path} {...reszta}
               render={ props => { 
                    return Component ? <Component {...props} /> : render(props);
                }}
        />
    )
};
 
export default ChronionaSciezka;