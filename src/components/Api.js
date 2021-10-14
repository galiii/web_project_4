const customFetch = (url, headers) =>
  fetch(url, headers)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    )
    .catch(console.error);

class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  test() {
    console.log(`url: ${this._baseUrl} and token ${this._headers} `);
  }

  getAllInformation = () => {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  };

  // Loading User Information from the Server
  getUserInfo = () => {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  };

  // Loading Cards from the Server
  getInitialCards = () => {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  };

  // other methods for working with the API

  // Adding a New Card
  addCard = (data) => {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  // Deleting a Card
  deleteCard = (cardId) => {
    return customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  };

  // Adding  Likes
  likeCard = (cardId) => {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT"
    });
  };

  // Removing Likes
  dislikeCard = (cardId) => {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE"
    });
  };

  // Editing the Profile
  editProfileUserInfo = ({ name, job }) => {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about: job,
      })
    });
  };

  // Updating Profile Picture
  updateUserImage = (avatar) => {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(avatar),
    });
  };
}

export const api2 = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "9bc9c0f1-5a8a-40aa-b985-20e7b24d1389",
    "Content-Type": "application/json",
  },
});
