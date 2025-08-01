import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/captainContext';

function CaptainSignUp() {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    vehicle: '',
    vehicleType: '',
    capacity: '',
    licenseNumber: '',
    latitude: '',
    longitude: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const submitData = {
        fullName: { firstname: form.firstname, lastname: form.lastname },
        email: form.email,
        password: form.password,
        phone: form.phone,
        vehicle: form.vehicle,
        vehicleType: form.vehicleType,
        capacity: Number(form.capacity),
        licenseNumber: form.licenseNumber,
        location: {
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
        },
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        submitData
      );
      if (res.status !== 201){
        throw new Error('Signup failed');
      }
        console.log('Signup response:', res);
      
      setSuccess('Signup successful!');
      setCaptain(res.data.captain || null);
      localStorage.setItem('captainToken', res.data.token);
      setForm({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        vehicle: '',
        vehicleType: '',
        capacity: '',
        licenseNumber: '',
        latitude: '',
        longitude: '',
      });
      navigate('/captain-home');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1704340142770-b52988e5b6eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8Y2FyfGVufDB8fDB8fHww)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#e0e7ef',
        filter: 'brightness(0.96)',
      }}
    >
      <div className="absolute inset-0  bg-opacity-10 pointer-events-none z-0" />
      <div className="bg-white bg-opacity-60 px-6 py-8 rounded-2xl shadow-2xl flex flex-col w-full max-w-3xl z-10 relative border border-blue-100 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 tracking-tight">
          Captain Sign Up
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
        >
          <div>
            <label
              className="block text-gray-700 mb-1 text-sm"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="First name"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-1 text-sm"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              minLength={3}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Last name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              minLength={5}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-1 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm" htmlFor="vehicle">
              Vehicle
            </label>
            <input
              type="text"
              id="vehicle"
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Vehicle name/model"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-1 text-sm"
              htmlFor="vehicleType"
            >
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
              <option value="">Select type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm" htmlFor="capacity">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              required
              min={1}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Number of seats"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm" htmlFor="licenseNumber">
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={form.licenseNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="License number"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm" htmlFor="latitude">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              required
              step="any"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Latitude"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm" htmlFor="longitude">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              required
              step="any"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Longitude"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
            {error && (
              <div className="text-red-500 text-sm w-full text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm w-full text-center">
                {success}
              </div>
            )}
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-base w-full"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="w-full text-center mt-4">
          <span className="text-gray-600 text-sm">
            Already have an account?{' '}
          </span>
          <Link
            to="/captain-login"
            className="text-blue-600 hover:underline font-semibold text-sm"
          >
            Login as Captain
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignUp;