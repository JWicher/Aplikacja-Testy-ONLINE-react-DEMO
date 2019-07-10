import React from "react";
import Loader from '../../współne/loader';

const Naglowek = () => {
  function wyloguj(){
    localStorage.clear();
    window.location = "/";
  }
  return (
    <nav className="test__naglowek navbar navbar-expand-lg navbar-dark blue m-0 d-flex justify-content-between">
        <div className="d-flex">
            <Loader opcje="mr-3"/>
            <h2 className="text-uppercase font-weight-bold m-0">TESTY ONLINE</h2>
        </div>
            <h2 className="text-uppercase font-weight-bold m-0">PANEL KLIENTA</h2>
        <button className="btn btn-default" onClick={wyloguj}>Wyloguj się</button>
    </nav>
  )
}

export default Naglowek;