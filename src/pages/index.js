import "./index.css"
//import profileImg

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

//Card
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplate, () => {
    imagePopup.open(cardData.link, cardData.name);
  });
  return card;
};

//Section
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

//add
const titleInput = document.querySelector(".form__input_type_card-title");
const linkInput = document.querySelector(".form__input_type_card-link");

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
  console.log(data["card-title"], data["card-link"]);
  const c = createCard({ name: data["card-title"], link: data["card-link"] });
  cardsList.prependItem(c.generateCard());
  addCardPopup.close();
});

const imagePopup = new PopupWithImage(imagePopupSelector);

//Set popup
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

//FormValidator
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

cardsList.renderer();

/*
import {
  //Form
  formEditProfile,
  formAddCard,
  //Open Buttons
  editProfileButton,
  addCardButton,
  //Close buttons
  editModelCloseButton,
  addCardModelCloseButton,

  cardTitleInput,
  cardLinkInput
} from "../utils/constants.js";

export const profileNameInput = document.querySelector(
  ".form__input_type_name"
);
export const profileJobInput = document.querySelector(".form__input_type_job");

//components
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

//User Instance
const userInfo = new UserInfo(".profile__name", ".profile__job");

//Popup Instance

//const popupImage = new PopupWithImage(".popup_type_image");
const editProfileModel = new PopupWithForm(".popup_type_edit-profile", (data) => {
  console.log("editProfileModel data 1",data);

  //console.log(userInfo.getUserInfo());
  profileNameInput.value = data.name;
  profileJobInput.value = data.job;
  console.log("editProfileModel data 2",profileNameInput.value, profileJobInput.value);
  userInfo.setUserInfo(data);
  console.log("editProfileModel data 3",userInfo.getUserInfo() )
  editProfileModel.close();
});

//const addCardModel = new PopupWithForm(".popup_type_add-card", (data) => {
//  addCardModel.close();
//});

//like .enableValidation() called only once
popupImage.setEventListeners();
editProfileModel.setEventListeners();
//addCardModel.setEventListeners();

//FormValidator Instance
const editProfileFormValidator = new FormValidator(formEditProfile);
//const addCardFormValidator = new FormValidator(formAddCard);
editProfileFormValidator.enableValidation();
//addCardFormValidator.enableValidation();



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

//EDIT
editProfileButton.addEventListener("click", (evt) => {
  const userData = userInfo.getUserInfo();
  console.log("user data 1", userData);
  //the update
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;
  editProfileModel.open();
  console.log("user data 2", userData);
  console.log("user data 3", evt.target.value);
  //editProfileFormValidator.resettingFormValidation(editProfileModel); //call this function when you close exactly the popups with the form
});

/*ADD
addCardButton.addEventListener("click", () => {
  addCardModel.open();
  const cardElement = createCard({ name: cardTitleInput.value, link: cardLinkInput.value });
  //resetInputFormKeydown(addCardFormValidator, addCardModel); //call this function when you close exactly the popups with the form with reset the input add card
});



//Close
editModelCloseButton.addEventListener("click", () => {
  //closePopup(editProfileModel);
  console.log("hello world");
  editProfileModel.close();
});


addCardModelCloseButton.addEventListener("click", () => {
  //closePopup(addCardModel);
  addCardModel.close();
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
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

// Submit
formEditProfile.addEventListener("submit", editProfileFormSubmit);
formAddCard.addEventListener("submit", addCardFormSubmit);
*/
