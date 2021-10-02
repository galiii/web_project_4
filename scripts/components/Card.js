

export default class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    //private
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardTemplate = document
      .querySelector(this._cardSelector) //#card-template
      .content.querySelector(".card");
      this._handleCardClick = handleCardClick;
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
    deleteButtonElement.addEventListener("click", () => {
      const card = deleteButtonElement.closest(".card");
      card.remove();
    });
  };

  /** Like Property click Event **/
  _createLike = (likeElement) => {
    likeElement.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like_active");
    });
  };

  /** Image Property click Event **/
  _createFigurePopup = (imageElement) => {
    //console.log("hello 123");
    imageElement.addEventListener("click",this._handleCardClick);
  };

  _setEventListeners = (cardElement, imageElement) => {
    const deleteButton = cardElement.querySelector(".card__delete");
    const like = cardElement.querySelector(".card__like");


    this._deleteCard(deleteButton); //Delete Property click Event
    this._createLike(like); //Like Property click Event
    this._createFigurePopup(imageElement); ///Image Property click
  };

  //public methods
  generateCard = () => {
    this._cardElement = this._getCardTemplate();
    const imageElement = this._cardElement.querySelector(".card__image");

    this._setEventListeners(this._cardElement, imageElement);

    const title = this._cardElement.querySelector(".card__title");

    this._imagePropertySetup(imageElement); // Image Property setup
    title.textContent = this._name; // Title Property setup

    return this._cardElement;
  };
}
