import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  //take action function and replace Excited function
  setAction = (action)=> {
    this._submitHandler = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();

      //this.close();
    });
  }
}


