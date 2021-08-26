const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//Open Buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button'); //change the ben to card

//Card
const list = document.querySelector('.cards__list');
const templateListItem = document.querySelector('#card-template').content.querySelector('.card');

//Models
const editProfileModel = document.querySelector('.popup_type_edit-profile');
const addCardModel = document.querySelector('.popup_type_add-card');

//Close buttons
const editModelCloseButton = editProfileModel.querySelector('.popup__close-button');
const addCardModelCloseButton = addCardModel.querySelector('.popup__close-button');

//Form
const editProfileForm = editProfileModel.querySelector('.form');
const addCardForm = addCardModel.querySelector('.form');

//Input
const profileNameInput = editProfileModel.querySelector('.form__input_type_name');
const profileJobInput = editProfileModel.querySelector('.form__input_type_job');
const cardTitleInput = addCardModel.querySelector('.form__input_type_card-title');
const cardLinkInput = addCardModel.querySelector('.form__input_type_card-link');

//User
const userNameElement = document.querySelector('.profile__name');
const userJobElement =  document.querySelector('.profile__job');


//function
const closePopup = (model) => {model.classList.remove('popup_open')};

const openPopup = (model) => {model.classList.add('popup_open');}

const  toggleModel = (model) => {!model.classList.contains('popup_open') ? openPopup(model) : closePopup(model);}


const  generateCard = (cardData) => {
  const listItem = templateListItem.cloneNode(true);
   /** Items **/
  const image = listItem.querySelector('.card__image');
  const deleteButton = listItem.querySelector('.card__delete');
  const title = listItem.querySelector('.card__title');
  const like = listItem.querySelector('.card__like');
  /** Popuos Items **/
  const figureModel = document.querySelector('.popup_type_image');
  const figureCloseButton = figureModel.querySelector('.popup__close-button');

  /** Image Property setup **/
  image.src = cardData.link;
  image.alt = cardData.name;
  /** Title Property setup **/
  title.textContent = cardData.name;

  /** Delete Property click Event **/
  deleteButton.addEventListener('click',() =>{
    const card = deleteButton.closest(".card");
    card.remove();
  });
  /** Like Property click Event **/
  like.addEventListener('click', (evt) => {evt.target.classList.toggle("card__like_active");});
  /** Image Property click Event **/
  image.addEventListener('click',() => {
    //console.log(evt.target);
    const img = figureModel.querySelector('.popup__image');
    const caption = figureModel.querySelector('.popup__caption');
    img.src = cardData.link;
    //console.dir(caption);
    caption.ariaLabel = cardData.name;
    caption.textContent = cardData.name;
    //toggleModel(figureModel);
    //console.log("hello 1");
    figureModel.classList.add('popup_open');
  });

  figureCloseButton.addEventListener('click', () => {
    //console.log("hello");
    //toggleModel(figureModel);
    figureModel.classList.remove('popup_open');
  });
  //console.dir(listItem);
  list.append(listItem);
}

initialCards.forEach(generateCard);


/** Form Submit functions **/

const  addCardFormSubmit = (evt) => {
  evt.preventDefault();
  generateCard({name: cardTitleInput.value, link:  cardLinkInput.value});
  toggleModel(addCardModel);
  //console.dir(addCardForm);
  //reset the values (clean)
  addCardForm.reset();
  cardTitleInput.value ='';
  cardLinkInput.value ='';
}

const editProfileFormSubmit = (evt) => {
  evt.preventDefault();
  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent =  profileJobInput.value;
  toggleModel(editProfileModel);
  }


/** Events **/
/** Open  **/
editProfileButton.addEventListener('click', ()=> {
  toggleModel(editProfileModel);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
});

addCardButton.addEventListener('click', () => {
  toggleModel(addCardModel);
});

/** Close  **/
editModelCloseButton.addEventListener('click', () => {
  toggleModel(editProfileModel);
});

addCardModelCloseButton.addEventListener('click', () => {
  toggleModel(addCardModel);
});

/** Submit **/
editProfileForm.addEventListener('submit', editProfileFormSubmit);
addCardForm.addEventListener('submit', addCardFormSubmit);
