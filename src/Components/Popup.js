export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleButtonclose = () => {
    this.close();
  };

  _handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleButtonclose);
    this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
  }
}
