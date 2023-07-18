/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import "./index.css";

import FormValidator from "../Components/FormValidator.js";

import Section from "../Components/Section.js";

import PopupWithImage from "../Components/PopupWithImage.js";

import PopupWithForm from "../Components/PopupWithForm.js";

import PopupWithConfirm from "../Components/PopupWithConfirm.js";

import UserInfo from "../Components/UserInfo.js";

import Card from "../Components/Card.js";

import {
  validationSettings,
  containerSelectors,
  profileImage,
  profileEditButton,
  titleInput,
  descriptionInput,
  profileForm,
  profileTitle,
  profileDescription,
  cardAddButton,
  addCardForm,
  avatarButton,
  avatarForm,
} from "../utils/constants.js";

import Api from "../Components/Api.js";

/* -------------------------------------------------------------------------- */
/*                                  elements                                  */
/* -------------------------------------------------------------------------- */

let userId;
let cardSection;
let cardElement;

/* ----------------------------------- API ---------------------------------- */

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "524dc900-b8ae-4b17-aa07-465dc385d766",
    "Content-type": "application/json",
  },
});

api
  .getApiInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    console.log(userId);
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    cardSection = new Section(
      { items: userCards, renderer: createCard },
      containerSelectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

/* -------------------------------- user info ------------------------------- */

const userInfo = new UserInfo(profileTitle, profileDescription, profileImage);

/* -------------------------------- edit form ------------------------------- */

const editFormPopup = new PopupWithForm(
  containerSelectors.profilePopup,
  (inputValues) => {
    editFormPopup.renderLoading(true);

    return api
      .editUserInfo(inputValues.title, inputValues.description)
      .then(() => {
        userInfo.setUserInfo({
          name: inputValues.title,
          about: inputValues.description,
        });
        editFormPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editFormPopup.renderLoading(false, "Save");
      });
  }
);

/* ----------------------------- add card popup ----------------------------- */

const addCardPopup = new PopupWithForm(
  containerSelectors.addCardPopup,
  (data) => {
    addCardPopup.renderLoading(true);
    api
      .addNewCard(data.title, data.link)
      .then((data) => {
        createCard(data);
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardPopup.renderLoading(false, "Create");
      });
  }
);

const avatarPopup = new PopupWithForm(
  containerSelectors.avatarPopup,
  (data) => {
    avatarPopup.renderLoading(true);
    api
      .updateProfileAvatar(data.link)
      .then((res) => {
        userInfo.setUserInfo(res);
        userInfo.setAvatar(res);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false, "Save");
      });
  }
);

const imagePopup = new PopupWithImage(
  containerSelectors.cardPreviewPopup,
  handleImageClick
);

const deleteCardPopup = new PopupWithConfirm(
  containerSelectors.deleteCardPopup
);

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  openEditForm();
});

cardAddButton.addEventListener("click", () => {
  openAddForm();
});

avatarButton.addEventListener("click", () => openAvatarForm());

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------- edit form ------------------------------- */

function openEditForm() {
  const profileInfo = userInfo.getUserInfo();
  titleInput.value = profileInfo.name;
  descriptionInput.value = profileInfo.job;
  editFormValidator.toggleButtonState();
  editFormPopup.open();
}

/* -------------------------------- add form -------------------------------- */

function openAddForm() {
  addCardPopup.open();
  addFormValidator.toggleButtonState();
}

/* ------------------------------ avatar popup ------------------------------ */

function openAvatarForm() {
  avatarPopup.open();
  avatarFormValidator.toggleButtonState();
}

/* ---------------------------------- cards --------------------------------- */

const createCard = (cardData) => {
  const cardElement = new Card({
    data: cardData,
    userId: userId,
    cardSelector: containerSelectors.cardTemplate,
    handleImageClick,
    handleDeleteClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmit(() => {
        deleteCardPopup.renderLoading(true);
        api
          .deleteUserCard(cardId)
          .then(() => {
            cardElement.handleDeleteCard();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            deleteCardPopup.renderLoading(false, "Save");
          });
      });
    },
    handleLikeClick: (cardId) => {
      if (cardElement.isLiked()) {
        api
          .deleteLikes(cardId)
          .then((res) => {
            cardElement.setLikesCounter(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLikes(cardId)
          .then((res) => {
            cardElement.setLikesCounter(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const newCard = cardElement.getView();
  cardSection.addItem(newCard);
};

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}
/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(validationSettings, profileForm);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);

/* ---------------------------- enable validation --------------------------- */

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/* --------------------------- set event listeners -------------------------- */

editFormPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();
avatarPopup.setEventListeners();
