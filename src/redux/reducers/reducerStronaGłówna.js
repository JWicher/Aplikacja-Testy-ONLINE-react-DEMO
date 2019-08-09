import { WIDOCZNE_MENU, USTAW_WIDOCZNOŚĆ_MENU } from '../constants/actionTypes';

const reducerStronaGłówna = ( state = {}, action) => {
  switch (action.type) {
    
    case WIDOCZNE_MENU: {
      return ({ widoczneMenu: !state.widoczneMenu });
    }
    case USTAW_WIDOCZNOŚĆ_MENU: {
      return ({ widoczneMenu: action.czyWidoczneMenu });
    }

  }

  return state;

};

export default reducerStronaGłówna;