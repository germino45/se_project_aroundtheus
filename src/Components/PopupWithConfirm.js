import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector("#image-delete-form");
    this._saveButton = this._popupForm.querySelector(
      "#image-delete-confirm-button"
    );
  }

  setSubmit(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      this._handleSubmit();
      e.preventDefault();
    });
  }

  renderDeleting(isDeleting, saveButtonText) {
    if (isDeleting) {
      this._saveButton.textContent = "Deleting...";
    } else {
      this._saveButton.textContent = saveButtonText;
    }
  }
}
