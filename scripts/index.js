import initialCards from "./cards.js";
import resettingFormValidation from "./validate.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//Open Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
//Card
const list = document.querySelector(".cards__list");

//remove to Card class
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

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
const resetInputFormKeydown = (model) => {
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  resettingFormValidation(model);
};

const closePopupKeydown = (evt) => {
  if (evt.key === "Escape") {
    //evt.keyCode === 229
    const active = document.querySelector(".popup_open");
    closePopup(active);
  }
};

const closePopupClick = (evt) => {
  //Sometimes evt.target and evt.currentTarget are the same thing
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const closePopup = (model) => {
  model.removeEventListener("click", closePopupClick);
  model.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupKeydown);
};

const openPopup = (model) => {
  model.addEventListener("click", closePopupClick);
  model.classList.add("popup_open");
  document.addEventListener("keydown", closePopupKeydown);
};

/** Image Property click Event **/
const createFigurePopup = (imageElement, figureModel, cardData) => {
  imageElement.addEventListener("click", () => {
    const img = figureModel.querySelector(".popup__image");
    const caption = figureModel.querySelector(".popup__caption");
    //Image properties
    img.src = cardData.link;
    img.alt = cardData.name;
    //Figcaption properties
    caption.ariaLabel = cardData.name;
    caption.textContent = cardData.name;
    openPopup(figureModel);
  });

  const figureCloseButton = figureModel.querySelector(".popup__close-button");
  figureCloseButton.addEventListener("click", () => {
    closePopup(figureModel);
  });
};

const generateCard = (cardData) => {
  const listItem = cardTemplate.cloneNode(true); //generate instead
  // Items
  const imageElement = listItem.querySelector(".card__image");
  //const deleteButton = listItem.querySelector(".card__delete");
  const title = listItem.querySelector(".card__title");
  //const like = listItem.querySelector(".card__like");
  const figureModel = document.querySelector(".popup_type_image"); // Popuos Items

  //imagePropertySetup(cardData, imageElement); // Image Property setup
  title.textContent = cardData.name; // Title Property setup
  //deleteCard(deleteButton); //Delete Property click Event
  //createLike(like); //Like Property click Event
  createFigurePopup(imageElement, figureModel, cardData); ///Image Property click

  return listItem;
};

const renderCard = (card) => list.prepend(card.generateCard());

initialCards.forEach((cardItem) => {
  const card = new Card(cardItem, "#card-template");
  renderCard(card);
});

/** Form Submit functions **/

const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({ name: cardTitleInput.value, link: cardLinkInput.value });
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
  resettingFormValidation(editProfileModel); //call this function when you close exactly the popups with the form
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModel);
  resetInputFormKeydown(addCardModel); //call this function when you close exactly the popups with the form with reset the input add card
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
