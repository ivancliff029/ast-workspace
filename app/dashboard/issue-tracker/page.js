"use client"
import React from 'react'
import { ClipboardList, Trophy, MoreVertical, Clock3 } from 'lucide-react'
import Image from 'next/image'

const IssueTracker = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Issue Tracker</h1>
          <p className="text-lg text-gray-400">Manage and resolve project issues efficiently</p>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Create Issue
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Resolve Issue
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Open Issues */}
        <div className="bg-gradient-to-tl from-[#040632] to-[#7D81EC] rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Open Issues</h3>
            <p className="text-3xl font-bold text-white">24</p>
          </div>
          <ClipboardList size={32} className="text-white" />
        </div>

        {/* In Progress */}
        <div className="bg-gradient-to-tl from-[#320404] to-[#ECCD7D] rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">In Progress</h3>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <Clock3 size={32} className="text-white" />
        </div>

        {/* Resolved */}
        <div className="bg-gradient-to-tl from-[#053204] to-[#7DEC9C] rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Resolved</h3>
            <p className="text-3xl font-bold text-white">36</p>
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#7DEC9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-[#1A1D21] rounded-lg p-6 border-2 border-[#363A3D]">
          <div className="flex items-center mb-4">
            <Trophy size={24} className="text-yellow-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Top Resolvers</h3>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                  {index}
                </div>
                <p className="text-sm font-medium text-white flex-1">Team Member {index}</p>
                <p className="text-sm text-green-400">{index * 5} issues</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-3 bg-[#1A1D21] rounded-lg p-4 border border-[#363A3D]">
          <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select className="w-full bg-[#0D0F10] border border-[#363A3D] text-white rounded-lg px-3 py-2 text-sm">
              <option>All Issues</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
            <select className="w-full bg-[#0D0F10] border border-[#363A3D] text-white rounded-lg px-3 py-2 text-sm">
              <option>All Priorities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Assignee</label>
            <select className="w-full bg-[#0D0F10] border border-[#363A3D] text-white rounded-lg px-3 py-2 text-sm">
              <option>All Team Members</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Mike Johnson</option>
            </select>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm transition-colors">
            Apply Filters
          </button>
        </div>

        {/* Main Issues Table */}
        <div className="lg:col-span-6 bg-[#1A1D21] rounded-lg p-4 border border-[#363A3D]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Issues</h3>
            <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#363A3D]">
                  <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#363A3D]">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-[#0D0F10] cursor-pointer">
                    <td className="py-4 whitespace-nowrap text-sm font-medium text-white">#{item}23</td>
                    <td className="py-4 whitespace-nowrap text-sm text-gray-300">Issue with login page authentication</td>
                    <td className="py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item % 3 === 0 ? 'bg-green-900 text-green-300' : 
                        item % 2 === 0 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {item % 3 === 0 ? 'Resolved' : item % 2 === 0 ? 'In Progress' : 'Open'}
                      </span>
                    </td>
                    <td className="py-4 whitespace-nowrap text-sm text-gray-300">
                      {item % 3 === 0 ? 'Low' : item % 2 === 0 ? 'High' : 'Critical'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-400">Showing 1 to 5 of 24 issues</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-[#0D0F10] border border-[#363A3D] rounded-lg text-sm text-white">
                Previous
              </button>
              <button className="px-3 py-1 bg-indigo-600 rounded-lg text-sm text-white">
                1
              </button>
              <button className="px-3 py-1 bg-[#0D0F10] border border-[#363A3D] rounded-lg text-sm text-white">
                2
              </button>
              <button className="px-3 py-1 bg-[#0D0F10] border border-[#363A3D] rounded-lg text-sm text-white">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-3 bg-[#1A1D21] rounded-lg p-4 border border-[#363A3D]">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start">
                <div className="relative mt-1">
                  <Image 
                    src="/img/ivan.jpg" 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                    alt="User"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#1A1D21] ${
                    item % 3 === 0 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-white">
                    <span className="font-semibold">User {item}</span> {item % 3 === 0 ? 'resolved' : 'updated'} issue #{item}23
                  </p>
                  <p className="text-xs text-gray-400">{item} hour{item !== 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="text-sm font-semibold text-white mb-3">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0D0F10] p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Avg. Resolution</p>
                <p className="text-lg font-bold text-white">2.4 days</p>
              </div>
              <div className="bg-[#0D0F10] p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Open more than 7 days</p>
                <p className="text-lg font-bold text-red-400">8</p>
              </div>
              <div className="bg-[#0D0F10] p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Unassigned</p>
                <p className="text-lg font-bold text-yellow-400">5</p>
              </div>
              <div className="bg-[#0D0F10] p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Overdue</p>
                <p className="text-lg font-bold text-red-400">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueTracker