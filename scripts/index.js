import initialCards from "./cards.js";
import resettingFormValidation from "./validate.js";

//Open Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
//Card
const list = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
//Models
const editProfileModel = document.querySelector(".popup_type_edit-profile");
const addCardModel = document.querySelector(".popup_type_add-card");
//Close buttons
const editModelCloseButton = editProfileModel.querySelector(
  ".popup__close-button"
);
const addCardModelCloseButton = addCardModel.querySelector(
  ".popup__close-button"
);
//Form
const editProfileForm = editProfileModel.querySelector(".form");
const addCardForm = addCardModel.querySelector(".form");
//Input
const profileNameInput = editProfileModel.querySelector(
  ".form__input_type_name"
);
const profileJobInput = editProfileModel.querySelector(".form__input_type_job");
const cardTitleInput = addCardModel.querySelector(
  ".form__input_type_card-title"
);
const cardLinkInput = addCardModel.querySelector(".form__input_type_card-link");
//User
const userNameElement = document.querySelector(".profile__name");
const userJobElement = document.querySelector(".profile__job");

/***** Function ****/
const resetInputFormKeydown = (model) => {
  if (model.classList.contains("popup_type_add-card")) {
    //reset
    cardTitleInput.value = "";
    cardLinkInput.value = "";
  }
};

const closePopupKeydown = (evt) => {
  if (evt.key === "Escape") {
    //evt.keyCode === 229
    const active = document.querySelector(".popup_open");
    closePopup(active);
  }
};

const closePopupClick = (evt) => {
  //Sometimes evt.target and evt.currentTarget are the same thing
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const closePopup = (model) => {
  model.removeEventListener("click", closePopupClick);
  model.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupKeydown);
  //call this function when you close exactly the popups with the form
  if (
    model.classList.contains("popup_type_add-card") ||
    model.classList.contains("popup_type_edit-profile")
  ) {
    console.log("hello world", model);
    resettingFormValidation(model);
    resetInputFormKeydown(model);
  }
};

const openPopup = (model) => {
  model.addEventListener("click", closePopupClick);
  model.classList.add("popup_open");
  document.addEventListener("keydown", closePopupKeydown);
};

/** Image Property setup **/
const imagePropertySetup = (cardData, imageElement) => {
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
};

/** Delete Property click Event  **/
const deleteCard = (deleteButtonElement) => {
  deleteButtonElement.addEventListener("click", () => {
    const card = deleteButtonElement.closest(".card");
    card.remove();
  });
};

/** Like Property click Event **/
const createLike = (likeElement) => {
  likeElement.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });
};

/** Image Property click Event **/
const createFigurePopup = (imageElement, figureModel, cardData) => {
  imageElement.addEventListener("click", () => {
    const img = figureModel.querySelector(".popup__image");
    const caption = figureModel.querySelector(".popup__caption");
    //Image properties
    img.src = cardData.link;
    img.alt = cardData.name;
    //Figcaption properties
    caption.ariaLabel = cardData.name;
    caption.textContent = cardData.name;
    openPopup(figureModel);
  });

  const figureCloseButton = figureModel.querySelector(".popup__close-button");
  figureCloseButton.addEventListener("click", () => {
    closePopup(figureModel);
  });
};

const generateCard = (cardData) => {
  const listItem = cardTemplate.cloneNode(true);
  // Items
  const imageElement = listItem.querySelector(".card__image");
  const deleteButton = listItem.querySelector(".card__delete");
  const title = listItem.querySelector(".card__title");
  const like = listItem.querySelector(".card__like");
  const figureModel = document.querySelector(".popup_type_image"); // Popuos Items

  imagePropertySetup(cardData, imageElement); // Image Property setup
  title.textContent = cardData.name; // Title Property setup
  deleteCard(deleteButton); //Delete Property click Event
  createLike(like); //Like Property click Event
  createFigurePopup(imageElement, figureModel, cardData); ///Image Property click

  return listItem;
};

const renderCard = (cardItem) => {
  list.prepend(generateCard(cardItem));
};

initialCards.forEach((cardItem) => {
  renderCard(cardItem);
});

/** Form Submit functions **/

const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({ name: cardTitleInput.value, link: cardLinkInput.value });
  closePopup(addCardModel);
  //reset the values (clean)
  addCardForm.reset();
};

const editProfileFormSubmit = (evt) => {
  evt.preventDefault();
  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  closePopup(editProfileModel);
};

/** Events **/
/** Open  **/
editProfileButton.addEventListener("click", () => {
  openPopup(editProfileModel);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModel);
});

/** Close  **/
editModelCloseButton.addEventListener("click", () => {
  closePopup(editProfileModel);
});

addCardModelCloseButton.addEventListener("click", () => {
  closePopup(addCardModel);
  //reset
  cardTitleInput.value = "";
  cardLinkInput.value = "";
});

/** Submit **/
editProfileForm.addEventListener("submit", editProfileFormSubmit);
addCardForm.addEventListener("submit", addCardFormSubmit);
