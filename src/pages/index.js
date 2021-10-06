import "./index.css";

//data
import initialCards from "../utils/cards.js";

//selectors
import {
  cardTemplate, //#card-template
  cardListSelector, //.cards__list
  nameProfileUserSelector, //.profile__name
  jobProfileUserSelector, //.profile__job
  editProfilePopupSelector, //.popup_type_edit-profile
  addCardPopupSelector, //.popup_type_add-card
  imagePopupSelector, //.popup_type_image
  nameProfileEditInput, //.form__input_type_name query selector
  jobProfileEditInput, //.form__input_type_job query selector
  editProfileButton, // .profile__edit-button query selector
  addCardButton, // .profile__add-button query selector
  editProfileModel, //.popup_type_edit-profile query selector
  addCardModel, // .popup_type_add-card query selector
  formEditProfile, //.form query selector
  formAddCard, //.form query selector
} from "../utils/constants.js";

//components
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

//Card Instance
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplate, () => {
    imagePopup.open(cardData.link, cardData.name);
  });
  return card;
};

//Section Instance
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement.generateCard());
    },
  },
  cardListSelector
);

//User Instance
const userInfo = new UserInfo(nameProfileUserSelector, jobProfileUserSelector);

//Popup Instances
const editProfilePopup = new PopupWithForm(editProfilePopupSelector, (data) => {
  nameProfileEditInput.value = data.name.textContent;
  jobProfileEditInput.value = data.job.textContent;
  userInfo.setUserInfo({ name: data.name, job: data.job });
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, (data) => {
  //reset
  //titleInput.value = "";
  //linkInput.value = "";
  const card = createCard({
    name: data["card-title"],
    link: data["card-link"],
  });
  cardsList.prependItem(card.generateCard());
  addCardPopup.close();
});

const imagePopup = new PopupWithImage(imagePopupSelector);

//Set Popup
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

//FormValidator Instances
const editProfileFormValidator = new FormValidator(formEditProfile);
const addCardFormValidator = new FormValidator(formAddCard);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Event click
editProfileButton.addEventListener("click", () => {
  editProfileFormValidator.resettingFormValidation(editProfileModel);
  const data = userInfo.getUserInfo();
  const { name, job } = data;
  nameProfileEditInput.value = name;
  jobProfileEditInput.value = job;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resettingFormValidation(addCardModel);
  addCardPopup.open();
});

//Show list of cards
cardsList.renderer();
