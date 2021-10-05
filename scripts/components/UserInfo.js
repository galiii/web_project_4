export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = document.querySelector(".profile__name");
    this._userJob = document.querySelector(".profile__job");
  }

  getUserInfo = () => {
    const name = this._userName.textContent;
    const job= this._userJob.textContent;
    //console.log("BBBBBB",name, job );
    //return { name: this._userName.textContent, job: this._userJob.textContent };
    return {name, job};
  };

  setUserInfo = (data) =>{
   //console.log("123 user info");
   //console.log(data.name);
   //console.log(data.job);
    this._userName.textContext = data.name;
    this._userJob.textContext = data.job;
    console.log(this._userName);
    console.log("user info 1",this._userName.textContext);
    console.log("user info 1",this._userJob.textContext);
  };
}
