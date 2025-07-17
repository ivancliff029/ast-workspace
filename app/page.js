"use client"
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Briefcase, Clock, DollarSign, Shield, BrainCircuit } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Redirect to login with email pre-filled
    window.location.href = `/login?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BrainCircuit className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">All Space Technologies</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Employee Login
              </a>
              <a
                href="/dashboard"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">All Space Technologies</span>
                  <span className="block text-indigo-600">Work Management Portal</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Access your assigned tasks, track work progress, and submit completed jobs through our streamlined platform.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Enter Workspace
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Space technology work"
          />
        </div>
      </div>

      {/* Value Proposition */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Work Portal Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Efficient task management for your team
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Briefcase,
                  title: "Task Assignment",
                  description: "Receive and manage your assigned technical tasks with clear specifications."
                },
                {
                  icon: Clock,
                  title: "Time Tracking",
                  description: "Log hours worked on each assignment for accurate productivity metrics."
                },
                {
                  icon: CheckCircle,
                  title: "Job Completion",
                  description: "Submit finished work with verification for quality assurance."
                },
                {
                  icon: DollarSign,
                  title: "Payment Tracking",
                  description: "Monitor your compensation for completed assignments."
                },
                {
                  icon: Shield,
                  title: "Secure System",
                  description: "Enterprise-grade security for all your sensitive work data."
                },
                {
                  icon: BrainCircuit,
                  title: "Technical Focus",
                  description: "Platform optimized for aerospace engineering workflows."
                }
              ].map((feature, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to access your work dashboard?
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Log in to view your current assignments and submit completed work.
          </p>
          <form onSubmit={handleLoginRedirect} className="mt-8 sm:flex max-w-md mx-auto">
            <div className="w-full">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your company email"
                required
              />
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Redirecting...' : 'Continue to Login'}
              </button>
            </div>
          </form>
          <p className="mt-3 text-sm text-indigo-200">
            Having trouble? Contact your <a href="mailto:support@allspacetech.com" className="text-white font-medium underline">system administrator</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <BrainCircuit className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="mt-4 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} All Space Technologies. Internal use only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;