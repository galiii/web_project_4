export const customFetch = (url, headers) =>  fetch(url, headers)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`)
    )
    .catch(console.error);
