
//Find me the editButton in the dom
let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');

// Let's find the form in the DOM
let formElement = document.querySelector('.form');

//formElement contain .form__input_type_name (the parent)
let inputNameElement = formElement.querySelector('.form__input_type_name');
//formElement contain .form__input_type_job (the parent)
let inputJobElement = formElement.querySelector('.form__input_type_job');


let userNameElement = document.querySelector('.profile__name');
let userJobElement =  document.querySelector('.profile__job');


function closePopupEditor() {
  //console.log('close function');
  popup.classList.remove('popup_open');
}


function openPopupEditor() {
  //console.log('open function');
  popup.classList.add('popup_open');
  inputNameElement.value = userNameElement.textContent;
  inputJobElement.value = userJobElement.textContent;
}



/**
 * This function behave like a toggle funtion that belong to classList
 **/
function toggleEditor() {
  //console.log('in toggle function');
  /*
  The logic if it's false, It's mean that the popup window isn't open yet so,
  we need to add the class and put the the right properties */
  if(!popup.classList.contains('popup_open')) {
     openPopupEditor();
  }
  else {
    closePopupEditor();
  }
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = inputNameElement.value;
  userJobElement.textContent =  inputJobElement.value;
  //console.log('in handleFormSubmit');
  //Everything completed we can close the window
  //closePopupEditor();

  // i'm still using this function because only in the click event you told me it's redundant
  toggleEditor();
  }

editButton.addEventListener('click', openPopupEditor);
closeButton.addEventListener('click', closePopupEditor);
formElement.addEventListener('submit', handleFormSubmit);

