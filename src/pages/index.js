import "./index.css";


import initialCards from "../utils/cards.js";//data
import {renderLoading} from "../utils/utils.js";
//selectors
import {
  cardTemplate, //#card-template
  cardListSelector, //.cards__list
  nameProfileUserSelector, //.profile__name
  jobProfileUserSelector, //.profile__job
  imageProfileUserSelector, // .profile__image
  //popup submit
  editProfilePopupSelector, //.popup_type_edit-profile
  updateUserInfoPopupSelector, //.popup_type_update-image-profile
  deleteCardPopupSelector, // .popup_type_delete-card
  addCardPopupSelector, //.popup_type_add-card
  //popup
  imagePopupSelector, //.popup_type_image
  //input value
  nameProfileEditInput, //.form__input_type_name query selector
  jobProfileEditInput, //.form__input_type_job query selector
  profileImageInput, //.form__input_type_avatar query selector
  //button
  editProfileButton, // .profile__edit-button query selector
  addCardButton, // .profile__add-button query selector
  updateImageProfileButton, // .profile__update-image query selector
  //model
  editProfileModel, //.popup_type_edit-profile query selector
  addCardModel, // .popup_type_add-card query selector
  updateImageModel, //.popup_type_update-image-profile query selector
  //form
  formEditProfile, //.form query selector
  formAddCard, //.form query selector
  formUpdateImage, //.form query selector
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

//FormValidator Instances
const editProfileFormValidator = new FormValidator(formEditProfile);
const addCardFormValidator = new FormValidator(formAddCard);
const updateImageFormValidator = new FormValidator(formUpdateImage);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
updateImageFormValidator.enableValidation();

//Card Instance
function createCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplate,
    userId,
    // Figure open popup click event
    () => {
      imagePopup.open(cardData.link, cardData.name);
    },
   // Confirm delete card popup click event
    () => {
      console.log("in index", cardData);
      deleteCardPopup.open();

      deleteCardPopup.setAction(() => {
        //submit model
        api.deleteCard(cardData._id).then((res) => {
          //console.log(cardData)
          //console.log("card is delete", res);
          console.log("card is Card delete", cardData);
          //remove it from dom
          card.removeCard();
          deleteCardPopup.close();
        });
      });
    },
    // Like icon click event
    () => {
      console.log("in index LIKE/DISLIKE", card);
      const isAlreadyLiked = card.isLiked();

      if (isAlreadyLiked) {
        api.dislikeCard(cardData._id).then((res) => {
          //console.log("res Dislike index", res);
          //add active like it from dom
          card.likeCard(res.likes);
        });
      } else {
        //if it's my first click on like icon fill the like
        api.likeCard(cardData._id).then((res) => {
          //add active like it from dom
          card.likeCard(res.likes);
        });
      }
    }
  );
  return card;
}

//Section Instance
function createSection() {
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
}



// Popup instance in the Card
const imagePopup = new PopupWithImage(imagePopupSelector);
const deleteCardPopup = new PopupWithSubmit(deleteCardPopupSelector);

//Popup Instances

const editProfilePopup = new PopupWithForm(editProfilePopupSelector,
  (data) => {
  nameProfileEditInput.value = data.name.textContent;
  jobProfileEditInput.value = data.job.textContent;


  renderLoading(true,editProfileModel,"Save....",".form__button");

  api.editProfileUserInfo(data)
  .then((res) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.job,
      avatar: res.avatar,
    });
    //renderLoading(false,editProfileModel,"Save",".form__button")

    nameProfileEditInput.value = data.name;
    jobProfileEditInput.value = data.job;

    editProfilePopup.close();
  })
  .catch((err) => console.error(err))
  .finally(() => {
    console.log("finally",data);
    nameProfileEditInput.value = data.name;
    jobProfileEditInput.value = data.job;

    renderLoading(false,editProfileModel,"Save",".form__button");
    //editProfilePopup.close();
  });

});

const updateImageProfilePopup = new PopupWithForm(
  updateUserInfoPopupSelector,
  (data) => {
    //console.log("line 159",data);

    api.updateUserImage(data).then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.job,
        avatar: data.avatar,
      });
    });
    updateImageProfilePopup.close();
  }
);

const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  //submit new card
  (data) => {
    api.addCard(data)
    .then((res) => {
      const card = createCard({
        name: data["card-title"],
        link: data["card-link"],
        _id: res._id, //_id i have some problem if i don't _id
        owner: res.owner,
        likes: res.likes,
      });
      cardsList.prependItem(card.generateCard());
    });
    addCardPopup.close();
  }
);

//Set popup
imagePopup.setEventListeners(); //inside cards
deleteCardPopup.setEventListeners();//inside cards
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
updateImageProfilePopup.setEventListeners();

const cardsList = createSection(); //for reload
cardsList.renderer(initialCards); //for the start offline data

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cardData]) => {
    userId = userData._id;
    console.log("user id owner", userId);
    userInfo.setUserInfo({
      name: userData["name"],
      job: userData["about"],
      avatar: userData["avatar"],
    });

    console.log("userData", userData);
    cardsList.renderer(cardData);
  }
);

// Event click

/*** Edit  ***/
editProfileButton.addEventListener("click", () => {
  editProfileFormValidator.resettingFormValidation(editProfileModel);
  const data = userInfo.getUserInfo();
  console.log("the DATA", data);
  const { name, job } = data;
  nameProfileEditInput.value = name;
  jobProfileEditInput.value = job;
  editProfilePopup.open();
});


/*** Add  ***/
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resettingFormValidation(addCardModel);
  addCardPopup.open();
});

/*** Update ***/
updateImageProfileButton.addEventListener("click", () => {
  updateImageFormValidator.resettingFormValidation(updateImageModel);
  const data = userInfo.getUserInfo();
  const { avatar } = data;
  profileImageInput.value = avatar;
  updateImageProfilePopup.open();
});
