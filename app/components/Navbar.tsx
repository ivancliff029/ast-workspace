"use client"
import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold dark:text-gray-900">AST Workspace</h1>

        {/* Menu for larger screens */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
              Tasks
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </Link>
          </li>
        </ul>

        {/* User Profile Icon with Dropdown */}
        <div className="hidden md:flex items-center space-x-4 relative">
          <button onClick={toggleProfile} className="focus:outline-none">
            <FaUserCircle className="text-gray-700 text-2xl" />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-8">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <button onClick={() => {/* Add logout logic here */}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger menu icon for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/tasks" className="text-gray-700 hover:text-gray-900">
                Tasks
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={() => {/* Add logout logic here */}} className="text-gray-700 hover:text-gray-900">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;