export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userImageSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userImage = document.querySelector(userImageSelector);
  }

  getUserInfo = () => {
    const name = this._userName.textContent;
    const job = this._userJob.textContent;
    const avatar = this._userImage.src;

    //return { name: this._userName.textContent, job: this._userJob.textContent };
    return { name, job, avatar };
  };

  setUserInfo = (data) => {
    const { name, job, avatar } = data;
    console.log(data);
    this._userName.textContent = name;
    this._userJob.textContent = job;

    this._userImage.src = avatar.src;
    this._userImage.alt = "some check";
  };
}
