const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

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

//function
const closePopup = (model) => {
  model.classList.remove("popup_open");
};

const openPopup = (model) => {
  model.classList.add("popup_open");
};

const generateCard = (cardData) => {
  const listItem = cardTemplate.cloneNode(true);
  // Items
  const imageElement = listItem.querySelector(".card__image");
  const deleteButton = listItem.querySelector(".card__delete");
  const title = listItem.querySelector(".card__title");
  const like = listItem.querySelector(".card__like");
  // Popuos Items
  const figureModel = document.querySelector(".popup_type_image");
  const figureCloseButton = figureModel.querySelector(".popup__close-button");

  // Image Property setup
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  // Title Property setup
  title.textContent = cardData.name;

  /** Delete Property click Event **/
  deleteButton.addEventListener("click", () => {
    const card = deleteButton.closest(".card");
    card.remove();
  });
  /** Like Property click Event **/
  like.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });
  /** Image Property click Event **/
  imageElement.addEventListener("click", () => {
    var img = figureModel.querySelector(".popup__image");
    var caption = figureModel.querySelector(".popup__caption");
    //Image properties
    img.src = cardData.link;
    img.alt = cardData.name;
    //Figcaption properties
    caption.ariaLabel = cardData.name;
    caption.textContent = cardData.name;
    openPopup(figureModel);
  });

  figureCloseButton.addEventListener("click", () => {
    closePopup(figureModel);
    //figureModel.classList.remove("popup_open");
  });
  list.append(listItem);
};

initialCards.forEach(generateCard);

/** Form Submit functions **/

const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  generateCard({ name: cardTitleInput.value, link: cardLinkInput.value });
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
});

/** Submit **/
editProfileForm.addEventListener("submit", editProfileFormSubmit);
addCardForm.addEventListener("submit", addCardFormSubmit);
