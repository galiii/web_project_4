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

//input
const profileNameInput = editProfileModel.querySelector('.form__input_type_name');
const profileJobInput = editProfileModel.querySelector('.form__input_type_job');
const cardTitleInput = addCardModel.querySelector('.form__input_type_card-title');
const cardLinkInput = addCardModel.querySelector('.form__input_type_card-link');


let userNameElement = document.querySelector('.profile__name');
let userJobElement =  document.querySelector('.profile__job');



function generateCard(cardData) {
  const listItem = templateListItem.cloneNode(true);
  const image = listItem.querySelector('.card__image');
  const deleteButton = listItem.querySelector('.card__delete');
  const title = listItem.querySelector('.card__title');
  const like = listItem.querySelector('.card__like');

  /** Image Property setup **/
  image.src = cardData.link;
  image.alt = cardData.name;
  /** Title Property setup **/
  title.textContent = cardData.name;

  /** Delete Property click Event **/
  deleteButton.addEventListener("click", function(){
    const lI = deleteButton.closest(".card");
    lI.remove();
  });
  /** Like Property click Event **/
  like.addEventListener("click", function(evt){
    console.log(evt.target);
    evt.target.classList.toggle("card__like_active");
  });
  console.dir(listItem);
  list.append(listItem);
}

initialCards.forEach(generateCard);




function closePopup(model) {
  model.classList.remove('popup_open');
}


function openPopup(model) {
  model.classList.add('popup_open');
  /*profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;*/
}


function toggleModel(model) {
  !model.classList.contains('popup_open') ? openPopup(model) : closePopup(model);
}


function editProfileFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent =  profileJobInput.value;

  // i'm still using this function because only in the click event you told me it's redundant
  toggleModel(editProfileModel);
  }


  function addCardFormSubmit(evt) {
    evt.preventDefault();
    console.log("hello", cardTitleInput.value ,cardLinkInput.value);
    generateCard({name: cardTitleInput.value, link:  cardLinkInput.value});
    toggleModel(addCardModel);
    console.dir(addCardForm);
    addCardForm.reset();
    }



/** open  **/
editProfileButton.addEventListener('click', ()=> {
  toggleModel(editProfileModel);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
});


/** open  **/
addCardButton.addEventListener('click', () => {
  toggleModel(addCardModel);
});


/** close  **/
editModelCloseButton.addEventListener('click', () => {
  toggleModel(editProfileModel);
});

/** close  **/
addCardModelCloseButton.addEventListener('click', () => {
  toggleModel(addCardModel);
});

editProfileForm.addEventListener('submit', editProfileFormSubmit);

addCardForm.addEventListener('submit', addCardFormSubmit);
