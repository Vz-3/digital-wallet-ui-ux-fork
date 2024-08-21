import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { ECoreStyles } from '../styles/styleIndex';
import { registerUserAPI } from '../services/apiService';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically make an API call to register the user
    console.log(
      'Registration attempt:',
      firstName,
      lastName,
      email,
      password
    );
    try {
      const response = await registerUserAPI({
        firstName,
        lastName,
        email,
        password,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error('Failed to register user! ' + data.error);
      alert(`${data.message}`);

      navigate('/login');
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <div className={ECoreStyles.CONTAINER}>
      <div className={ECoreStyles.FORM_CONTAINER}>
        <h2 className={ECoreStyles.TITLE}>Register for Cgash</h2>
        <form onSubmit={handleSubmit} className={ECoreStyles.FORM}>
          <div>
            <label htmlFor="fn_name" className={ECoreStyles.LABEL}>
              First Name
            </label>
            <input
              type="text"
              id="fn_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={ECoreStyles.INPUT}
            />
          </div>
          <div>
            <label htmlFor="ln_name" className={ECoreStyles.LABEL}>
              Last Name
            </label>
            <input
              type="text"
              id="ln_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={ECoreStyles.INPUT}
            />
          </div>
          <div>
            <label htmlFor="email" className={ECoreStyles.LABEL}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={ECoreStyles.INPUT}
            />
          </div>
          <div>
            <label htmlFor="password" className={ECoreStyles.LABEL}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={ECoreStyles.INPUT}
            />
          </div>
          <button type="submit" className={ECoreStyles.BUTTON}>
            Register
          </button>
        </form>
        <p className={ECoreStyles.PARAGRAPH}>
          Already have an account?{' '}
          <Link to="/login" className={ECoreStyles.LINK}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
