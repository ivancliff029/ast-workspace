'use client'

import React from 'react'
import { LayoutGrid, ClipboardList, Zap, DollarSign, Settings, X, Power, Code } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Money from './icons/Money' // Assuming this is a custom icon component
import { useRouter } from 'next/navigation' // Import useRouter for redirection
import { supabase } from '../lib/supabaseClient' // Import your Supabase client

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); // Call Supabase signOut function

      if (error) {
        throw error; // Propagate the error for catch block
      }

      router.push('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error.message); // Access error.message for Supabase errors
      // Optionally, show an error message to the user, e.g.:
      // alert('Failed to log out: ' + error.message);
    }
  };

  return (
    <aside className={`${isSidebarOpen ? 'block' : 'hidden'} rounded-2xl mx-4 sm:block absolute sm:relative z-10 w-60 h-full bg-[#0D0F10] p-4 flex flex-col`}>
      <button onClick={toggleSidebar} className="sm:hidden absolute top-4 right-4 text-gray-400 hover:text-white">
        <X size={24} />
      </button>
      <nav className="flex-1 flex flex-col space-y-2 mt-6">
        <Link href="/dashboard" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/dashboard' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
          <LayoutGrid className="mr-3" size={30} />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/tasks" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/dashboard/tasks' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
          <ClipboardList className="mr-3" size={30} />
          <span>Tasks</span>
        </Link>
        <Link href="/dashboard/integration" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/integration' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
          <Zap className="mr-3" size={30} />
          <span>Integration</span>
        </Link>
        <Link href="/dashboard/earnings" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/earnings' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
          <Money width={30} height={30} className="mr-3"/>
          <span>Earnings</span>
        </Link>
        <Link href="/dashboard/issue-tracker" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/dashboard/issue-tracker' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
          <Code width={30} height={30} className="mr-3"/>
          <span>Issue Tracker</span>
        </Link>
      </nav>
      <div className="mt-56 mb-10 space-y-2">
        <Link href="/settings" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/settings' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
          <Settings className="mr-3" size={30} />
          <span>Settings</span>
        </Link>
        {/* Logout button */}
        <button onClick={handleLogout} className="w-full flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg">
          <Power className="mr-3" size={30} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar;