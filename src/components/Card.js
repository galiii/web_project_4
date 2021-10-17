export default class Card {
  constructor(cardData, cardSelector, handleCardClick, handleCardDelete) {
    //private
    this._name = cardData.name;
    this._link = cardData.link;
    //console.log("id",cardData._id);
    this._id = cardData._id;
    //console.log("id", this._id);
    this._cardSelector = cardSelector;
    this._cardTemplate = document
      .querySelector(this._cardSelector) //#card-template
      .content.querySelector(".card");
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete; //function from the outside
  }

  //privates methods
  _getCardTemplate = () => {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  };

  _imagePropertySetup = (imageElement) => {
    imageElement.src = this._link;
    imageElement.alt = this._name;
  };

  /** Delete method click Event  **/
  _deleteCard = (deleteButtonElement) => {
    //console.log("delete id in card",this._id);
    deleteButtonElement.addEventListener("click", () => { this._handleCardDelete(this._id)});

  };

  removeCard = () => {
      const card = this._cardElement.querySelector(".card__delete").closest(".card");
      card.remove();
    //this._cardSelector.remove();
    //this._cardSelector= null;

  }

  /** Like Property click Event **/
  _createLike = (likeElement) => {
    likeElement.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like_active");
    });
  };

  /** Image Property click Event **/
  _createFigurePopup = (imageElement) => {
    imageElement.addEventListener("click", this._handleCardClick);
  };

  _setEventListeners = (cardElement, imageElement, deleteButton) => {
    //const deleteButton = cardElement.querySelector(".card__delete");
    const like = cardElement.querySelector(".card__like");

    this._deleteCard(deleteButton); //Delete Property click Event
    this._createLike(like); //Like Property click Event
    this._createFigurePopup(imageElement); ///Image Property click
  };

  //public methods
  generateCard = () => {
    this._cardElement = this._getCardTemplate();
    const imageElement = this._cardElement.querySelector(".card__image");
    const deleteButton = this._cardElement.querySelector(".card__delete");
    this._setEventListeners(this._cardElement, imageElement, deleteButton);

    const title = this._cardElement.querySelector(".card__title");

    this._imagePropertySetup(imageElement); // Image Property setup
    title.textContent = this._name; // Title Property setup

    return this._cardElement;
  };
}
