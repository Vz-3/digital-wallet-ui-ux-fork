import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';

interface IRegisterProp {
  onLogin: () => void;
}

enum ERegisterStyles {
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
    <div className={ERegisterStyles.CONTAINER}>
      <div className={ERegisterStyles.FORM_CONTAINER}>
        <h2 className={ERegisterStyles.TITLE}>Register for Cgash</h2>
        <form
          onSubmit={handleSubmit}
          className={ERegisterStyles.FORM}
        >
          <div>
            <label htmlFor="name" className={ERegisterStyles.LABEL}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={ERegisterStyles.INPUT}
            />
          </div>
          <div>
            <label htmlFor="email" className={ERegisterStyles.LABEL}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={ERegisterStyles.INPUT}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className={ERegisterStyles.LABEL}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={ERegisterStyles.INPUT}
            />
          </div>
          <button type="submit" className={ERegisterStyles.BUTTON}>
            Register
          </button>
        </form>
        <p className={ERegisterStyles.PARAGRAPH}>
          Already have an account?{' '}
          <Link to="/_login" className={ERegisterStyles.LINK}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NRegister;
