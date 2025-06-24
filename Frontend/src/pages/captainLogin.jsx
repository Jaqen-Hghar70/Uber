import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/captainContext';

export default function Captainlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );
      if (res.status!=200) throw new Error(res.data.message || 'Login failed');
      setSuccess('Login successful!');
      setCaptain(res.data.captain);
      setEmail('');
      setPassword('');
      navigate('/captain-home');
      localStorage.setItem('captainToken', res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-4"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1459603677915-a62079ffd002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyfGVufDB8fDB8fHww)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#e0e7ef',
        filter: 'brightness(0.97)',
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white px-4 py-8 sm:px-8 sm:py-12 rounded-2xl shadow-2xl flex flex-col gap-6 w-full max-w-md sm:max-w-lg min-h-[420px] sm:min-h-[520px] relative items-center"
      >
        <img
          src="https://th.bing.com/th/id/OIP.NF9pXP4AlXPqSgrCBRhnsQHaHa?rs=1&pid=ImgDetMain"
          alt="Captain Login"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg object-cover border-4 border-white absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-white"
        />
        <div className="mt-14 sm:mt-16 w-full flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Captain Login
          </h2>
        </div>
        <div className="w-full">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
          />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Password
          </label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm w-full text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm w-full text-center">
            {success}
          </div>
        )}
        <button
          className="mt-4 bg-black text-white py-2 sm:py-3 rounded hover:bg-gray-800 transition font-semibold text-base sm:text-lg w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="w-full text-center mt-2">
          <span className="text-gray-600 text-sm sm:text-base">
            Don't have an account?{' '}
          </span>
          <Link
            to="/captain-signup"
            className="text-blue-600 hover:underline font-semibold text-sm sm:text-base"
          >
            Sign up as Captain
          </Link>
        </div>
      </form>
    </div>
  );
}
