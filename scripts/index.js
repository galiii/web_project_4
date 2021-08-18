
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
let userJobElement =  document.querySelector('.profile__about');


function toggleEditor() {
  let isContainOpen = popup.classList.contains('popup__open');

  if(!isContainOpen) {
    console.log("hello");
     popup.classList.add('popup__open');
     inputNameElement.value = userNameElement.textContent;
     inputJobElement.value = userJobElement.textContent;
  }
  else {
    popup.classList.remove('popup__open');
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

