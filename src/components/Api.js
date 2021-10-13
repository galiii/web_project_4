class Api {
  constructor({ baseUrl, groupId, authorization }) {
    // constructor body
    this._url = baseUrl;
    this._groupId = groupId;
    this._token = authorization;
  }

  test() {
    console.log(
      `url: ${this._url} and token ${this._token} and groupId ${this._groupId}`
    );
  }

  _handleResponse(res){
    console.log("hello response api", res);
    // if the server returns an error, reject the promise
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };

  getAllInformation = () => {
    return Promise.all([this.getUserInformation(), this.getCardList()]);
  }

  // 1. Loading User Information from the Server
  getUserInformation = () => {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  };

  //2. Loading Cards from the Server
  getCardList = () => {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  };

  // other methods for working with the API

  /* Card Methods */
  //4. Adding a New Card
  addCard = ({ name, link }) => {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse(res));
  };

  //7. Deleting a Card
  deleteCard = (cardId) => {
    return fetch(`${this._url}/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse(res));
  };


  //8. Adding and Removing Likes
  likeCard = (cardId) => {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse(res));
  }

  likeCard = (cardId) => {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse(res));
  }

  //3. Editing the Profile
  editUserInfo = ({ name, job }) => {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about: job,
      }),
    }).then(this._handleResponse(res));
  };

  //9. Updating Profile Picture
  updateUserImage = (avatar) => {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleResponse(res));
  };

}

export const api2 = new Api({
  baseUrl: "https://around.nomoreparties.co/v1",
  groupId: "group-12",
  authorization: "9bc9c0f1-5a8a-40aa-b985-20e7b24d1389",
});
