import { combineReducers } from 'redux';
import reducerStronaGłówna from './reducerStronaGłówna';
import reducerWersjaJęzkowa from './reducerWersjaJęzkowa';
import reducerPanelKlienta from './reducerPanelKlienta';

const rootReducer = combineReducers({
  reducerStronaGłówna,
  reducerWersjaJęzkowa,
  reducerPanelKlienta
});

export default rootReducer;