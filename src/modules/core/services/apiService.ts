const BASE_URL = 'http://localhost:3000/api/';

interface IRegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function registerUserAPI(data: IRegisterDTO) {
  return fetch(`${BASE_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function loginUserAPI(
  data: Omit<IRegisterDTO, 'firstName' | 'lastName'>
) {
  return fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
