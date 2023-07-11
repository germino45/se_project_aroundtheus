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
);

const addFormPopup = new PopupWithForm(
  containerSelectors.addCardPopup,
  (data) => {
    addFormPopup.renderLoading(true);
    api
      .addNewCard(data)
      .then((data) => {
        createCard(data);
        addFormPopup.close();
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
  addFormPopup.open();
  addFormValidator.toggleButtonState();
}

/* ------------------------------ avatar popup ------------------------------ */

const avatarPopup = new PopupWithForm(
  containerSelectors.avatarPopup,
  (avatar) => {
    avatarPopup.renderLoading(true);
    api
      .updateProfileAvatar(avatar)
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

avatarButton.addEventListener("click", () => avatarPopup.open());

/* ---------------------------------- cards --------------------------------- */
function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement.getView());
}

const createCard = (data) => {
  const cardElement = new Card({
    data,
    userId,
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
addFormPopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();
avatarPopup.setEventListeners();
