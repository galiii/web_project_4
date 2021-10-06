import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  open(link, text) {
    console.log("hjghghghg");

    const imgElement = this._popupElement.querySelector(".popup__image");
    const captionElement = this._popupElement.querySelector(".popup__caption");

    //Image properties
    imgElement.src = link;
    imgElement.alt = text;

    //Figcaption properties
    captionElement.ariaLabel = text;
    captionElement.textContext = text;
    super.open();
  }
}


//const popupImage = new PopupWithImage('.popup_type_image');
//popupImage.open("https://code.s3.yandex.net/web-code/lake-louise.jpg","world");
