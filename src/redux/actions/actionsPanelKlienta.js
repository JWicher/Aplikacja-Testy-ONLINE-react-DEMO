import { USTAW_EDYTOWANY_ELEMENT } from '../constants/actionTypes';

export const ustawEdytowanyElement = (edytowanyElement) => ({
  type: USTAW_EDYTOWANY_ELEMENT,
  edytowanyElement
});

