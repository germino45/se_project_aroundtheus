export default class UserInfo {
  constructor(userName, userJob, avatar) {
    this._userName = userName;
    this._userJob = userJob;
    this._avatar = avatar;
  }

  getUserInfo() {
    return { name: this._userName.textContent, job: this._userJob.textContent };
  }

  getAvatar() {
    return { avatar: this._avatar.src };
  }

  setUserInfo(name, description) {
    this._userName.textContent = name;
    this._userJob.textContent = description;
  }

  setAvatar(value) {
    this._avatar.src = value.avatar;
    this._avatar.alt = value.name;
  }
}
