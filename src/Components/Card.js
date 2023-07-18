export default class Card {
  constructor({
    data,
    userId,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
  }) {
    this._id = data._id;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userCardOwnerId = data.owner._id;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._id)
    );

    this._cardImageEl.addEventListener("click", () =>
      this._handlePreviewPicture()
    );
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_activated");
  };

  handleDeleteCard = () => {
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

  setLikesCounter(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    this._likesNumber = this._element.querySelector(".card__likes-counter");
    this._likesNumber.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_activated");
    } else {
      this._likeButton.classList.remove("card__like-button_activated");
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImageEl = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector("#card-like-button");
    this._deleteButton = this._element.querySelector("#card-delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardLikes = this._element.querySelector(".card__likes-counter");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardText = this._element.querySelector(".card__text");
    this._cardText.textContent = this._name;

    this._renderLikes();

    if (this._userId !== this._userCardOwnerId) {
      this._deleteButton.remove();
    }
    this._setEventListeners();

    return this._element;
  }
}
