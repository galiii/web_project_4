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
    const { name, job } = data;
   const avatar = data.avatar;
    this._userName.textContent = name;
    this._userJob.textContent = job;

    this._userImage.src = avatar;
    console.log("hello",data)
    this._userImage.alt = "some check";
  };
}
