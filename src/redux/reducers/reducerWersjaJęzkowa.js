import { ZMIEŃ_WERSJĘ_JĘZYKOWĄ } from '../constants/actionTypes';

const reducerWersjaJęzkowa = ( state = {}, action) => {
  switch (action.type) {
    
  
    case ZMIEŃ_WERSJĘ_JĘZYKOWĄ: {
      return ({ wersjaJęzykowa: action.wersjaJęzykowa });
    }

    // no default
    
  }

  return state;

};

export default reducerWersjaJęzkowa;