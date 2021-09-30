import {Popup}  from "./Popup.js";

class PopupWithForm extends Popup {

  constructor(popupSelctor, submitHandler) {
    super(popupSelctor); //this._popupElement
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector(".form");
  }


  _getInputValues = () => {
    const inputs = [...this._form.querySelector(".form__input")];
    const inputValues = {};

    inputs.forEach((input) => {
      inputValues[input.name] = input.value; //new property
    });
    return inputValues;
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", () => this._submitHandler(this._getInputValues()));
  };

  close = () => {
    super.close();
    this._form.reset();
  };
}

const profileNameInput = "";//document.querySelector(".popup_type_edit-profile");
const profileJobInput = "";

const editModel = new PopupWithForm(".popup_type_edit-profile", (data) => {
  profileNameInput.textContext = data.name;
  profileJobInput.textContext = data.job;
});
