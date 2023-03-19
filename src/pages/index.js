/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import "./index.css";

import profileImageSrc from "../images/jacques-cousteau.jpg";

import headerImageSrc from "../images/logo.svg";

import FormValidator from "../Components/FormValidator.js";

import Section from "../Components/Section.js";

import PopupWithImage from "../Components/PopupWithImage.js";

import PopupWithForm from "../Components/PopupWithForm.js";

import UserInfo from "../Components/UserInfo.js";

import Card from "../Components/Card.js";

import {
  initialCards,
  validationSettings,
  containerSelectors,
  headerImage,
  profileImage,
  profileEditButton,
  titleInput,
  descriptionInput,
  profileForm,
  profileCloseButton,
  profileTitle,
  profileDescription,
  cardAddButton,
  addCardForm,
} from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                                  elements                                  */
/* -------------------------------------------------------------------------- */

headerImage.src = headerImageSrc;

profileImage.src = profileImageSrc;

const userInfo = new UserInfo(profileTitle, profileDescription);

const editFormPopup = new PopupWithForm(
  containerSelectors.profilePopup,
  submitEditProfile
);

const addFormPopup = new PopupWithForm(
  containerSelectors.addCardPopup,
  submitAddCard
);

const imagePopup = new PopupWithImage(
  containerSelectors.cardPreviewPopup,
  handleImageClick
);

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  containerSelectors.cardSection
);

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

cardSection.renderItems();

profileEditButton.addEventListener("click", () => {
  openEditForm();
});

profileCloseButton.addEventListener("click", () => {
  editFormPopup.close();
});

cardAddButton.addEventListener("click", () => {
  openAddForm();
});

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function openEditForm() {
  const profileInfo = userInfo.getUserInfo();
  titleInput.value = profileInfo.name;
  descriptionInput.value = profileInfo.job;
  editFormValidator.enableValidation();
  editFormPopup.open();
}

function submitEditProfile(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  editFormPopup.close();
}

function openAddForm() {
  addFormPopup.open();
  addFormValidator.enableValidation();
}

function submitAddCard(data) {
  renderCard({ name: data.name, link: data.link });
}

function renderCard(data) {
  const card = new Card(
    data,
    containerSelectors.cardTemplate,
    handleImageClick
  ).getView();
  cardSection.addItem(card);
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}
/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(validationSettings, profileForm);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
