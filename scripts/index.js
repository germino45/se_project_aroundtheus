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

const profileSaveButton = profileModal.querySelector("#profile-save-button");

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

/* ----------------------------- Add Card Modal ----------------------------- */

const cardAddButton = document.querySelector("#card-add-button");

const addModal = document.querySelector("#add-modal");

const placeInput = document.querySelector("#place-title-input");

const addCloseButton = document.querySelector("#add-close-button");

const addCardForm = document.querySelector("#add-form");

const addFormFieldset = document.querySelector("#add-form-fieldset");

const addTitleInput = document.querySelector("#place-title-input");

const imageURLInput = document.querySelector("#image-url-input");

const addCreateButton = document.querySelector("#add-create-button");

/* ---------------------------- card image modal ---------------------------- */

const imageModal = document.querySelector("#image-modal");

const imageCloseButton = document.querySelector("#image-close-button");

/* ---------------------------------- Cards --------------------------------- */

const cardsList = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* ---------------------------------- form ---------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalOnRemoteClick(e) {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function getCardView(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector("#card-like-button");
  const deleteButton = cardElement.querySelector("#card-delete-button");

  cardImageEl.src = card.link;
  cardImageEl.alt = card.name;
  cardTitleEl.textContent = card.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_activated");
  });
  deleteButton.addEventListener("click", () => {
    const card = deleteButton.closest(".card");
    card.remove();
  });

  cardImageEl.addEventListener("click", () => {
    const modalImageEl = imageModal.querySelector(".modal__image-picture");
    const modalImageCap = imageModal.querySelector(".modal__image-caption");
    modalImageEl.src = card.link;
    modalImageEl.alt = card.name;
    modalImageCap.textContent = card.name;
    openModal(imageModal);
  });

  return cardElement;
}

initialCards.forEach((card) => {
  const cardView = getCardView(card);
  renderCard(cardView, cardsList);
});

/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------- document -------------------------------- */

/* ------------------------- profile event listeners ------------------------ */

profileEditButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

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
  const title = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({
    name: title,
    link: link,
  });
  renderCard(cardView, cardsList);
  closeModal(addModal);
  addCardForm.reset();
});

/* ----------------------- image modal event listeners ---------------------- */

imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});
