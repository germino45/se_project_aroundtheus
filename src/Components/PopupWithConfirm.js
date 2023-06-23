import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(
      "#image-delete-form-fieldset"
    );
    this._saveButton = this._popupForm.querySelector(".form__save-button");
  }

  setSubmit(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._saveButton.addEventListener("click", () => {
      this._handleSubmit();
    });
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  renderLoading(isLoading, saveButtonText) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = saveButtonText;
    }
  }
}
