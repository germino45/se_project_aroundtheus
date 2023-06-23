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

import PopupWithConfirm from "../Components/PopupWithConfirm.js";

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
  profileTitle,
  profileDescription,
  cardAddButton,
  addCardForm,
} from "../utils/constants.js";

import Api from "../Components/Api.js";

/* -------------------------------------------------------------------------- */
/*                                  elements                                  */
/* -------------------------------------------------------------------------- */

let userId;
let cardSection;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "524dc900-b8ae-4b17-aa07-465dc385d766",
    "Content-type": "application/json",
  },
});

const userInfo = new UserInfo(profileTitle, profileDescription, profileImage);

const editFormPopup = new PopupWithForm(
  containerSelectors.profilePopup,
  submitEditProfile
);

const addFormPopup = new PopupWithForm(
  containerSelectors.addCardPopup,
  (name, link) => {
    addFormPopup.renderLoading(true);
    api
      .addNewCard(name, link)
      .then((data) => {
        const card = createCard(data);
        addCardPopup.close();
        cardSection.addItem(card.renderCard());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addFormPopup.renderLoading(false, "Create");
      });
  }
);

const imagePopup = new PopupWithImage(
  containerSelectors.cardPreviewPopup,
  handleImageClick
);

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  openEditForm();
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
  editFormValidator.toggleButtonState();
  editFormPopup.open();
}

function submitEditProfile(inputValues) {
  editFormPopup.renderLoading(true);
  return api
    .editUserInfo(inputValues.title, inputValues.description)
    .then(() => {
      userInfo.setUserInfo(inputValues.title, inputValues.description);
      editFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editFormPopup.renderLoading(false, "Save");
    });
}

api
  .getApiInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    cardSection = new Section(
      { items: userCards, renderer: renderCard },
      containerSelectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function openAddForm() {
  addFormPopup.open();
  addFormValidator.toggleButtonState();
}

function submitAddCard(data) {
  renderCard({ name: data.title, link: data.link });
}

function renderCard(data) {
  const card = createCard(data);
  cardSection.addItem(card.getView());
}

function createCard(item) {
  const cardElement = new Card(
    item,
    containerSelectors.cardTemplate,
    handleImageClick
  ).getView();
  return cardElement;
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
