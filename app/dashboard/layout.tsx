"use client"

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    
    return (
      <AuthProvider>
        <ProtectedRoute>
          <section className="bg-[#131619] text-white min-h-screen flex flex-col">
            <div className="">   
              <Navbar toggleSidebar={toggleSidebar} />
            </div>

            <div className="flex flex-1 relative">
              {/* Sidebar */}
              <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              
              {/* Main Content */}
              <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                {children}
              </main>
            </div>
          </section>
        </ProtectedRoute>
      </AuthProvider>
    )
  }