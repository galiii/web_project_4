import Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelctor, submitHandler) {
    super(popupSelctor); //this._popupElement
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(".form");
  }

  _getInputValues() {
    //
    const inputList = [...this._formElement.querySelectorAll(".form__input")]; //like Array.from
    const inputValues = {};

    //for adding card {card-link: value, card-title: value}, and for edit {name: value, job: value}
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    console.log("123123",this._popupElement);

    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("456",evt.target.value);
      this._submitHandler(this._getInputValues());
      //this._popupElement.close();
    });

  }

  close() {
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
