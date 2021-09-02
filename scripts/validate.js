const showError = (input) => {
  const errorMessage = input.validationMessage;
  errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add("form__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideError = (input) => {
  console.log("valid");
  errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
  input.classList.remove("form__input_error");
};

const checkValidity = (input) => {
  if (!input.validity.valid) {
    console.log("show Error");
    showError(input);
  } else {
    hideError(input);
  }
};

// enabling validation by calling enableValidation()
const enableValidation = (settings) => {
  //find all forms
  const forms = Array.from(document.querySelectorAll(".form"));
  console.log("all form", forms);

  //prevent their default behaviour
  forms.forEach((form) => {
    console.log(form);
    form.addEventListener("submit", (evt) => evt.preventDefault());

    const inputs = Array.from(document.querySelectorAll(".form__input"));
    //Subscribe to its change
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        // check validity
        checkValidity(input);
        //toggle Button State
        //toggleButtonState();
      });
    });
  });

  //check is inputs is valid
  //if it is valid
  // if no => show error === default browser message for input
};

// pass all the settings on call
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(settings);
