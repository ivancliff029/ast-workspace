'use client'

import React from 'react'
import { LayoutGrid, ClipboardList, Zap, DollarSign, Settings, LogOut, X, Power } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Money from './icons/Money'

const Sidebar =({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean, toggleSidebar: () => void })=> {
  const pathname = usePathname();

  return (
    <aside className={`${isSidebarOpen ? 'block' : 'hidden'} rounded-2xl mx-4 sm:block absolute sm:relative z-10 w-60 h-full  bg-[#0D0F10] p-4 flex flex-col`}>
      <button onClick={toggleSidebar} className="sm:hidden absolute top-4 right-4 text-gray-400 hover:text-white">
        <X size={24} />
      </button>
      <nav className="flex-1 flex flex-col space-y-2 mt-6">
        <Link href="/dashboard" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/dashboard' ? 'bg-gray-700' : 'text-gray-400 hover:bg-gray-700'}`}>
          <LayoutGrid className="mr-3" size={30} />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/tasks" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/dashboard/tasks' ? 'bg-gray-700' : 'text-gray-400 hover:bg-gray-700'}`}>
          <ClipboardList className="mr-3" size={30} />
          <span>Tasks</span>
        </Link>
        <Link href="/integration" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/integration' ? 'bg-gray-700' : 'text-gray-400 hover:bg-gray-700'}`}>
          <Zap className="mr-3" size={30} />
          <span>Integration</span>
        </Link>
        <Link href="/earnings" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/earnings' ? 'bg-gray-700' : 'text-gray-400 hover:bg-gray-700'}`}>
          <Money width={30} height={30}  className="mr-3"/>
          <span>Earnings</span>
        </Link>
      </nav>
      <div className="mt-56 mb-10 space-y-2">
        <Link href="/settings" className={`flex items-center py-2 px-4 rounded-lg ${pathname === '/settings' ? 'bg-gray-700' : 'text-gray-400 hover:bg-gray-700'}`}>
          <Settings className="mr-3" size={30} />
          <span>Settings</span>
        </Link>
        <Link href="/logout" className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded-lg">
          <Power className="mr-3" size={30} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar;