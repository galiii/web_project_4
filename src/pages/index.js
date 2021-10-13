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
import { api2 } from "../components/Api.js";

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

//Section
const createSection = (cardArray) => {
  const cards = new Section(
    {
      items: cardArray,
      renderer: (item) => {
        const cardElement = createCard(item);
        cards.addItem(cardElement.generateCard());
      },
    },
    cardListSelector
  );
  return cards;
};

/*
{
  "name": "Jacques Cousteau",
  "about": "Sailor, researcher",
  "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
  "_id": "e20537ed11237f86bbb20ccb",
  "cohort": "group-42"
}
*/
api2
  .getAllInformation()
  .then(([userApiRes, cardsApiRes]) => {
    // ["First promise", "Second promise"]

    userInfo.setUserInfo({
      name: userApiRes["name"],
      job: userApiRes["about"],
      avatar: userApiRes["avatar"],
    });

    console.log("CARDS LIST", cardsApiRes);
    console.log(cardsApiRes.length);

    //Section Instance
    const cardsList = createSection(cardsApiRes);

    //Show list of cards
    cardsList.renderer();
  })
  .catch((err) => {
    console.log(err);
  });

/*api instance
api
  .getInitialCards()
  .then((result) => {
    // process the result
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

  /*
  {
    "likes": [],
    "_id": "5d1f064ed321eb4bdcd707de",
    "name": "Lake Louise",
    "link": "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://code.s3.yandex.net/web-code/avatar.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "group-42"
    },
    "createdAt": "2019-07-05T08:11:58.324Z"
  }
*/
/*
api
  .getInitialUserInformation()
  .then((result) => {
    // process the result
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

*/

//Popup Instances
const editProfilePopup = new PopupWithForm(editProfilePopupSelector, (data) => {
  nameProfileEditInput.value = data.name.textContent;
  jobProfileEditInput.value = data.job.textContent;
  userInfo.setUserInfo({ name: data.name, job: data.job });
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, (data) => {
  //reset
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
