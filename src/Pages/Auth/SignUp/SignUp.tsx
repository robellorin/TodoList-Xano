/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../utils/axiosInstance';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      const payload = { email, password };
      const response = await axiosInstance
        .post('auth/signup', payload)
        .finally(() => setLoading(false));
      const authToken: string = response.data?.authToken;
      const userId: number = response.data?.user_id;
      if (authToken && userId) {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user_id', userId.toString());
        navigate('/tasks');
      } else {
        alert('Email already registered');
      }
    } else {
      alert('One of the input field is empty');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/tasks');
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        <h1>Enter credentials</h1>
        <div>
          <p>Email</p>
          <input
            type={'email'}
            placeholder="Enter email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type={'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <button
          style={{ padding: '5px' }}
          onClick={handleSignUp}
          disabled={loading}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignUp;
