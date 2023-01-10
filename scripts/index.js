let initialCards = [
  (cardOne = {
    name: "Yosemite Valley",
    link: "https://live.staticflickr.com/65535/50970386722_550d19f11b_b.jpg",
  }),
  (cardTwo = {
    name: "Lake Louise",
    link: "https://www.worldatlas.com/r/w1200-q80/upload/b4/2c/95/shutterstock-569741011.jpg",
  }),
  (cardThree = {
    name: "Bald Mountains",
    link: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/bald-mountain-sunset-gina-herbert.jpg",
  }),
  (cardFour = {
    name: "Latemar",
    link: "https://media.istockphoto.com/id/155359110/photo/milky-way-in-the-alps.jpg?s=612x612&w=0&k=20&c=q9pv4VxHGZlm0AJRoQMIUjtnPh2RLXmm_MWxya1nq4Q=",
  }),
  (cardFive = {
    name: "Vanoise National Park",
    link: "https://montblanctreks.com/media/pages/blog/hiking-the-vanoise-national-park/9d3c53526c-1626794965/vanise-at-sunrise-1920x-q40.png",
  }),
  (cardSix = {
    name: "Lago di Braies",
    link: "https://expertvagabond.com/wp-content/uploads/lago-di-braies-italy-guide.jpg",
  }),
];

/* Elements */

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const titleInput = document.querySelector("#profile-title-input");

const descriptionInput = document.querySelector("#profile-description-input");

const form = document.querySelector(".modal__container-form");

const closeButton = document.querySelector(".modal__close-button");

const editButton = document.querySelector(".profile__edit-button");

const modalContainer = document.querySelector(".modal__container");

const formSaveButton = document.querySelector(".form__save-button");

const cardsList = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Functions */

function closeModal() {
  modalContainer.classList.remove("modal_opened");
}

function getCardElement(data) {
  console.log(data);
}

initialCards.forEach((data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  document.write(cardElement);
  console.log(cardElement);
  cardsList.append(cardElement);
});

/* event listeners */

editButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  modalContainer.classList.add("modal_opened");
});

closeButton.addEventListener("click", closeModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal();
});
