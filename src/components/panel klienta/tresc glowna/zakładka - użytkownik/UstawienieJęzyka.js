import React, { Component } from 'react';
import Joi from 'joi-browser';
import { MDBBtn } from "mdbreact";
import { NotificationManager } from 'react-notifications';
import { zdobądźTekstyWersjiJęzykowej } from '../../../../services/wersjaJęzykowaService';
import { zmieńWersjęJęzykową } from '../../../../redux/actions/actionsWersjaJęzykowa';
import { ustawEdytowanyElement } from '../../../../redux/actions/actionsPanelKlienta';
import { connect } from 'react-redux';
import językService from '../../../../services/wersjaJęzykowaService';

class UstawienieJezyka extends Component {
    constructor(props) {
        super(props);
        this.state = {
            użytkownik: props.użytkownik,
            tekst: zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.użytkownik.UstawienieJęzyka")
        }

        this.schema = Joi.object().keys({
            język: Joi.string().required(),
        }).unknown(true);
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        if (nextProps !== prevProps)
            return {
                tekst: zdobądźTekstyWersjiJęzykowej("panelKlienta.trescGłówna.zakładki.użytkownik.UstawienieJęzyka")
            }
    }

    walidujDane(użytkownik) {
        const { error } = Joi.validate(użytkownik, this.schema);
        return error ? error.details[0].message : null;
    };

    zapiszZmianęDanych = async () => {
        const { użytkownik } = this.state;
        const błąd = this.walidujDane(użytkownik);
        if (błąd) {
            NotificationManager.error(this.tekst.notyfikacja.błądJęzyk);
            return null;
        }

        this.props.onWyślijAktualizacjęUżytkownika(użytkownik);
        this.props.ustawEdytowanyElement("");
        this.props.zmieńWersjęJęzykową(użytkownik.język);
        językService.ustawJęzykWLocalStorage(użytkownik.język)
    }

    odrzućZmiany = () => {
        const użytkownik = { ...this.props.użytkownik };
        this.props.ustawEdytowanyElement("");
        this.setState({ użytkownik });
    }

    onPrzechwyćZmianęJęzyka = ({ currentTarget: input }) => {
        const użytkownik = { ...this.state.użytkownik };
        użytkownik.język = input.value;
        this.setState({ użytkownik })
    }

    render() {
        const { użytkownik, tekst } = this.state;
        const { edytowanyElement } = this.props.stanRedux.reducerPanelKlienta;

        return (
            <div>
                {edytowanyElement === "" &&
                    <div>
                        <p className="mb-0 font-weight-bold">{tekst.tytuł}</p>
                        <div className="d-flex">
                            <p className="ml-2 mr-4">{tekst.pełnaNazwaJęzyka[użytkownik.język]}</p>
                            <i className="fas fa-edit "
                                style={{ cursor: "pointer" }}
                                onClick={() => this.props.ustawEdytowanyElement("ustawienia-język")}>
                            </i>

                        </div>
                    </div>
                }
                {edytowanyElement === "ustawienia-język" &&
                    <div className="md-form border border-danger p-2 animated fadeIn faster">
                        <p className="font-weight-bold text-danger">{tekst.trybEdycji}</p>
                        <p className="mb-0 font-weight-bold">{tekst.tytuł}</p>
                        <select style={{ cursor: "pointer" }} className="browser-default custom-select rgba_255_0_0_02 border-primary px-3"
                            defaultValue={użytkownik.język}
                            onChange={this.onPrzechwyćZmianęJęzyka}
                        >
                            <option value="pl">{tekst.pełnaNazwaJęzyka.pl}</option>
                            <option value="en">{tekst.pełnaNazwaJęzyka.en}</option>
                        </select>
                        <div className="mt-2">
                            <MDBBtn className="" color="danger" size="sm" onClick={this.odrzućZmiany} >{tekst.przycisk.zamknij}</ MDBBtn>
                            <MDBBtn className="" color="success" size="sm" onClick={this.zapiszZmianęDanych} >{tekst.przycisk.zapisz}</ MDBBtn>
                        </div>
                    </div>
                }
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return { stanRedux: state };
};

const mapDispatchToProps = (dispatch) => {
    return {
        zmieńWersjęJęzykową: język => dispatch(zmieńWersjęJęzykową(język)),
        ustawEdytowanyElement: edytowanyElement => dispatch(ustawEdytowanyElement(edytowanyElement)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UstawienieJezyka)
