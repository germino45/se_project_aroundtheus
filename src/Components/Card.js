export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._cardImageEl.addEventListener("click", () =>
      this._handlePreviewPicture(this._name, this._link)
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
    this._handleImageClick(this._name, this._link);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImageEl = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector("#card-delete-button");
    this._cardImage = this._element.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardText = this._element.querySelector(".card__text");
    this._cardText.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
