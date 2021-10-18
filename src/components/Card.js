import { userJobElement } from "../utils/constants";

export default class Card {
  constructor(
    cardData,
    cardSelector,
    userId,
    handleCardClick,
    handleCardDelete,
    handleLikeIcon
  ) {
    //private
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes; ////inside of the cardData there is likes [] array
    //console.log("LIKES", this._likes);
    this._cardSelector = cardSelector;
    this._cardTemplate = document
      .querySelector(this._cardSelector) //#card-template
      .content.querySelector(".card");
    this._userId = userId;
    //console.log("USER id",  this.userId);
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete; //function from the outside
    this._handleLikeIcon = handleLikeIcon;
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
    /* display button or not */
    if (this._userId !== this._ownerId) {
      deleteButtonElement.style.display = "none";
    }


    deleteButtonElement.addEventListener("click", () => {
      this._handleCardDelete(this._id);
    });
  };



  /** Like Property click Event **/
  _createLike = (likeElement) => {
    console.log( '_createLike',this._likes)

      this._cardElement.querySelector(".card__likes-count").textContent =
      this._likes.length;



    if(this.isLiked()){
      //console.log("hello");
      this.likeCard(this._likes);
    }


    likeElement.addEventListener("click", (evt) => {
      //  evt.target.classList.toggle("card__like_active");
      this._handleLikeIcon(this._id);
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



  /** Public method for delete card **/
  removeCard = () => {
    const card = this._cardElement
      .querySelector(".card__delete")
      .closest(".card");
    card.remove();
  };

  /***
   *
   */

  isLiked = () => {
    return this._likes.some((person) => person._id === this._userId);
  }

    /** Public method for add like card card **/
    likeCard = (newLikes) => {
      console.log("likeeee",newLikes);
      this._likes = newLikes;


        this._cardElement.querySelector(".card__likes-count").textContent =
        this._likes.length ;//length



      const likeElement =  this._cardElement.querySelector(".card__like");
      likeElement.classList.toggle("card__like_active");
    };


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
