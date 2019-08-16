import { WIDOCZNE_MENU, USTAW_WIDOCZNOŚĆ_MENU, USTAW_WIDOCZNY_PRZYCISK } from '../constants/actionTypes';

const reducerStronaGłówna = ( state = {}, action) => {
  switch (action.type) {
    
    case WIDOCZNE_MENU: {
      return (  { ...state, widoczneMenu: !state.widoczneMenu });
    }

    case USTAW_WIDOCZNOŚĆ_MENU: {
      return ({ ...state, widoczneMenu: action.czyWidoczneMenu });
    }

    case USTAW_WIDOCZNY_PRZYCISK: {
      let widoczneMenu = state.widoczneMenu;
         if (window.innerWidth <= 991){
            widoczneMenu = !state.widoczneMenu
          }

      return ({ ...state, widocznyPrzycisk: action.widocznyPrzycisk, widoczneMenu });
    }

    // no default
    
  }

  return state;

};

export default reducerStronaGłówna;