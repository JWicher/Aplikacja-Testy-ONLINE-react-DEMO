import { createStore } from 'redux';
import rootReducer from './reducers/root';
import użytkownikService from '../services/użytkownikService'

const użytkownik = użytkownikService.getUserFromJWT();

const stanPoczatkowy = {
  reducerStronaGłówna: {
    widoczneMenu: false,
    widocznyPrzycisk: "kod"
  },
  reducerWersjaJęzkowa: {
    wersjaJęzykowa: użytkownik ? użytkownik.język : "en"
  },
  reducerPanelKlienta: {
    edytowanyElement: ""
  }
};

export const store = createStore( rootReducer, stanPoczatkowy );
window.store = store;