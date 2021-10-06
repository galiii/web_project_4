import {settings} from "../utils/constants.js"


export default class FormValidator {
  constructor(formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  /* Show error => default browser message for input */
  _showError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorMessage = inputElement.validationMessage;
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorClass);
  };

  _hideError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(errorClass);
  };

  _checkValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = (inputList, buttonElement, resetFlag = false) => {
    const { inactiveButtonClass } = this._settings;
    if (this._hasInvalidInput(inputList) || resetFlag) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = "disabled"; //invalid => disable button
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners = () => {
    const { inputSelector, submitButtonSelector } = this._settings;
    const inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    const buttonElement = this._formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    const { formSelector, ...rest } = this._settings; //{}
    //find all forms
    const forms = Array.from(document.querySelectorAll(formSelector));

    //prevent their default behaviour
    //forms.forEach((form) => {
      //form.addEventListener("submit", (evt) => evt.preventDefault());
    //});

   /* forms.forEach((form) => {
      this._setEventListeners(form, this._settings);
    });*/
  };

  resettingFormValidation = (popup) => {
    const model = document.querySelector(popup);
    const { inputSelector, submitButtonSelector } = this._settings;
    const buttonElement = document.querySelector(submitButtonSelector);
    const inputList = Array.from(document.querySelectorAll(inputSelector));

    if (buttonElement) {
      //inactive the button
      this._toggleButtonState(inputList, buttonElement, true);
    }

    inputList.forEach((inputItem) => {
      this._hideError(inputItem);
    });
  };
}
