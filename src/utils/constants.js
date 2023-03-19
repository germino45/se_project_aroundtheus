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
    link: "https://photos.thetrek.co/wp-content/uploads/2022/07/28030930/dsc09105-013725388244148498558.jpeg",
  },
  {
    name: "Lago di Braies",
    link: "https://expertvagabond.com/wp-content/uploads/lago-di-braies-italy-guide.jpg",
  },
];

const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error",
};

const headerImage = document.getElementById("header-logo");

const profileImage = document.getElementById("profile-image");

/* --------------------------------- profile -------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");

const titleInput = document.querySelector("#profile-title-input");

const descriptionInput = document.querySelector("#profile-description-input");

const profileForm = document.querySelector("#profile-form");

const profileCloseButton = document.querySelector("#profile-close-button");

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

/* ----------------------------- Add Card Modal ----------------------------- */

const cardAddButton = document.querySelector("#card-add-button");

const addCardForm = document.querySelector("#add-form");

const containerSelectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  cardPreviewPopup: "#image-modal",
  profilePopup: "#profile-modal",
  addCardPopup: "#add-modal",
};

export {
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
};
