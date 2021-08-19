
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


/**
 * This function behave like a toggle funtion that belong to classList
 **/
function toggleEditor() {
  /* A ver that with him, I check if I will remove the the class or add */
  let isContainOpen = popup.classList.contains('popup_open');

  /*
The logic if it's false, It's mean that the popup window isn't open yet so,
we need to add the class and put the the right properties */
  if(!isContainOpen) {
     console.log("hello");
     popup.classList.add('popup_open');
     inputNameElement.value = userNameElement.textContent;
     inputJobElement.value = userJobElement.textContent;
  }
  else {
    popup.classList.remove('popup_open');
  }
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = inputNameElement.value;
  userJobElement.textContent =  inputJobElement.value;
  toggleEditor();
  }


editButton.addEventListener('click', toggleEditor);
closeButton.addEventListener('click', toggleEditor);
formElement.addEventListener('submit', handleFormSubmit);

