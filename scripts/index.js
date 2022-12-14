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
    link: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/bald-mountain-sunset-gina-herbert.jpg",
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

/* Elements */

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const titleInput = document.querySelector("#profile-title-input");

const descriptionInput = document.querySelector("#profile-description-input");

const form = document.querySelector(".modal__container-form");

const closeButton = document.querySelector(".modal__close-button");

const editButton = document.querySelector(".profile__edit-button");

const profileModal = document.querySelector(".modal__container");

const formSaveButton = profileModal.querySelector(".form__save-button");

const cardsList = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Functions */

function closeModal() {
  profileModal.classList.remove("modal_opened");
}

function getCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");
  cardImageEl.src = card.link;
  cardImageEl.alt = card.name;
  cardTitleEl.textContent = card.name;
  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

/* event listeners */

editButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  profileModal.classList.add("modal_opened");
});

closeButton.addEventListener("click", closeModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal();
});
