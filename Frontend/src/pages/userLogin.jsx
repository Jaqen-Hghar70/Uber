import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios';

function UserLogin() {
  const navigate = useNavigate();
  const userContextValue = useContext(userDataContext);
  const [user, setUser] = Array.isArray(userContextValue) ? userContextValue : [null, () => {}];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const userData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        setError('Login failed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Login failed.'
      );
      console.error('Login error:', err);
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-4">
      <form onSubmit={handleLogin} className="bg-white px-4 py-8 sm:px-8 sm:py-12 rounded-2xl shadow-2xl flex flex-col gap-6 w-full max-w-md sm:max-w-lg min-h-[420px] sm:min-h-[520px] relative items-center">
        <img
          src="https://th.bing.com/th/id/OIP.NF9pXP4AlXPqSgrCBRhnsQHaHa?rs=1&pid=ImgDetMain"
          alt="User Login"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg object-cover border-4 border-white absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-white"
        />
        <div className="mt-14 sm:mt-16 w-full flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">User Login</h2>
        </div>
        <div className="w-full">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">What's your email</label>
          <input required type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base" />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">Enter Password</label>
          <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base" />
        </div>
        {error && (
          <div className="text-red-500 text-sm w-full text-center">{error}</div>
        )}
        <button className="mt-4 bg-black text-white py-2 sm:py-3 rounded hover:bg-gray-800 transition font-semibold text-base sm:text-lg w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="w-full text-center mt-2">
          <span className="text-gray-600 text-sm sm:text-base">Don't have an account? </span>
          <Link to="/user-signup" className="text-blue-600 hover:underline font-semibold text-sm sm:text-base">Sign up</Link>
        </div>
        <div className="w-full text-center mt-1">
          <span className="text-gray-600 text-sm sm:text-base">Want to drive? </span>
          <Link to="/captain-signup" className="text-blue-600 hover:underline font-semibold text-sm sm:text-base">Sign up as Captain</Link>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;