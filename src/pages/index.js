import "./index.css";

//data
import initialCards from "../utils/cards.js";

//selectors
import {
  cardTemplate, //#card-template
  cardListSelector, //.cards__list
  nameProfileUserSelector, //.profile__name
  jobProfileUserSelector, //.profile__job
  imageProfileUserSelector, // .profile__image
  editProfilePopupSelector, //.popup_type_edit-profile
  addCardPopupSelector, //.popup_type_add-card
  deleteCardPopupSelector, // .popup_type_delete-card
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
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";


let userId; //undefined

//User Instance
const userInfo = new UserInfo(
  nameProfileUserSelector,
  jobProfileUserSelector,
  imageProfileUserSelector
);

//Card Instance
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplate, () => {
    imagePopup.open(cardData.link, cardData.name);
  });
  return card;
};

 //Section Instance
const createSection = () => {
  const cardList = new Section(
    {
      //items: cardsData,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement.generateCard());
      },
    },
    cardListSelector
  );
  return cardList;
};

const cardsList = createSection(); //for reload


Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cardData]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData["name"],
      job: userData["about"],
      avatar: userData["avatar"],
    });

    console.log("userData",userData);
    console.log("cardData",cardData);
    //const cardsList = createSection(cardData);
    cardsList.renderer(cardData);
  }
);


//Popup Instances
const editProfilePopup = new PopupWithForm(editProfilePopupSelector, (data) => {
  nameProfileEditInput.value = data.name.textContent;
  jobProfileEditInput.value = data.job.textContent;
  userInfo.setUserInfo({ name: data.name, job: data.job });
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(addCardPopupSelector,
  (data) => {
    console.log("data",data);
  api.addCard(data)
  .then(res => {
    console.log("rr",res);
    console.log("dd",data);
    const card = createCard({
      name: data["card-title"],
      link: data["card-link"],
    });
    cardsList.prependItem(card.generateCard());
  });


  addCardPopup.close();
}
);

const deleteCardPopup = new PopupWithSubmit(deleteCardPopupSelector);

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
