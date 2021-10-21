import { imageSelector, captionSelector } from "../utils/constants";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(link, text) {
    const imageElement = this._popupElement.querySelector(imageSelector); //.popup__image
    const captionElement = this._popupElement.querySelector(captionSelector); //.popup__caption

    //Image properties
    imageElement.src = link;
    imageElement.alt = text;

    //Figcaption properties
    captionElement.ariaLabel = text;
    captionElement.textContent = text;


    super.open();
  }
}
