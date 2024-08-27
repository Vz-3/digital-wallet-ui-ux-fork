const BASE_URL = 'http://localhost:3000/api/';
let DEFAULT_STRIPE_TEST_CARD = 'pm_card_visa';

/*
pm_card_visa_debit
pm_card_mastercard
pm_card_amex
pm_card_discover
pm_card_jcb
*/
let token = localStorage.token || null;

interface IProfile {
  firstName: string;
  lastName: string;
  email: string;
}

let profile: IProfile = localStorage.profile || {
  firstName: '',
  lastName: '',
  email: '',
};

export async function changeTestCard() {
  if (DEFAULT_STRIPE_TEST_CARD === 'pm_card_visa') {
    DEFAULT_STRIPE_TEST_CARD = 'pm_card_mastercard';
  } else if (DEFAULT_STRIPE_TEST_CARD === 'pm_card_mastercard') {
    DEFAULT_STRIPE_TEST_CARD = 'pm_card_amex';
  } else if (DEFAULT_STRIPE_TEST_CARD === 'pm_card_amex') {
    DEFAULT_STRIPE_TEST_CARD = 'pm_card_discover';
  } else if (DEFAULT_STRIPE_TEST_CARD === 'pm_card_discover') {
    DEFAULT_STRIPE_TEST_CARD = 'pm_card_jcb';
  } else if (DEFAULT_STRIPE_TEST_CARD === 'pm_card_jcb') {
    DEFAULT_STRIPE_TEST_CARD = 'pm_card_visa_debit';
  } else {
    DEFAULT_STRIPE_TEST_CARD = 'pm_card_visa_debit';
  }
  console.log(
    'Default test card updated to: ' + DEFAULT_STRIPE_TEST_CARD
  );
}

export async function updateToken(newToken: string) {
  if (localStorage.token) {
    console.log('Removing old token');
    localStorage.removeItem('token');
  }
  localStorage.setItem('token', newToken);
  token = newToken;
  console.log('Token updated to: ' + newToken);
}

export async function storeProfile(data: IProfile) {
  profile = data;
  localStorage.setItem('profile', JSON.stringify(data));
}

export async function getProfile(): Promise<IProfile> {
  const storedProfile = localStorage.getItem('profile');
  console.log(profile);
  if (storedProfile) {
    return JSON.parse(storedProfile) as IProfile;
  } else {
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
  }
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

export async function uploadKycDocumentAPI(data: FormData) {
  return fetch(`${BASE_URL}kyc/upload-document`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
}

export async function createWalletAPI() {
  return fetch(`${BASE_URL}wallet/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initialBalance: 0 }),
  });
}

export async function kycStatusAPI() {
  return fetch(`${BASE_URL}kyc/status`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addPaymentMethodAPI() {
  return fetch(`${BASE_URL}wallet/add-payment-method`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paymentMethodId: `${DEFAULT_STRIPE_TEST_CARD}`,
    }),
  });
}

export async function deletePaymentMethodAPI() {
  return fetch(
    `${BASE_URL}wallet/payment-methods/${DEFAULT_STRIPE_TEST_CARD}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function listPaymentMethodsAPI() {
  return fetch(`${BASE_URL}wallet/payment-methods`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function depositAPI(amount: number) {
  return fetch(`${BASE_URL}wallet/deposit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount,
      paymentMethodId: `${DEFAULT_STRIPE_TEST_CARD}`,
    }),
  });
}

export async function transferAPI(toUserId: string, amount: number) {
  return fetch(`${BASE_URL}wallet/transfer`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      toUserId: toUserId,
      amount: amount,
    }),
  });
}

export async function getTransactionsAPI() {
  return fetch(`${BASE_URL}wallet/transactions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function generateQRCodeAPI(amount: number) {
  return fetch(`${BASE_URL}wallet/generate-qr`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: amount }),
  });
}

export async function logout() {
  localStorage.removeItem('token');
  token = null;
}
