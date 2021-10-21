import { settings } from "../utils/constants.js";

export default class FormValidator {
  constructor(formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  /* Show error => default browser message for input */
  _showError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorMessage = inputElement.validationMessage;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorClass);
  };

  _hideError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
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

  _hasInvalidInput = () =>
    this._inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = (resetFlag = false) => {
    const { inactiveButtonClass } = this._settings;
    if (this._hasInvalidInput() || resetFlag) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = "disabled"; //invalid => disable button
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    //prevent their default behaviour
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  };

  resettingFormValidation = () => {
    if (this._buttonElement) {
      //inactive the button
      this._toggleButtonState(true);
    }

    this._inputList.forEach((inputItem) => {
      this._hideError(inputItem);
    });
  };
}
