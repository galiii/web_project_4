import Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitHandler) {
    super(popupSelector); //this._popupElement
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(".form");
    //this.setEventListeners = this.setEventListeners.bind(this);
  }

  _getInputValues =() => {
    //
    const inputList = [...this._formElement.querySelectorAll(".form__input")]; //like Array.from
    const inputValues = {};

    //for adding card {card-link: value, card-title: value}, and for edit {name: value, job: value}
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    //console.log("_getInputValues",inputValues);

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
      this._submitHandler(this._getInputValues());

    });

  }

  close() {
    //console.log("PopupWithForm with close 2",this._getInputValues);
    super.close();
    this._formElement.reset();

  }
}

const profileNameInput = "";//document.querySelector(".popup_type_edit-profile");
const profileJobInput = "";

/*const editModel = new PopupWithForm(".popup_type_edit-profile", (data) => {
  profileNameInput.textContext = data.name;
  profileJobInput.textContext = data.job;
});*/
