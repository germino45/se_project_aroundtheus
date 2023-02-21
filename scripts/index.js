/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import FormValidator from "./FormValidator.js";

import Card from "./Card.js";

import {
  closeModalByEscape,
  closeModalOnRemoteClick,
  closeModal,
  openModal,
} from "./Utils.js";

/* -------------------------------------------------------------------------- */
/*                                    Array                                   */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://live.staticflickr.com/65535/50970386722_550d19f11b_b.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://www.worldatlas.com/r/w1200-q80/upload/b4/2c/95/shutterstock-569741011.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://www.roadtripryan.com/go/resources/content/utah/northern-utah/bald-moutain-uintas/user-submitted/ryancornia-1631641778217.jpg",
  },
  {
    name: "Latemar",
    link: "https://media.istockphoto.com/id/155359110/photo/milky-way-in-the-alps.jpg?s=612x612&w=0&k=20&c=q9pv4VxHGZlm0AJRoQMIUjtnPh2RLXmm_MWxya1nq4Q=",
  },
  {
    name: "Vanoise National Park",
    link: "https://montblanctreks.com/media/pages/blog/hiking-the-vanoise-national-park/9d3c53526c-1626794965/vanise-at-sunrise-1920x-q40.png",
  },
  {
    name: "Lago di Braies",
    link: "https://expertvagabond.com/wp-content/uploads/lago-di-braies-italy-guide.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Profile Modal ----------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");

const titleInput = document.querySelector("#profile-title-input");

const descriptionInput = document.querySelector("#profile-description-input");

const profileForm = document.querySelector("#profile-form");

const profileModal = document.querySelector("#profile-modal");

const profileCloseButton = document.querySelector("#profile-close-button");

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

/* ----------------------------- Add Card Modal ----------------------------- */

const cardAddButton = document.querySelector("#card-add-button");

const addModal = document.querySelector("#add-modal");

const addCloseButton = document.querySelector("#add-close-button");

const addCardForm = document.querySelector("#add-form");

/* ---------------------------- card image modal ---------------------------- */

const imageModal = document.querySelector("#image-modal");

const imageCloseButton = document.querySelector("#image-close-button");

/* ---------------------------------- Cards --------------------------------- */

const cardsList = document.querySelector(".cards__list");

const cardSelector = "#card-template";

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/* ------------------------- Create Cards Functions ------------------------- */

function createCardEl(data) {
  const card = new Card(data, cardSelector);

  return card.getView(cardSelector);
}

function renderCard(data, cardsList) {
  const card = createCardEl(data);

  cardsList.prepend(card);
}

initialCards.forEach(function (data) {
  renderCard(data, cardsList);
});

/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */

/* ------------------------- profile event listeners ------------------------ */

profileEditButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  editFormValidator.toggleButtonState();
  openModal(profileModal);
});

profileCloseButton.addEventListener("click", () => {
  closeModal(profileModal);
});

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileModal);
});

/* ------------------------ add card event listeners ------------------------ */

cardAddButton.addEventListener("click", () => {
  openModal(addModal);
});

addCloseButton.addEventListener("click", () => {
  closeModal(addModal);
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.title.value;
  const link = e.target.link.value;

  renderCard({ name, link }, cardsList);

  e.target.reset();

  closeModal(addModal);

  addFormValidator.toggleButtonState();
});

/* ------------------- Image Modal Preview Event Listeners ------------------ */

imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

/* -------------------------------------------------------------------------- */
/*                                 validation                                 */
/* -------------------------------------------------------------------------- */

const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error",
};

const editFormValidator = new FormValidator(validationSettings, profileForm);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
