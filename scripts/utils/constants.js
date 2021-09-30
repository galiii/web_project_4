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
export const list = document.querySelector(".cards__list");

//Models
export const editProfileModel = document.querySelector(".popup_type_edit-profile");
export const addCardModel = document.querySelector(".popup_type_add-card");

//Close buttons
export const editModelCloseButton = editProfileModel.querySelector(
  ".popup__close-button"
);

export const addCardModelCloseButton = addCardModel.querySelector(
  ".popup__close-button"
);

//const figureCloseButton = figureModel.querySelector(".popup__close-button");

//Form
export const formEditProfile = editProfileModel.querySelector(settings.formSelector);
export const formAddCard = addCardModel.querySelector(settings.formSelector);

//Input
export const profileNameInput = editProfileModel.querySelector(
  ".form__input_type_name"
);
export const profileJobInput = editProfileModel.querySelector(".form__input_type_job");
export const cardTitleInput = addCardModel.querySelector(
  ".form__input_type_card-title"
);
export const cardLinkInput = addCardModel.querySelector(".form__input_type_card-link");
//User
export const userNameElement = document.querySelector(".profile__name");
export const userJobElement = document.querySelector(".profile__job");


