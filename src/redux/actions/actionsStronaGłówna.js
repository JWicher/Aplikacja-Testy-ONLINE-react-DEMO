import { WIDOCZNE_MENU, USTAW_WIDOCZNOŚĆ_MENU } from '../constants/actionTypes';


  export const zmieńWidocznośćMenu = () => ({
  type: WIDOCZNE_MENU
});

  export const ustawWidocznoscMenu = (bool) => ({
  type: USTAW_WIDOCZNOŚĆ_MENU,
  czyWidoczneMenu: bool
});

