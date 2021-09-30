export const settings = { // pass all the settings on call
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__input_error",
};


//Open Buttons
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");

//Card
const list = document.querySelector(".cards__list");

//Modelsf
const editProfileModel = document.querySelector(".popup_type_edit-profile");
const addCardModel = document.querySelector(".popup_type_add-card");

//Close buttons
const editModelCloseButton = editProfileModel.querySelector(
  ".popup__close-button"
);

const addCardModelCloseButton = addCardModel.querySelector(
  ".popup__close-button"
);

//const figureCloseButton = figureModel.querySelector(".popup__close-button");

//Form
export const formEditProfile = editProfileModel.querySelector(settings.formSelector);
export const formAddCard = addCardModel.querySelector(settings.formSelector);


