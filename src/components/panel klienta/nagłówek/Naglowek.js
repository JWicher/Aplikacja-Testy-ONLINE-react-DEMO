import React from "react";
import Loader from '../../współne/loader';
import { zdobądźTekstyWersjiJęzykowej } from '../../../services/wersjaJęzykowaService';

const Naglowek = () => {
  const tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.Naglowek");

  function wyloguj() {
    localStorage.clear();
    window.location = "/";
  }
  return (
    <nav className="test__naglowek navbar navbar-expand-lg navbar-dark blue m-0 d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <Loader opcje="mr-3 " wielkosc="logoRWD" />
        <h2 className="JW_RWD-h2 text-uppercase font-weight-bold m-0">{tekst.tytułAplikacji}</h2>
      </div>
      <h2 className="JW_RWD-h2 text-uppercase font-weight-bold m-0">{tekst.tytułPodstrony}</h2>
      <button className="JW_RWD-button btn btn-default m-0" onClick={wyloguj}>{tekst.przyciskWylogowania}</button>
    </nav>
  )
}

export default Naglowek;