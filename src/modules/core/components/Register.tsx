import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { ECoreStyles } from '../styles/styleIndex';
interface IRegisterProp {
  onLogin: () => void;
}

function NRegister({ onLogin }: IRegisterProp) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically make an API call to register the user
    console.log('Registration attempt:', name, email, password);
    onLogin(); // Automatically log in the user after successful registration
    navigate('/dashboard'); // Navigate to dashboard after successful registration
  };

  return (
    <div className={ECoreStyles.CONTAINER}>
      <div className={ECoreStyles.FORM_CONTAINER}>
        <h2 className={ECoreStyles.TITLE}>Register for Cgash</h2>
        <form onSubmit={handleSubmit} className={ECoreStyles.FORM}>
          <div>
            <label htmlFor="name" className={ECoreStyles.LABEL}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default NRegister;
