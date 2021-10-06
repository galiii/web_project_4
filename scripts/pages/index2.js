//data
import initialCards from "../utils/cards.js";

//components
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

//Card
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", () => {
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
  ".cards__list"
);


//Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

//User Instance
const userInfo = new UserInfo(".profile__name", ".profile__job");

//Inputs edit
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
//add

const titleInput = document.querySelector(".form__input_type_card-title");
const linkInput = document.querySelector(".form__input_type_card-link");

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  (data) => {
    nameInput.value = data.name.textContent;
    jobInput.value = data.job.textContent;
    userInfo.setUserInfo({ name: data.name, job: data.job });
    editProfilePopup.close();
  }
);

const addCardPopup = new PopupWithForm(".popup_type_add-card",
(data) => {
  //reset
  //titleInput.value = "";
  //linkInput.value = "";
  console.log(data["card-title"], data["card-link"]);
  const c = createCard({ name: data["card-title"], link: data["card-link"] });
  console.log("789",c);
  cardsList.prependItem(c.generateCard());
  addCardPopup.close();
});

const imagePopup = new PopupWithImage(".popup_type_image");

//Set popup
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

//FormValidator
const editProfileModel = document.querySelector(".popup_type_edit-profile");
const formEditProfile = editProfileModel.querySelector(".form");


  const addCardModel = document.querySelector(".popup_type_add-card");
const formAddCard = addCardModel.querySelector(".form");

const editProfileFormValidator = new FormValidator(formEditProfile);
const addCardFormValidator = new FormValidator(formAddCard);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Event click
editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  const { name, job } = data;
  nameInput.value = name;
  jobInput.value = job;
  editProfilePopup.open();
  //editProfileFormValidator.resettingFormValidation(".popup_type_edit-profile");
});

addCardButton.addEventListener("click", () => {
  console.log("hello 456");
  addCardPopup.open();
  //editProfileFormValidator.resettingFormValidation(".popup_type_edit-profile");
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


//like .enableValidation() called only once
popupImage.setEventListeners();
editProfileModel.setEventListeners();
//addCardModel.setEventListeners();

//FormValidator Instance
const editProfileFormValidator = new FormValidator(formEditProfile);
editProfileFormValidator.enableValidation();





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



//Close
editModelCloseButton.addEventListener("click", () => {
  //closePopup(editProfileModel);
  console.log("hello world");
  editProfileModel.close();
});







/** Form Submit functions




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
