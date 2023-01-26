/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../utils/axiosInstance';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = async () => {
    setLoading(true);
    const payload = {
      email,
      password,
    };
    await axiosInstance
      .post('auth/login', payload)
      .then((response: any) => {
        const authToken: string = response?.data?.authToken ?? '';
        const userId: number | undefined = response?.data?.user_id;
        if (authToken && authToken.length > 0 && userId) {
          localStorage.setItem('token', authToken);
          localStorage.setItem('user_id', userId.toString());
          navigate('/tasks');
        } else {
          alert('Invalid Credentials');
        }
      })
      .finally(() => setLoading(false));
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
        <button onClick={handleSignIn} disabled={loading}>
          Sign In
        </button>
        <p>Or</p>
        <button onClick={handleSignUp} disabled={loading}>
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignIn;
