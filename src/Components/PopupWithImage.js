import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name, link) {
    this._image = this._popupElement.querySelector(".modal__image-picture");
    this._caption = this._popupElement.querySelector(".modal__image-caption");
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
