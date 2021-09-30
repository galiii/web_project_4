
export default class Popup {
  constructor(popupSelector) { //.popup_type_edit-profile
    this._popupElement = document.querySelector(popupSelector);
    //if i dont use arrow function this.handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose = () => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open = () => {
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  };

  close = () => {
    this._popupElement.classList.remove("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  };

  setEventListeners = () => {
    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close);
  };
}
