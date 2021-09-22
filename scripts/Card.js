

export default class Card {
  constructor(cardData, cardSelector) {
    //private
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  //privates methods
  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector) //#card-template
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _imagePropertySetup(imageElement) {
    imageElement.src = this._link;
    console.log("hello", imageElement.src);
    imageElement.alt = this._name;
  }

  /** Delete method click Event  **/
  _deleteCard(deleteButtonElement) {
    deleteButtonElement.addEventListener("click", () => {
      const card = deleteButtonElement.closest(".card");
      card.remove();
    });
  }

  /** Like Property click Event **/
  _createLike(likeElement) {
    likeElement.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like_active");
    });
  }
  //_createFigurePopup
  /** Image Property click Event **/
  _createFigurePopup(imageElement, figureModel) {
    imageElement.addEventListener("click", () => {
      const img = figureModel.querySelector(".popup__image");
      const caption = figureModel.querySelector(".popup__caption");
      //Image properties
      img.src = this._link;
      img.alt = this._name;
      //Figcaption properties
      caption.ariaLabel = this._name;
      caption.textContent = this._name;
      openPopup(figureModel);
    });

    const figureCloseButton = figureModel.querySelector(".popup__close-button");
    figureCloseButton.addEventListener("click", () => {
      closePopup(figureModel);
    });
  }

  _setEventListeners(cardElement, imageElement) {
    const deleteButton = cardElement.querySelector(".card__delete");
    const like = cardElement.querySelector(".card__like");
    const figureModel = document.querySelector(".popup_type_image"); // Popuos Items

    this._deleteCard(deleteButton); //Delete Property click Event
    this._createLike(like); //Like Property click Event
    this._createFigurePopup(imageElement, figureModel); ///Image Property click
  }

  //public methods
  generateCard() {
    const cardElement = this._getCardTemplate();
    const imageElement = cardElement.querySelector(".card__image");

    this._setEventListeners(cardElement, imageElement);


    const title = cardElement.querySelector(".card__title");

    this._imagePropertySetup(imageElement); // Image Property setup
    title.textContent = this._name; // Title Property setup

    return cardElement;
  }
}
