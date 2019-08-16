import { ZMIEŃ_WERSJĘ_JĘZYKOWĄ } from '../constants/actionTypes';


export const zmieńWersjęJęzykową = (język) => ({
  type: ZMIEŃ_WERSJĘ_JĘZYKOWĄ,
  wersjaJęzykowa: język
});

