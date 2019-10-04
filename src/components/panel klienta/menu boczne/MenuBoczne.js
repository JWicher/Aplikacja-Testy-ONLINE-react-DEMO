import React, { useState, useEffect, createRef } from "react";
import { Link } from 'react-router-dom';
import { MDBBtn } from "mdbreact";
import użytkownikService from '../../../services/użytkownikService';
import { zdobądźTekstyWersjiJęzykowej } from '../../../services/wersjaJęzykowaService';
import PrzyciskDodajTest from './PrzyciskDodajTest';


const MenuBoczne = React.memo(({ otwartaZakładka, onZmianaZakładki }) => {
  const użytkownik = użytkownikService.getUserFromJWT();
  const tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.MenuBoczne.przycisk");
  const czyWidoczneMenuBoczne = window.innerWidth >= 576 ? true : false;

  const [widoczneMenuBoczne, ustawWidocznośćMenuBocznego] = useState(czyWidoczneMenuBoczne)
  const referencjaDoKomponentu = createRef();

  const słuchaczKliknięciaNaMenu = (event) => {
    const czyOdpowiedniaSzerokość = window.innerWidth < 576 ? true : false;
    const czyKlikniętoMenuBoczne = referencjaDoKomponentu.current && !referencjaDoKomponentu.current.contains(event.target);
    if (czyKlikniętoMenuBoczne && czyOdpowiedniaSzerokość) {
      ustawWidocznośćMenuBocznego(false)
    }

  }

  const sprawdźSzerokośćEkranu = () => {
    const czyWidoczneMenuBoczne = window.innerWidth >= 576 ? true : false;
    ustawWidocznośćMenuBocznego(czyWidoczneMenuBoczne)
  }

  useEffect(() => {
    window.addEventListener("resize", sprawdźSzerokośćEkranu);
    window.addEventListener("mousedown", słuchaczKliknięciaNaMenu);
    return () => {
      window.addEventListener("resize", sprawdźSzerokośćEkranu);
      window.addEventListener("mousedown", słuchaczKliknięciaNaMenu);
    };
  })

  return (
    <div
      className="col col-sm-2 px-2 panel-klienta__menu-boczne d-flex flex-column flex-grow-0"
      ref={referencjaDoKomponentu}
    >
      <div className={widoczneMenuBoczne ? "d-block animated fadeIn faster" : "d-none"}>
        <PrzyciskDodajTest className='JW_RWD-button m-0 my-1' />
        <hr className='w-100 my-1' />
        <Link to="/panel-klienta/testy" >
          <MDBBtn
            block
            className='JW_RWD-button mt-1'
            color={otwartaZakładka === '/panel-klienta/testy' ? "dark" : 'default'}
            onClick={() => onZmianaZakładki('/panel-klienta/testy')}
          >{tekst.testy}
          </MDBBtn >
        </Link>

        <Link to="/panel-klienta/kody" >
          <MDBBtn
            block
            className='JW_RWD-button mt-1'
            color={otwartaZakładka === '/panel-klienta/kody' ? "dark" : 'default'}
            onClick={() => onZmianaZakładki('/panel-klienta/kody')}
          >{tekst.kodyDostępu}
          </MDBBtn >
        </Link>

        <Link to="/panel-klienta/uzytkownik" >
          <MDBBtn
            block
            className='JW_RWD-button mt-1'
            color={otwartaZakładka === '/panel-klienta/uzytkownik' ? "dark" : 'default'}
            onClick={() => onZmianaZakładki('/panel-klienta/uzytkownik')}
          >{tekst.twojeKonto}
          </MDBBtn >
        </Link>

        {użytkownik.czyAdmin &&
          <Link to="/panel-klienta/uzytkownicy">
            <MDBBtn
              block
              className="JW_RWD-button mt-1"
              color={otwartaZakładka === '/panel-klienta/uzytkownicy' ? "dark" : 'default'}
              onClick={() => onZmianaZakładki('/panel-klienta/uzytkownicy')}
            >{tekst.użytkownicy}
            </MDBBtn >
          </Link>
        }
      </div>

      <div className="strona-glowna__naglowek_nawigacja-ikonka d-block d-sm-none pt-0 text-white"
        onClick={() => ustawWidocznośćMenuBocznego(!widoczneMenuBoczne)}
        style={{ cursor: "pointer" }}
      >&#9776;
      </div>

    </div>
  )
}
)

export default MenuBoczne;