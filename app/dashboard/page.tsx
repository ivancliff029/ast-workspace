"use client"
import React from 'react';
import { ClipboardList, Trophy, MoreVertical, Clock3, Hourglass, ChartSpline } from 'lucide-react';
import Image from 'next/image';
import Money from "../../components/icons/Money"
import TaskComplete from "../../components/icons/TaskComplete"
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Extract name from user email or metadata
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
          <p className="text-lg text-gray-400">Start your day by managing your tasks or getting one</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
            Claim Task
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition">
            Submit Task
          </button>
        </div>
      </div>

      {/* Task Statistics, Rewards, Productivity, and Leaderboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Tasks */}
        <div className="bg-gradient-to-tl from-[#040632] to-[#7D81EC] rounded-lg p-4 flex flex-col justify-between items-center">
          <h3 className="text-2xl font-semibold mb-1 self-center">Available Task</h3>
          <div className='flex flex-row mx-4 items-center space-x-2'>
            <ClipboardList size={24} />
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>

        {/* Claimed Tasks */}
        <div className="bg-gradient-to-tl from-[#320404] to-[#ECCD7D] rounded-lg p-4 flex flex-col justify-between items-center">
          <h3 className="text-2xl font-semibold mb-1 self-center">Claimed Tasks</h3>
          <div className='flex flex-row mx-4 items-center space-x-2'>
            <Hourglass size={30}/>
            <p className="text-2xl font-bold">4</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-tl from-[#053204] to-[#7DEC9C] rounded-lg p-4 flex flex-col justify-between items-center">
          <h3 className="text-2xl font-semibold mb-1 self-center">Completed Tasks</h3>
          <div className='flex flex-row mx-4 items-center space-x-2'>
            <TaskComplete width={30} height={30} />
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
        
        {/* Leaderboard */}
        <div className="bg-[#1A1D21] rounded-lg py-4 sm:row-span-2 flex flex-col border-2 border-[#363A3D]">
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold ml-4">Leader Board</h3>
            <Trophy className="ml-4" size={30} />
          </div>
          <span className="text-xs text-gray-400 mb-4 ml-4">Top performers this month</span>
          <div className="">
            {[
              { name: 'John Doe', time: '5 hours ago', rank: 1 },
              { name: 'Jane Smith', time: '8 hours ago', rank: 2 },
              { name: 'Mike Johnson', time: '1 day ago', rank: 3 },
              { name: 'Sarah Williams', time: '2 days ago', rank: 4 }
            ].map((user, index) => (
              <div key={index} className="flex items-center odd:bg-[#0D0F10] py-2 px-4">
                <Image 
                  src="/img/ivan.jpg" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 rounded-full mr-2" 
                  alt={user.name} 
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.time}</p>
                </div>
                <span className="text-sm font-semibold">{user.rank}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 mx-2">
            <button className="bg-green-700 text-white p-3 rounded text-xs w-full mt-2 hover:bg-green-800 transition">
              View More
            </button>
          </div>
        </div>

        {/* Rewards Summary */}
        <div className="bg-[#0D0F10] rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Rewards Summary</h3>
          <div className="mb-3 flex items-center justify-between">
            <div className='flex flex-row items-center'>
              <Money width={24} height={24} className="text-green-500" />
              <p className="text-[14px] text-gray-400 ml-4">Earned</p>
            </div>
            <p className="text-[14px] font-bold text-green-500">USD 250,000</p>
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className='flex flex-row items-center'>
              <Clock3 className="text-yellow-500"/>
              <p className="text-[14px] text-gray-400 ml-4">Pending</p>
            </div>
            <p className="text-[14px] font-bold text-yellow-500">UGX 56,000</p>
          </div>
          <button className="bg-green-600 text-white p-3 rounded text-xs w-full my-2 hover:bg-green-700 transition">
            Withdraw Money
          </button>
        </div>

        {/* Productivity */}
        <div className="bg-[#0D0F10] rounded-lg p-4 sm:col-span-2 lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <ChartSpline size={16}/>
              <h3 className="text-sm font-semibold">Productivity</h3>
            </div>
            <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="flex justify-center items-center h-32">
            {/* Productivity chart */}
            <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex items-center justify-center">
              <div className="w-18 h-18 rounded-full border-4 border-blue-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-green-500"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></div>
              <span>Quality</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <span>Speed</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span>Accuracy</span>
            </div>
          </div>
          <button className="bg-gray-700 text-white px-3 py-1 rounded text-xs w-full mt-3 hover:bg-gray-600 transition">
            View More
          </button>
        </div>
      </div>

      {/* Tasks Progress */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Tasks Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Updating mobile App',
              description: 'Implement new features in react native',
              priority: 'Very High',
              priorityColor: 'text-red-500',
              deadline: '15/07/2024',
              progress: 75
            },
            {
              title: 'Design Landing Page',
              description: 'Create modern UI/UX for landing page',
              priority: 'High',
              priorityColor: 'text-orange-500',
              deadline: '20/07/2024',
              progress: 45
            },
            {
              title: 'API Integration',
              description: 'Connect frontend with backend services',
              priority: 'Medium',
              priorityColor: 'text-yellow-500',
              deadline: '25/07/2024',
              progress: 30
            }
          ].map((task, index) => (
            <div key={index} className="bg-indigo-900 rounded-lg p-3 flex flex-row justify-between px-8">
              <div>
                <h4 className="text-xl font-semibold mb-1">{task.title}</h4>
                <p className="text-xs text-gray-400 mb-2">{task.description}...</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs">Priority:</span>
                  <span className={`text-xs ${task.priorityColor}`}>{task.priority}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs">Deadline:</span>
                  <span className="text-xs text-red-500">{task.deadline}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4A5568"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4C51BF"
                        strokeWidth="3"
                        strokeDasharray={`${task.progress}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-semibold">{task.progress}%</span>
                    </div>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white px-2 py-1 rounded text-xs w-full hover:bg-indigo-700 transition">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;