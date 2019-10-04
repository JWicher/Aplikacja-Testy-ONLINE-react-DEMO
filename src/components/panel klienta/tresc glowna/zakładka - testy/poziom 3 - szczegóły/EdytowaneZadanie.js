import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { confirmAlert } from 'react-confirm-alert';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../../services/wersjaJęzykowaService';
import TextareaAutosize from 'react-autosize-textarea';

class EdytowaneZadanie extends Component {
    constructor() {
        super();
        this.state = {};

        this.tekst = zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.testy.poziom3_szczegóły.EdytowaneZadanie");
    }

    wyrenderujZadanieZamknięte() {
        const { zadanie, onPrzechwyćZmianęTreści, onPrzechwyćZmianęTreściOpcji, onPrzechwyćZmianęPoprawnejOdpowiedzi } = this.props;
        return (
            <React.Fragment>
                <div className="d-flex md-form m-0">
                    <div className="mr-2">{zadanie.numer + "."}</div>

                    <TextareaAutosize
                        name="tresc"
                        value={zadanie.tresc}
                        autoComplete="off"
                        autoFocus
                        onChange={onPrzechwyćZmianęTreści}
                        className="md-textarea form-control py-0 jw-overflow-y JW_RWD-p-bigger"
                        resize="both"
                    />

                </div>
                <div className="md-form mr-2 m-0">

                    {zadanie.opcje_wyboru.map(opcja =>
                        <div key={opcja.id} className="d-flex ml-4 m-0 align-items-center md-form mr-2 m-0 p-0">

                            <span className="mr-2 font-weight-light">{opcja.id}</span>

                            <TextareaAutosize name={opcja.id}
                                autoComplete="off"
                                autoFocus
                                onChange={onPrzechwyćZmianęTreściOpcji}
                                value={opcja.tresc} type="text"
                                className="form-control p-0 m-0 JW_RWD-p-bigger border-0"
                            />
                            <span onClick={() => this.props.onUsuńOpcję(opcja)} className="badge badge-pill badge-danger ml-2 px-3 p-1 pb-0 m-0">{this.tekst.usuńOpdcję}</span>
                        </div>
                    )}

                    {zadanie.opcje_wyboru.length < 10 &&
                        <MDBBtn onClick={() => this.props.onDodajOpcję(zadanie)} className="ml-4 mt-3 JW_RWD-button-sm" color="success" size="sm">{this.tekst.dodajOpcję}</MDBBtn>
                    }

                    {zadanie.opcje_wyboru.length > 0 &&
                        <div className="d-flex align-items-center mt-3">
                            <span className="mr-2">{this.tekst.poprawnaOdpowiedź}</span>
                            <div>
                                <select style={{ cursor: "pointer" }} className="browser-default custom-select rgba_255_0_0_02 border-primary px-3 JW_RWD-p-bigger"
                                    defaultValue={zadanie.poprawna_odpowiedz}
                                    onChange={onPrzechwyćZmianęPoprawnejOdpowiedzi}
                                >
                                    {zadanie.opcje_wyboru.map(opcja =>
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

    wyrenderujZadanieOtwarte() {
        const { zadanie, onPrzechwyćZmianęTreści } = this.props;

        return (
            <div className="d-flex md-form mr-2 m-0">
                <div className="mr-2">{zadanie.numer + "."}</div>
                <TextareaAutosize onChange={onPrzechwyćZmianęTreści}
                    name="tresc"
                    value={zadanie.tresc}
                    className="md-textarea form-control py-0"
                />
            </div>
        )
    }

    uruchomOstrzeżenieDlaZadania = (zadanie) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='react-confirm-alert__body'>
                        <h1>{this.tekst.confirmAlert.tytuł}</h1>
                        <p>{this.tekst.confirmAlert.treśćOstrzeżenia1}</p>
                        <p className="mt-2 m-0">{this.tekst.confirmAlert.treśćOstrzeżenia2}</p>
                        <p className="ml-3 mt-0 font-italic text-danger">{`- ${zadanie.numer}. ${zadanie.tresc.substring(0, 25).padEnd(28, '...')}`}</p>
                        <div className="d-flex">
                            <MDBBtn className="JW_RWD-button-sm" onClick={onClose} color="danger" size="sm">{this.tekst.confirmAlert.nie}</MDBBtn>
                            <MDBBtn className="JW_RWD-button-sm" onClick={() => { this.props.onUsuńZadanie(zadanie); onClose() }} color="success" size="sm">{this.tekst.confirmAlert.tak}</MDBBtn>
                        </div>
                    </div>
                );
            }
        });
    };


    render() {
        const { zadanie, onZapiszZmianęZadania, onOdrzućZmiany, dokonanoZmian } = this.props;

        return (
            <div className="col animated fadeIn faster pb-2 JW_RWD-p-bigger">
                <div className="d-flex flex-column flex-sm-row justify-content-between">
                    <div className="d-flex align-items-center font-weight-bold text-danger">{this.tekst.trybEdycji}</div>
                    <div>
                        <MDBBtn className="JW_RWD-button-sm mx-1 mr-2 mr-lg-4" onClick={() => this.uruchomOstrzeżenieDlaZadania(zadanie)} color="danger" size="sm" outline>{this.tekst.usuńZadanie}</MDBBtn>
                        <MDBBtn className="JW_RWD-button-sm mx-1" onClick={onOdrzućZmiany} color="danger" size="sm">{dokonanoZmian ? this.tekst.zamknij : this.tekst.odrzućZmiany}</MDBBtn>
                        <MDBBtn className="JW_RWD-button-sm mr-1" onClick={onZapiszZmianęZadania} disabled={dokonanoZmian} color="success" size="sm">{this.tekst.zapisz}</MDBBtn>
                    </div>
                </div>
                <hr className="m-0 mb-1" />

                <div className="mt-sm-2">
                    {zadanie.typ === "zamknięte" && this.wyrenderujZadanieZamknięte()}
                    {zadanie.typ === "otwarte" && this.wyrenderujZadanieOtwarte()}
                </div>

            </div>
        );;
    }
}

export default EdytowaneZadanie;