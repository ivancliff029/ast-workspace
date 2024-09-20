"use client"
import React, { useState } from 'react';
import Image from "next/image";
import { Bell, Menu, Moon, Sun } from 'lucide-react';
import logo from "../public/icons/logo.svg";
import { Button } from './ui/button';
import { useTheme } from 'next-themes'


interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar= ({ toggleSidebar }:NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

    //========================================================================
  //Theming the app
  //========================================================================
    // Function to determine the current icon based on the theme
    const renderThemeIcon = () => {
      return theme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )
    }

        // Function to toggle through themes
        const handleThemeToggle = () => {
          if (theme === "dark") {
            setTheme("light")
          } else if (theme === "light") {
            setTheme("system")
          } else {
            setTheme("dark")
          }
        }
    
  return (
    <div>
      <header className="bg-[#0D0F10] p-4 rounded-2xl flex justify-between items-center mx-4 my-2 ">
        <div className="flex items-center">
          <div className="w-20 h-10 flex items-center justify-center text-white font-bold mr-2">
            <Image src={logo} width={300} height={32}  alt="logo" className='object-cover' />
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
            <Image src="/img/ivan.jpg" width={32} height={32} className="w-8 h-8 rounded-full mr-2" alt="User avatar" />
            <span className="text-sm hidden sm:inline">Jimmy</span>
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