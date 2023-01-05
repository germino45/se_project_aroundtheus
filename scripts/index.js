let initialCards = [
  (cardOne = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  }),
  (cardTwo = {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  }),
  (cardThree = {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  }),
  (cardFour = {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  }),
  (cardFive = {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  }),
  (cardSix = {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }),
];

const closeButton = document.querySelector(".modal__close-button");
const editButton = document.querySelector(".profile__edit-button");
const modalContainer = document.querySelector(".modal__container");

function openModal() {
  modalContainer.classList.add("modal_opened");
}

function closeModal() {
  modalContainer.classList.remove("modal_opened");
}

editButton.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);
