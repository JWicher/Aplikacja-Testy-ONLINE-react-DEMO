import { USTAW_EDYTOWANY_ELEMENT, AKTUALIZUJ_LISTĘ_TESTÓW, ROZWIŃ_TEST, ROZWIŃ_ZAKŁADKĘ } from '../constants/actionTypes';

export const ustawEdytowanyElement = (edytowanyElement) => ({
  type: USTAW_EDYTOWANY_ELEMENT,
  edytowanyElement
});

export const auktualizujListęTestów = (testy) => ({
  type: AKTUALIZUJ_LISTĘ_TESTÓW,
  testy
});

export const rozwińTest = (test) => ({
  type: ROZWIŃ_TEST,
  test
});
export const rozwińZakładkę = (zakładka) => ({
  type: ROZWIŃ_ZAKŁADKĘ,
  zakładka
});

