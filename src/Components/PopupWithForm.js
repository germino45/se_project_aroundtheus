import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".form");
    this._inputs = this._popupForm.querySelectorAll(".form__input");
    this._saveButton = this._popupForm.querySelector(".form__save-button");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputObj = {};

    this._inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    return inputObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  renderLoading(isLoading, saveButtonText) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = saveButtonText;
    }
  }
}

export default PopupWithForm;
