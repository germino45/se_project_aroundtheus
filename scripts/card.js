export default class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }
}
