import initialCards from "./cards.js";
import { closePopup, openPopup } from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//Open Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
//Card
const list = document.querySelector(".cards__list");

//Models
const editProfileModel = document.querySelector(".popup_type_edit-profile");
const addCardModel = document.querySelector(".popup_type_add-card");
//Close buttons
const editModelCloseButton = editProfileModel.querySelector(
  ".popup__close-button"
);
const addCardModelCloseButton = addCardModel.querySelector(
  ".popup__close-button"
);
//Form
// pass all the settings on call
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__input_error",
};

const editProfileForm = editProfileModel.querySelector(".form");
const addCardForm = addCardModel.querySelector(".form");

const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Input
const profileNameInput = editProfileModel.querySelector(
  ".form__input_type_name"
);
const profileJobInput = editProfileModel.querySelector(".form__input_type_job");
const cardTitleInput = addCardModel.querySelector(
  ".form__input_type_card-title"
);
const cardLinkInput = addCardModel.querySelector(".form__input_type_card-link");
//User
const userNameElement = document.querySelector(".profile__name");
const userJobElement = document.querySelector(".profile__job");

/***** Function ****/
const resetInputFormKeydown = (formValidator, model) => {
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  formValidator.resettingFormValidation(model);
};

const renderCard = (card) => list.prepend(card.generateCard());

initialCards.forEach((cardItem) => {
  const card = new Card(cardItem, "#card-template");
  renderCard(card);
});

/** Form Submit functions **/

const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard(
    new Card(
      { name: cardTitleInput.value, link: cardLinkInput.value },
      "#card-template"
    )
  );
  closePopup(addCardModel);
  //reset the values (clean)
  addCardForm.reset();
};

const editProfileFormSubmit = (evt) => {
  evt.preventDefault();
  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  closePopup(editProfileModel);
};

/** Events **/
/** Open  **/
editProfileButton.addEventListener("click", () => {
  openPopup(editProfileModel);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
  editProfileFormValidator.resettingFormValidation(editProfileModel); //call this function when you close exactly the popups with the form
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModel);
  resetInputFormKeydown(addCardFormValidator, addCardModel); //call this function when you close exactly the popups with the form with reset the input add card
});

/** Close  **/
editModelCloseButton.addEventListener("click", () => {
  closePopup(editProfileModel);
});

addCardModelCloseButton.addEventListener("click", () => {
  closePopup(addCardModel);
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
});

/** Submit **/
editProfileForm.addEventListener("submit", editProfileFormSubmit);
addCardForm.addEventListener("submit", addCardFormSubmit);
