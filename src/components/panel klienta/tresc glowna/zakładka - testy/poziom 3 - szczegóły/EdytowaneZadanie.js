import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { confirmAlert } from 'react-confirm-alert';

class EdytowaneZadanie extends Component {
    state = {  }

    wyrenderujZadanieZamknięte(){
        const { zadanie, onPrzechwyćZmianęTreści, onPrzechwyćZmianęTreściOpcji, onPrzechwyćZmianęPoprawnejOdpowiedzi } = this.props;
            return (
                <React.Fragment>
                    <div className="d-flex md-form m-0 ">
                        <div className="mr-2">{zadanie.numer + "."}</div>
                        <input onChange={onPrzechwyćZmianęTreści} name="tresc" value={zadanie.tresc} type="text" className="form-control p-0 m-0" />
                    </div>
                    <div className="md-form mr-2 m-0">

                        { zadanie.opcje_wyboru.map( opcja =>
                            <div key={opcja.id} className="d-flex ml-4 m-0 align-items-center md-form mr-2 m-0 p-0">

                                <span className="mr-2 font-weight-light">{opcja.id}</span>
                                <input name={opcja.id}
                                        onChange={onPrzechwyćZmianęTreściOpcji}
                                        value={opcja.tresc} type="text"
                                        className="form-control p-0 m-0" />
                                <span onClick={ () => this.props.onUsuńOpcję(opcja) } className="badge badge-pill badge-danger ml-2 px-3 p-1 pb-0 m-0">Usuń</span>
                            </div>
                        )}

                        {zadanie.opcje_wyboru.length < 10 &&
                            <MDBBtn onClick={ () => this.props.onDodajOpcję(zadanie) } className="ml-4 mt-3" color="success" size="sm">Dodaj opcję</MDBBtn>
                        }
                                    
                        {zadanie.opcje_wyboru.length > 0 &&
                                <div className="d-flex align-items-center mt-3">
                                    <span className="mr-2">Poprawna odpowiedź:</span>
                                    <div>
                                        <select style={{cursor: "pointer"}} className="browser-default custom-select rgba_255_0_0_02 border-primary px-3"
                                                defaultValue={ zadanie.poprawna_odpowiedz }
                                                onChange={ onPrzechwyćZmianęPoprawnejOdpowiedzi }
                                        >
                                            { zadanie.opcje_wyboru.map( opcja => 
                                                <option key={opcja.id} value={opcja.id} >{opcja.id}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                        }

                    </div>
                </React.Fragment>
            )
        }
    
    wyrenderujZadanieOtwarte(){
        const { zadanie, onPrzechwyćZmianęTreści } = this.props;

        return (
                <div className="d-flex md-form mr-2 m-0">
                    <div className="mr-2">{zadanie.numer + "."}</div>
                    <textarea onChange={onPrzechwyćZmianęTreści} name="tresc" value={zadanie.tresc} className="md-textarea form-control pt-0" rows="7"></textarea>
                </div>
        )
    }

    uruchomOstrzeżenieDlaZadania = (zadanie) => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='react-confirm-alert__body'>
                <h1>Ostrzeżenie</h1>
                <p>Operacji nie będzie można cofnąć.</p>
                <p className="mt-2 m-0">Czy napewno chcesz usunąć to zadanie?</p>
                <p className="ml-3 mt-0 font-italic text-danger">{`- ${zadanie.numer}. ${zadanie.tresc.substring(0,25).padEnd(28, '...') }`}</p>
                <div className="d-flex">
                    <MDBBtn onClick={onClose} color="danger" size="sm">Odrzucam</MDBBtn>
                    <MDBBtn onClick={() => {this.props.onUsuńZadanie(zadanie); onClose() }} color="success" size="sm">Potwierdzam</MDBBtn>
                </div>
              </div>
            );
          }
        });
    };
        

    render() { 
        const {zadanie, onZapiszZmianęZadania, onOdrzućZmiany, dokonanoZmian} = this.props;

        return ( 
            <div className="col animated fadeIn faster pb-2">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center font-weight-bold text-danger">Tryb edycji</div>
                    <div>
                        <MDBBtn onClick={ () => this.uruchomOstrzeżenieDlaZadania(zadanie) } color="danger" size="sm" outline className="mr-4">Usuń zadanie</MDBBtn>
                        <MDBBtn onClick={onOdrzućZmiany} color="danger" size="sm">{ dokonanoZmian ? "Zamknij" : "Odrzuć zmiany" }</MDBBtn>
                        <MDBBtn onClick={onZapiszZmianęZadania} disabled={dokonanoZmian} color="success" size="sm">Zapisz</MDBBtn>
                    </div>
                </div>
                <hr className="mt-0" />

                <div className="mt-2">
                    { zadanie.typ === "zamknięte" && this.wyrenderujZadanieZamknięte() }
                    { zadanie.typ === "otwarte" && this.wyrenderujZadanieOtwarte() }
                </div>
     
            </div>
     );;
    }
}
 
export default EdytowaneZadanie;