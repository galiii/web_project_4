export default class Popup {

  constructor(popupSelector) { //.popup_type_edit-profile
    this._popupElement = document.querySelector(popupSelector);
    //console.log(this._popupElement);
    //if i dont use arrow function this.handleEscClose = this._handleEscClose.bind(this)
    //this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }


  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      //evt.keyCode === 229
      this.close();
    }
  }

  _handleClickClose = (evt) => {
    //Sometimes evt.target and evt.currentTarget are the same thing
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  _handleButtonClose = () => {
      this.close();
      console.log("hello");
  };

  open(){
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
    //this.setEventListeners();
  };

  close () {
    this._popupElement.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  setEventListeners() {
    //for close button icon
    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", this._handleClickClose);
    //for general click
    //this._popupElement.addEventListener("click", this._handleClickClose);
    //for keydown esc
      document.addEventListener("keydown", this._handleEscClose);
  }
}
