

//components
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

const editProfileButton = document.querySelector(".profile__edit-button");


//User Instance
const userInfo = new UserInfo(".profile__name", ".profile__job");
const  nameInput = document.querySelector(".form__input_type_name");
const jobInput= document.querySelector(".form__input_type_job");


const editProfileModel = new PopupWithForm(".popup_type_edit-profile",
   ({ name, job }) => {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
  //console.log("123",job,name)
  userInfo.setUserInfo({ name, job });
  //console.log("456",userInfo.getUserInfo());
  editProfileModel.close();
});


//Set popup
editProfileModel.setEventListeners();


//FormValidator
const formEditProfile = document.querySelector(".popup_type_edit-profile").querySelector(".form");
const editProfileFormValidator = new FormValidator(formEditProfile);
editProfileFormValidator.enableValidation();


editProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  const { name, job } = data;
   console.log(`line 50, ${name} , ${job}`);
   console.log("line 51,",data);
   nameInput.value = name;
   jobInput.value = job;
  //document.querySelector(".form__input_type_name").value = name;
  //document.querySelector(".form__input_type_job").value = job;
  editProfileModel.open();
  //editProfileFormValidator.resettingFormValidation(".popup_type_edit-profile");
  //userInfo.setUserInfo(data);

});



//formEditProfile.addEventListener("submit", editProfileModel);






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
