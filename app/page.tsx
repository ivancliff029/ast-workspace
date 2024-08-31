import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Navbar from './components/Navbar';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/img/all-space-technologies-welcome-banner.jpg")' }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to AST Workspace</h1>
        <p className="text-lg text-white mb-8">Collaborate, Create, and Conquer Your Tasks</p>

        {/* Find Task Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded mb-4">
          Find Task
        </button>

        {/* Signup Buttons */}
        <div className="flex flex-col space-y-4">
          <button className="flex items-center bg-white text-gray-800 font-bold py-2 px-6 rounded hover:bg-gray-100">
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>
          <button className="flex items-center bg-gray-800 text-white font-bold py-2 px-6 rounded hover:bg-gray-900">
            <FaGithub className="mr-2" />
            Sign up with GitHub
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
