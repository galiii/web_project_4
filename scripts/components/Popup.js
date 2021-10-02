export default class Popup {

  constructor(popupSelector) { //.popup_type_edit-profile
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
    //if i dont use arrow function this.handleEscClose = this._handleEscClose.bind(this)
    //this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleCloseButton = () => {
    this.close();
  };

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  open(){
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  };

  close () {
    this._popupElement.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  setEventListeners () {
    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close);

  };
}
