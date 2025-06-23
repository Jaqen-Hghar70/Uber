import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/userContext';

function UserSignup() {
  const navigate = useNavigate();
  const userContextValue = useContext(userDataContext);
  const [user, setUser] = Array.isArray(userContextValue) ? userContextValue : [null, () => {}];
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const newUser = {
      fullName: {
        firstname,
        lastname,
      },
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      console.log('Signup response:', response);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        setSuccess('Signup successful!');
        navigate('/home');
      } else {
        setError('Signup failed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Signup failed.'
      );
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
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
      <div className="absolute inset-0 bg-white bg-opacity-40 pointer-events-none z-0" />
      <form
        onSubmit={handleSignup}
        className="bg-white bg-opacity-90 px-4 py-6 sm:px-6 sm:py-8 rounded-xl shadow-lg flex flex-col gap-5 w-full max-w-xs sm:max-w-sm min-h-[380px] z-10 relative items-center border border-blue-100"
      >
        <img
          src="https://th.bing.com/th/id/OIP.NF9pXP4AlXPqSgrCBRhnsQHaHa?rs=1&pid=ImgDetMain"
          alt="User Signup"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg object-cover border-4 border-white absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-white"
        />
        <div className="mt-14 sm:mt-16 w-full flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            User Signup
          </h2>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">
              First Name
            </label>
            <input
              required
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              minLength={3}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              minLength={3}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </div>
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
            minLength={5}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
            minLength={6}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
          className="mt-4 bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 transition font-semibold text-base sm:text-lg w-full"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="w-full text-center mt-2">
          <span className="text-gray-600 text-sm sm:text-base">
            Already have an account?{' '}
          </span>
          <Link
            to="/user-login"
            className="text-blue-600 hover:underline font-semibold text-sm sm:text-base"
          >
            Login as User
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserSignup;