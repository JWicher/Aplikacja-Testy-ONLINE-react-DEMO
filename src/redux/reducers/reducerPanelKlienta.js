import { USTAW_EDYTOWANY_ELEMENT } from '../constants/actionTypes';

const reducerPanelKlienta = ( state = {}, action) => {
  switch (action.type) {
    
    case USTAW_EDYTOWANY_ELEMENT: {
      return ({ ...state, edytowanyElement: action.edytowanyElement });
    }

    // no default
    
  }

  return state;

};

export default reducerPanelKlienta;