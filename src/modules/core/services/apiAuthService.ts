const BASE_URL = 'http://localhost:3000/api/';
let token = localStorage.token || null;

export async function updateToken(newToken: string) {
  if (localStorage.token) {
    console.log('Removing old token');
    localStorage.removeItem('token');
  }
  localStorage.setItem('token', newToken);
  token = newToken;
  console.log('Token updated to: ' + newToken);
}

export function checkToken() {
  if (token !== null) console.log('Token exists');
  return token !== null ? true : false;
}

export async function getBalanceAPI() {
  return fetch(`${BASE_URL}wallet/balance`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function logout() {
  localStorage.removeItem('token');
  token = null;
}
