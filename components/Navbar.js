"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Bell, Menu, Moon, Sun } from 'lucide-react';
import logo from "../public/icons/logo.svg";
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext'; // Import useAuth context
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client

// Define a default avatar URL
const DEFAULT_AVATAR_URL = "https://avatar.iran.liara.run/public/boy";

const Navbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // State to store fetched user profile
  const { user } = useAuth(); // Get user from AuthContext
  const { theme, setTheme } = useTheme();

  // Function to determine the current icon based on the theme
  const renderThemeIcon = () => {
    return theme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    );
  };

  // Function to toggle through themes
  const handleThemeToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  // Fetch user profile data from Supabase
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        // Assuming user.id is the foreign key in your 'employees' table
        const { data, error } = await supabase
          .from('employees')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error.message);
          setUserProfile(null); // Reset profile on error
        } else {
          setUserProfile(data);
        }
      } else {
        setUserProfile(null); // Clear profile if no user is logged in
      }
    };

    fetchUserProfile();
  }, [user]); // Re-run when the user object changes

  // Determine display name and avatar URL
  const displayName = userProfile?.first_name || user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Guest';
  const displayAvatar = userProfile?.avatar_url || DEFAULT_AVATAR_URL;


  return (
    <div>
      <header className="bg-[#0D0F10] p-4 rounded-2xl flex justify-between items-center mx-4 my-2 ">
        <div className="flex items-center">
          <div className="w-20 h-10 flex items-center justify-center text-white font-bold mr-2">
            <a href="/"><Image src={logo} width={300} height={32}  alt="logo" className='object-cover' /></a>
          </div>
          <span className="font-semibold hidden sm:inline">WorkSpace Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handleThemeToggle}>
            {renderThemeIcon()}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Bell className="text-gray-400" size={20} />
          <div className="flex items-center">
            {/* Use dynamically determined avatar */}
            <Image
              src={displayAvatar}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full mr-2"
              alt={`${displayName}'s avatar`}
            />
            {/* Use dynamically determined display name */}
            <span className="text-sm hidden sm:inline">{displayName}</span>
          </div>
        </div>
      </header>
      {/** Mobile Nav */}
      <div className="sm:hidden  p-2">
        <button onClick={toggleSidebar} className="flex items-center justify-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded-lg">
          <Menu className="mr-2" size={20} />
          <span>Menu</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;