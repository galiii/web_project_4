export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo = () => {
    return { name: this._userName.textContent, job: this._userJob.textContent };
  };

  setUserInfo = ({ name, job }) => {
    //const {name, job} = userInfo.getUserInfo();
    this._userName.textContext = name;
    this._userJob.textContext = job;
  };
}
