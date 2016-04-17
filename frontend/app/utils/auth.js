export const login = (username, password) => {

  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(response => response.json())
  .then(obj => {
    localStorage.setItem('loggedIn', true);
  });
};

export const loggedIn = () => localStorage.getItem('loggedIn') !== null;

export const logOut = () => {
  localStorage.removeItem('loggedIn');
  location.href = '/logout';
};