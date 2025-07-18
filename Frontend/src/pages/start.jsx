import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Background image takes full page except for the bottom section */}
      <div className='flex-1 w-full relative'>
        <img
          className='absolute top-4 left-4 w-12 sm:w-16 z-10 drop-shadow-lg bg-white rounded-full p-1 sm:p-2'
          src="https://th.bing.com/th/id/R.054c892e7648beb2531c44003051c0b1?rik=HAZ2hA6yyDF10w&pid=ImgRaw&r=0"
          alt="Uber Logo"
        />
        <img
          className='absolute inset-0 w-full h-full object-cover rounded-none sm:rounded-b-3xl'
          style={{ minHeight: '40vh', maxHeight: '100vh' }}
          src="https://media.istockphoto.com/id/2195849508/photo/potsdamer-platz-at-sunet.webp?a=1&b=1&s=612x612&w=0&k=20&c=HiSSXNOL5Q0e4HJuqNAm5AJ6uFXHdt8Htj9HHMVg_7c="
          alt="Uber background"
        />
      </div>
      {/* Get started section full width at the bottom */}
      <div className='w-full bg-white px-2 sm:px-0 py-6 sm:py-8 rounded-t-2xl sm:rounded-t-3xl shadow-lg flex flex-col items-center mt-[-16px] sm:mt-[-24px]'>
        <h2 className='mb-2 sm:mb-3 text-lg sm:text-xl font-semibold w-full text-center'>Get started With Uber</h2>
        <Link
          to="/user-login"
          className='bg-black text-white w-full sm:w-11/12 max-w-md mx-auto px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-gray-800 transition text-base sm:text-lg text-center no-underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50'
        >
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Home