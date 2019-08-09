import { createStore } from 'redux';
import rootReducer from './reducers/root';

const stanPoczatkowy = {
  reducerStronaGłówna: {
    widoczneMenu: false
  }
};

export const store = createStore( rootReducer, stanPoczatkowy );
window.store = store;