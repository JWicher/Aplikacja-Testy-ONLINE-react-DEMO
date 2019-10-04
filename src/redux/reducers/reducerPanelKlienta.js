import { USTAW_EDYTOWANY_ELEMENT, AKTUALIZUJ_LISTĘ_TESTÓW, ROZWIŃ_TEST, ROZWIŃ_ZAKŁADKĘ } from '../constants/actionTypes';

const reducerPanelKlienta = (state = {}, action) => {
  switch (action.type) {

    case USTAW_EDYTOWANY_ELEMENT: {
      return ({ ...state, edytowanyElement: action.edytowanyElement });
    }
    case AKTUALIZUJ_LISTĘ_TESTÓW: {
      // console.log('reducer', action.testy)
      return ({ ...state, testy: action.testy });
    }
    case ROZWIŃ_TEST: {
      // console.log('reducer', action.test)
      return ({ ...state, id_otwartegoTestu: action.test });
    }
    case ROZWIŃ_ZAKŁADKĘ: {
      // console.log('reducer', action.test)
      return ({ ...state, otwartaZakładka: action.zakładka });
    }
    // no default

  }

  return state;

};

export default reducerPanelKlienta;