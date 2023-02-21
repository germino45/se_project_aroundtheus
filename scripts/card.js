import { openModal } from "./Utils.js";

const imageModal = document.querySelector("#image-modal");
const modalCardImage = document.querySelector(".modal__image-picture");
const modalCardCaption = document.querySelector(".modal__image-caption");

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteButton = this._element.querySelector("#card-delete-button");
    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._cardImageEl = this._element.querySelector(".card__image");
    this._cardImageEl.addEventListener("click", () =>
      this._handlePreviewPicture(imageModal)
    );
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_activated");
  };

  _handleDeleteCard = () => {
    this._element.remove();

    this._element = null;
  };

  _handlePreviewPicture() {
    modalCardImage.src = this._link;
    modalCardImage.alt = this._name;

    modalCardCaption.textContent = this._name;

    openModal(imageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardText = this._element.querySelector(".card__text");
    cardText.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
