export const login = (username, password) => {

  console.log(username);

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
    localStorage.setItem('username', username);
  });
};

export const loggedIn = () => localStorage.getItem('loggedIn') !== null;

export const logOut = () => {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username');
  location.href = '/logout';
};

export const userName = () => localStorage.getItem('username');