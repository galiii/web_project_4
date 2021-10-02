export const figureModel = document.querySelector(".popup_type_image"); // Popuos Items
export const img = figureModel.querySelector(".popup__image");
export const caption = figureModel.querySelector(".popup__caption");


export const closePopup = (model) => {
  model.removeEventListener("click", closePopupClick);
  model.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupKeydown);
};


const closePopupKeydown = (evt) => {
  if (evt.key === "Escape") {
    //evt.keyCode === 229
    const active = document.querySelector(".popup_open");
    closePopup(active);
  }
};

const closePopupClick = (evt) => {
  //Sometimes evt.target and evt.currentTarget are the same thing
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const openPopup = (model) => {
  model.addEventListener("click", closePopupClick);
  model.classList.add("popup_open");
  document.addEventListener("keydown", closePopupKeydown);
};
