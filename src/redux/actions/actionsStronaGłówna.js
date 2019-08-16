import { WIDOCZNE_MENU, USTAW_WIDOCZNOŚĆ_MENU, USTAW_WIDOCZNY_PRZYCISK } from '../constants/actionTypes';


export const zmieńWidocznośćMenu = () => ({
  type: WIDOCZNE_MENU
});

export const ustawWidocznoscMenu = (bool) => ({
  type: USTAW_WIDOCZNOŚĆ_MENU,
  czyWidoczneMenu: bool
});

export const zamieńPrzycisk = (przycisk) => ({
  type: USTAW_WIDOCZNY_PRZYCISK,
  widocznyPrzycisk: przycisk
});

