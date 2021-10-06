import initialCards from "../utils/cards.js";

//components
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

const editProfileButton = document.querySelector(".profile__edit-button");


//User Instance
const userInfo = new UserInfo(".profile__name", ".profile__job");

//Inputs edit
const  nameInput = document.querySelector(".form__input_type_name");
const jobInput= document.querySelector(".form__input_type_job");
//add
const titleInput = addCardModel.querySelector(".form__input_type_card-title");
const cardLinkInput = addCardModel.querySelector(".form__input_type_card-link");



const assignEditValues = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
};

assignEditValues();


//Popup Instance
const popupImage = new PopupWithImage(".popup_type_image");
const editProfileModel = new PopupWithForm(".popup_type_edit-profile", {
  submitHandler: ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
  editProfileModel.close();
}});


//Set popup
popupImage.setEventListeners();
editProfileModel.setEventListeners();


//FormValidator
const formEditProfile = document.querySelector(".popup_type_edit-profile").querySelector(".form");
const editProfileFormValidator = new FormValidator(formEditProfile);
editProfileFormValidator.enableValidation();


editProfileButton.addEventListener('click', () => {

  const data = userInfo.getUserInfo();
  const { name, job } = data;
   console.log("123123",name , job);
  document.querySelector(".form__input_type_name").value = name;
  document.querySelector(".form__input_type_job").value = job;
  editProfileModel.open();
  userInfo.setUserInfo(data);
});










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
