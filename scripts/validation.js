export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error",
};

function showInputError(formEl, inputEl, errorMessage) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(config.errorClass);
}

function hideInputError(formEl, inputEl) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.classList.remove(config.errorClass);
  errorEl.textContent = "";
}

function checkInputValidity(formEl, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonEl) {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputEls, buttonEl);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputEls, buttonEl);
    });
  });
}

function enableValidation(options) {
  const formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    const fieldSet = Array.from(formEl.querySelectorAll(config.formSelector));
    setEventListeners(formEl, options);
  });
}

enableValidation(config);

function resetValidation() {}
