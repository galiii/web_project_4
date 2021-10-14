import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  setAction = (action)=> {
    this._submitHandler = action;
  }
}

export default PopupWithSubmit;
