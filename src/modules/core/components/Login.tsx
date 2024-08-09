import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';

// can be placed on a shared/commons folder.
interface ILoginProp {
  onLogin: () => void;
}

// same with this.
enum ELoginStyles {
  CONTAINER = 'min-h-screen flex items-center justify-center bg-gray-100',
  FORM_CONTAINER = 'bg-white p-8 rounded shadow-md w-96',
  TITLE = 'text-2xl font-bold mb-4',
  FORM = 'space-y-4',
  LABEL = 'block text-sm font-medium text-gray-700',
  INPUT = 'mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2',
  BUTTON = 'w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200',
  LINK = 'text-blue-600 hover:underline',
  PARAGRAPH = 'mt-4 text-center',
}

function NLogin({ onLogin }: ILoginProp) {
  // React components should be capitalized first.

  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');
  const navigate = useNavigate(); // for routing.

  const fooBarMessage = "Don't have an account?";

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log('Submitting form...');
    event.preventDefault();
    /*
    Insert API call here to verify credentials.
    */

    onLogin(); // to be removed?
    console.log('Login successful ', Date.now());
    navigate('/_dashboard');
  };

  // if the return statement is not a one-liner, it should be enclosed in parentheses.
  return (
    <>
      <div className={ELoginStyles.CONTAINER}>
        <div className={ELoginStyles.FORM_CONTAINER}>
          <h2 className={ELoginStyles.TITLE}> Login to Cgash</h2>
          <form
            onSubmit={handleLoginSubmit}
            className={ELoginStyles.FORM}
          >
            <div>
              <label
                htmlFor="loginEmail"
                className={ELoginStyles.LABEL}
              >
                Email
              </label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={(inputText) =>
                  setEmail(inputText.target.value)
                }
                className={ELoginStyles.INPUT}
                required
              />
            </div>
            <div>
              <label
                htmlFor="loginPassword"
                className={ELoginStyles.LABEL}
              >
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(inputText) =>
                  setPassword(inputText.target.value)
                }
                className={ELoginStyles.INPUT}
                required
              />
            </div>
            <button type="submit" className={ELoginStyles.BUTTON}>
              Log In
            </button>
          </form>
          <p className={ELoginStyles.PARAGRAPH}>
            {fooBarMessage}{' '}
            <Link to="/_register" className={ELoginStyles.LINK}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default NLogin;
