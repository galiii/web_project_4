//contain only the code for creating class instances and adding specific event listeners

import initialCards from "../utils/cards.js";
//import { closePopup, openPopup } from "../utils/utils.js";
import {
  settings,
  //Open Buttons
  editProfileButton,
  addCardButton,
  //Form
  formEditProfile,
  formAddCard,
  //Models
  //editProfileModel,
  //addCardModel,
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
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";


/**  User Instance **/
const userInfo = new UserInfo(
  settings.userNameSelector,
  settings.userJobSelector
);

/** Popup Instance  **/
//Image
const popupImage = new PopupWithImage(".popup_type_image");
//Form
const editProfileModel = new PopupWithForm(
  ".popup_type_edit-profile",
  (data) => {
    console.log(data);
    userInfo.setUserInfo(data);
    console.log(userInfo.getUserInfo());
    //profileNameInput.value = data.name;
    //profileJobInput.value = data.job;
    editProfileModel.close();
  }
);
const addCardModel = new PopupWithForm(".popup_type_add-card", (data) => {
  //console.log(data);
});

//like .enableValidation() called only once
popupImage.setEventListeners();
editProfileModel.setEventListeners();
addCardModel.setEventListeners();


//FormValidator Instance
const editProfileFormValidator = new FormValidator(settings, formEditProfile);
const addCardFormValidator = new FormValidator(settings, formAddCard);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();


//resetInputFormKeydown
//addCardFormSubmit
//editProfileFormSubmit
//editProfileButton
//addCardButton
//editModelCloseButton




const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", () => {
    popupImage.open(cardData.link, cardData.name);
  });
  return card;
};



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
cardsList.renderer();





//Open
editProfileButton.addEventListener("click", () => {

  const userData = userInfo.getUserInfo();
  console.log("user data",userData);
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;
  editProfileModel.open();
  //editProfileFormValidator.resettingFormValidation(editProfileModel); //call this function when you close exactly the popups with the form
});



/** Form Submit functions

// Function
const resetInputFormKeydown = (formValidator, model) => {
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  formValidator.resettingFormValidation(model);
};



// Add Card
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

// Events
//Open
editProfileButton.addEventListener("click", () => {

  const userData = userInfo.getUserInfo();
  console.log(userData);
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;
  editProfileModel.open();
  //editProfileFormValidator.resettingFormValidation(editProfileModel); //call this function when you close exactly the popups with the form
});

addCardButton.addEventListener("click", () => {
  addCardModel.open();
  resetInputFormKeydown(addCardFormValidator, addCardModel); //call this function when you close exactly the popups with the form with reset the input add card
});

//Close
editModelCloseButton.addEventListener("click", () => {
  //closePopup(editProfileModel);
});

addCardModelCloseButton.addEventListener("click", () => {
  closePopup(addCardModel);
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
});

// Submit
formEditProfile.addEventListener("submit", editProfileFormSubmit);
formAddCard.addEventListener("submit", addCardFormSubmit);


*/


/**  User Instance **/
const userInfo = new UserInfo(
  settings.userNameSelector,
  settings.userJobSelector
);

/** Popup Instance  **/
//Image
const popupImage = new PopupWithImage(".popup_type_image");
//Form
const editProfileModel = new PopupWithForm(
  ".popup_type_edit-profile",
  (data) => {
    console.log(data);
    userInfo.setUserInfo(data);
    console.log(userInfo.getUserInfo());
    //profileNameInput.value = data.name;
    //profileJobInput.value = data.job;
    editProfileModel.close();
  }
);
const addCardModel = new PopupWithForm(".popup_type_add-card", (data) => {
  //console.log(data);
});

editProfileModel.setEventListeners();

//FormValidator Instance
const editProfileFormValidator = new FormValidator(settings, formEditProfile);

editProfileFormValidator.enableValidation();

//Open
editProfileButton.addEventListener("click", () => {

  const userData = userInfo.getUserInfo();
  console.log("user data",userData);
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;
  editProfileModel.open();
  //editProfileFormValidator.resettingFormValidation(editProfileModel); //call this function when you close exactly the popups with the form
});

