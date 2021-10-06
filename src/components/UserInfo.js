export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo = () => {
    const name = this._userName.textContent;
    const job = this._userJob.textContent;

    //return { name: this._userName.textContent, job: this._userJob.textContent };
    return { name, job };
  };

  setUserInfo = (data) => {
    const { name, job } = data;
    console.log(data);
    this._userName.textContent = name;
    this._userJob.textContent = job;
  };
}
