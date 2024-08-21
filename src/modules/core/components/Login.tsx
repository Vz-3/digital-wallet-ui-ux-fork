import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { ECoreStyles } from '../styles/styleIndex';
import { loginUserAPI } from '../services/apiService';
import { updateToken } from '../services/apiAuthService';
// can be placed on a shared/commons folder.
interface ILoginProp {
  onLogin: () => void;
}

function Login({ onLogin }: ILoginProp) {
  // React components should be capitalized first.

  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');
  const navigate = useNavigate(); // for routing.

  const fooBarMessage = "Don't have an account?";

  const handleLoginSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    console.log('Submitting form...');
    event.preventDefault();
    /*
    Insert API call here to verify credentials.
    */
    try {
      const response = await loginUserAPI({
        email: loginEmail,
        password: loginPassword,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error('Invalid credentials! ' + data.error);
      }
      console.log(data.token);

      updateToken(data.token);

      onLogin();

      console.log(`Logged in as ${loginEmail} at ${Date.now()}`);
      navigate('/dashboard');
    } catch (error) {
      alert(`${error}`);
    }
  };

  // if the return statement is not a one-liner, it should be enclosed in parentheses.
  return (
    <>
      <div className={ECoreStyles.CONTAINER}>
        <div className={ECoreStyles.FORM_CONTAINER}>
          <h2 className={ECoreStyles.TITLE}> Login to Cgash</h2>
          <form
            onSubmit={handleLoginSubmit}
            className={ECoreStyles.FORM}
          >
            <div>
              <label
                htmlFor="loginEmail"
                className={ECoreStyles.LABEL}
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
                className={ECoreStyles.INPUT}
                required
              />
            </div>
            <div>
              <label
                htmlFor="loginPassword"
                className={ECoreStyles.LABEL}
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
                className={ECoreStyles.INPUT}
                required
              />
            </div>
            <button type="submit" className={ECoreStyles.BUTTON}>
              Log In
            </button>
          </form>
          <p className={ECoreStyles.PARAGRAPH}>
            {fooBarMessage}{' '}
            <Link to="/register" className={ECoreStyles.LINK}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
