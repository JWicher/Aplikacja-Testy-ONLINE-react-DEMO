import React from "react";
import { Link } from 'react-router-dom';
import { MDBListGroup, MDBContainer, MDBBtn } from "mdbreact";
import użytkownikService from '../../../services/użytkownikService';

const MenuBoczne = ({otwartaZakładka, onZmianaZakładki}) => {
  const użytkownik = użytkownikService.getUserFromJWT();
  return (
    <MDBContainer >
      <MDBListGroup className="my-2" >

        <Link to="/panel-klienta/testy" className="mt-1">
          <MDBBtn block
              color={otwartaZakładka === '/panel-klienta/testy' ? "dark" : 'default'}
              onClick={ () => onZmianaZakładki('/panel-klienta/testy')}
               >Testy</MDBBtn >
        </Link>

        <Link to="/panel-klienta/kody" className="mt-1">
          <MDBBtn block
              color={otwartaZakładka === '/panel-klienta/kody' ? "dark" : 'default'}
              onClick={ () => onZmianaZakładki('/panel-klienta/kody')}
              >Kody dostępu</MDBBtn >
        </Link>

        <Link to="/panel-klienta/uzytkownik" className="mt-1">
          <MDBBtn block
              color={otwartaZakładka === '/panel-klienta/uzytkownik' ? "dark" : 'default'}
              onClick={ () => onZmianaZakładki('/panel-klienta/uzytkownik')}
              >Twoje konto</MDBBtn >
        </Link>

        { użytkownik.czyAdmin &&
        <Link to="/panel-klienta/uzytkownicy" className="mt-1">
          <MDBBtn block
              color={otwartaZakładka === '/panel-klienta/uzytkownicy' ? "dark" : 'default'}
              onClick={ () => onZmianaZakładki('/panel-klienta/uzytkownicy')}
              >Użytkownicy</MDBBtn >
        </Link>
        }

      </MDBListGroup>
      </MDBContainer>
  )
}

export default MenuBoczne;