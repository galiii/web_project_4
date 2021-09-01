

const showError = () => {
  console.log('Errors ');
};

const hideError = () => {
  console.log('valid');
};

const checkValidity = (input) => {
  if(!input.validity.valid) {
    //show Error
  }
  else {
    //hide Error
  }
};


// enabling validation by calling enableValidation()
const enableValidation = (settings) => {
  //find all forms
  const forms = Array.form(document.querySelectorAll(".form"));
  console.log("all form", forms);

  //prevent their default behaviour
  forms.forEach((form) => {
    console.log(form);
    form.addEventListener("submit", (evt) => evt.preventDefault());

    const inputs = Array.form(document.querySelectorAll(".form__input"));
  });

  //Subscribe to its change
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      // check validity
      checkValidity(input);
      //toggle Button State
      //toggleButtonState();
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
