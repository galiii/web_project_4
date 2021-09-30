import Popup from './Popup.js';


export default class PopupWithImage extends Popup {

  open(link, text) {
    super.open();
    const imgElement = this._popupElement.querySelector(".popup__image");
    const captionElement = this._popupElement.querySelector(".popup__caption");

    imgElement.src = link;
    captionElement.textContext = text;
    console.log("hjhjhjhjhj");

  };
}
