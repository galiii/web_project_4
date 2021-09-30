//contain only the code for creating class instances and adding specific event listeners

import initialCards from "../utils/cards.js";
import { closePopup, openPopup } from "../utils/utils.js";
import {
  settings,
  //Open Buttons
  editProfileButton,
  addCardButton,
  //Form
  formEditProfile,
  formAddCard,
  //Models
  editProfileModel,
  addCardModel,
  //Card
  list,
  //Close buttons
  editModelCloseButton,
  addCardModelCloseButton,
  //Input
  profileNameInput,
  profileJobInput,
  cardTitleInput,
  cardLinkInput,
  //User
  userNameElement,
  userJobElement,
} from "../utils/constants.js";

//components
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

//FORM
const editProfileFormValidator = new FormValidator(settings, formEditProfile);
const addCardFormValidator = new FormValidator(settings, formAddCard);

//USER
const userInfo = new UserInfo(
  settings.userNameSelector,
  settings.userJobSelector
);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/***** Function ****/
const resetInputFormKeydown = (formValidator, model) => {
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  formValidator.resettingFormValidation(model);
};

const figureModel = new PopupWithImage(".popup_type_image"); // Popuos Items

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement.generateCard());
    },
  },
  ".cards__list"
);

let counter = 0;
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", () => {
  //return new Card(cardData, "#card-template", () => {
    console.log("ghghgh",++counter);
    figureModel.open(cardData);
  });
  return card;
};

/** Form Submit functions **/

const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardElement = createCard({ name: cardTitleInput.value, link: cardLinkInput.value });
  cardsList.prependItem(cardElement.generateCard());

  closePopup(addCardModel);
  //reset the values (clean)
  formAddCard.reset();
};

const editProfileFormSubmit = (evt) => {
  evt.preventDefault();
  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  //closePopup(editProfileModel);
};

/** Events **/
/** Open  **/
editProfileButton.addEventListener("click", () => {
  openPopup(editProfileModel);
  const userData = userInfo.getUserInfo();

  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;

  //editProfileFormValidator.resettingFormValidation(editProfileModel); //call this function when you close exactly the popups with the form
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModel);
  //resetInputFormKeydown(addCardFormValidator, addCardModel); //call this function when you close exactly the popups with the form with reset the input add card
});

/** Close  **/
editModelCloseButton.addEventListener("click", () => {
  //closePopup(editProfileModel);
});

addCardModelCloseButton.addEventListener("click", () => {
  closePopup(addCardModel);
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
});

//figureCloseButton.addEventListener("click", () => closePopup(figureModel));

/** Submit **/
formEditProfile.addEventListener("submit", editProfileFormSubmit);
formAddCard.addEventListener("submit", addCardFormSubmit);

cardsList.renderer();
