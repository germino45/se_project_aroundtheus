const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error",
};

enableValidation(config);

function showInputError(formEl, inputEl, errorMessage, validationConfig) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(validationConfig.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(validationConfig.errorClass);
}

function hideInputError(formEl, inputEl, validationConfig) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(validationConfig.inputErrorClass);
  errorEl.classList.remove(validationConfig.errorClass);
  errorEl.textContent = "";
}
function checkInputValidity(formEl, inputEl, validationConfig) {
  if (!inputEl.validity.valid) {
    showInputError(
      formEl,
      inputEl,
      inputEl.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formEl, inputEl, validationConfig);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

function toggleButtonState(inputEls, buttonEl, validationConfig) {
  if (hasInvalidInput(inputEls)) {
    buttonEl.classList.add(validationConfig.inactiveButtonClass);
    buttonEl.disabled = true;
    return;
  }
  buttonEl.classList.remove(validationConfig.inactiveButtonClass);
  buttonEl.disabled = false;
}

function setEventListeners(formEl, validationConfig) {
  const { inputSelector } = validationConfig;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const buttonEl = formEl.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputEls, buttonEl, config);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, validationConfig);
      toggleButtonState(inputEls, buttonEl, config);
    });
  });
}

function enableValidation(validationConfig) {
  const formEls = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, validationConfig);
  });
}

//function resetValidation() {

//}
