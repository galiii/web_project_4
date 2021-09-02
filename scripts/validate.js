let counter = 0;
/* Show error => default browser message for input */
const showError = (input) => {
  const errorMessage = input.validationMessage;
  errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add("form__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideError = (input) => {
  errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
  input.classList.remove("form__input_error");
};

/* Check is inputs is valid */
const checkValidity = (input) => {
  if (!input.validity.valid) {
    showError(input);
  } else {
    hideError(input);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    console.dir(inputElement);
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputs, buttonElement) => {
  //console.dir(button);
  console.log(hasInvalidInput(inputs));
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add("form__button_inactive");
    //button.disabled = true; //invalid => disable button
    console.log("if");
  } else {
    console.log("else");
    buttonElement.classList.remove("form__button_inactive");
    //button.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (settings) => {
  //find all forms
  const forms = Array.from(document.querySelectorAll(".form"));

  //prevent their default behaviour
  forms.forEach((form) => {
    console.log(form);
    form.addEventListener("submit", (evt) => evt.preventDefault());
  });

  forms.forEach((form) => {
    setEventListeners(form);
  });
};

// pass all the settings on call
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(settings); // enabling validation by calling enableValidation()
