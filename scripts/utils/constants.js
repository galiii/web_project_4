export const settings = { // pass all the settings on call
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__input_error",
};

//User Profile
export const userProfileNameSelector = ".profile__name";
export const userProfileJobSelector = ".profile__job";

//Popup Image
export const popupImageSelctor = ".popup_type_image";
//Popup Form
export const popupEditProfileSelctor = ".popup_type_edit-profile";
export const popupAddCardSelctor = ".popup_type_add-card";

//Card Template
export const cardTemplateSelctor = "#card-template";
//Card
export const list = ".cards__list";




//Models
export const editProfileModel = document.querySelector(".popup_type_edit-profile");
export const addCardModel = document.querySelector(".popup_type_add-card");


//Form
export const formEditProfile = editProfileModel.querySelector(settings.formSelector);
export const formAddCard = addCardModel.querySelector(settings.formSelector);



//Open Buttons
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");




//Close buttons
export const editModelCloseButton = editProfileModel.querySelector(
  ".popup__close-button"
);

export const addCardModelCloseButton = addCardModel.querySelector(
  ".popup__close-button"
);





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


