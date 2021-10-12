export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      //evt.keyCode === 229
      this.close();
    }
  };

  _handleClickClose = (evt) => {
    console.log("123");
    //Sometimes evt.target and evt.currentTarget are the same thing
    if (evt.target === evt.currentTarget) {
      console.log("456");
      this.close();
    }
  };

  _handleButtonClose = () => {
    console.log("icon");
    this.close();
  };

  open() {
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
    //this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
    //this._popupElement.removeEventListener("click", this._handleClickClose);
  }

  setEventListeners() {
    //for close button icon
    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", this._handleButtonClose);
    //for general click
    this._popupElement.addEventListener("click", this._handleClickClose);
    //for keydown esc
    //document.addEventListener("keydown", this._handleEscClose);
  }
}
