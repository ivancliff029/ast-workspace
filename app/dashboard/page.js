"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardList, Trophy, MoreVertical, Clock3, Hourglass, ChartSpline, CalendarDays, Award, Zap } from 'lucide-react';
import Image from 'next/image';
import Money from "../../components/icons/Money"; // Ensure path is correct
import TaskComplete from "../../components/icons/TaskComplete"; // Ensure path is correct
import { useAuth } from '@/context/AuthContext';
import { supabase } from '../../lib/supabaseClient'; // Import Supabase client
import { useRouter } from 'next/navigation'; // Import useRouter

const Dashboard = () => {
  const { user } = useAuth(); // User from AuthContext
  const router = useRouter();

  const [availableTasksCount, setAvailableTasksCount] = useState(0);
  const [claimedTasksCount, setClaimedTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRewardPoints, setUserRewardPoints] = useState(0); // For rewards summary
  const [tasksInProgress, setTasksInProgress] = useState([]); // For Tasks Progress section
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract name from user email or metadata
  const userName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User';

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch Task Counts
      const { count: availableCount, error: availError } = await supabase
        .from('tasks')
        .select('task_id', { count: 'exact' })
        .eq('status', 'available')
        .eq('is_public', true); // Assuming only public tasks are available to claim

      if (availError) throw availError;
      setAvailableTasksCount(availableCount);

      const { count: claimedCount, error: claimedError } = await supabase
        .from('tasks')
        .select('task_id', { count: 'exact' })
        .eq('status', 'claimed')
        .eq('user_id', user?.id); // Tasks claimed by the current user

      if (claimedError) throw claimedError;
      setClaimedTasksCount(claimedCount);

      const { count: completedCount, error: completedError } = await supabase
        .from('tasks')
        .select('task_id', { count: 'exact' })
        .eq('status', 'completed')
        .eq('user_id', user?.id); // Tasks completed by the current user

      if (completedError) throw completedError;
      setCompletedTasksCount(completedCount);

      // 2. Fetch Leaderboard (Top 5 users by completed tasks)
      const { data: leaderboardData, error: leaderboardError } = await supabase
        .from('tasks')
        .select(`
          user_id,
          employees (first_name, last_name)
        `)
        .eq('status', 'completed')
        .not('user_id', 'is', null); // Ensure user_id is not null

      if (leaderboardError) throw leaderboardError;

      // Group by user_id and count completed tasks
      const userCompletedCounts = leaderboardData.reduce((acc, task) => {
        const userId = task.user_id;
        if (userId) {
          acc[userId] = acc[userId] || {
            name: task.employees ? `${task.employees.first_name} ${task.employees.last_name}` : 'Unknown',
            count: 0,
          };
          acc[userId].count++;
        }
        return acc;
      }, {});

      // Sort and pick top performers
      const sortedLeaderboard = Object.values(userCompletedCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5) // Top 5
        .map((entry, index) => ({
          name: entry.name,
          completedTasks: entry.count,
          rank: index + 1,
          time: 'Just now' // Placeholder, real time would need more complex logic
        }));
      setLeaderboard(sortedLeaderboard);

      // 3. Fetch User Reward Points (Sum of reward_points from completed tasks)
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('tasks')
        .select('reward_points')
        .eq('status', 'completed')
        .eq('user_id', user?.id);

      if (rewardsError) throw rewardsError;

      const totalRewardPoints = rewardsData.reduce((sum, task) => sum + (task.reward_points || 0), 0);
      setUserRewardPoints(totalRewardPoints);

      // 4. Fetch Tasks In Progress (for "Tasks Progress" section)
      const { data: progressTasksData, error: progressTasksError } = await supabase
        .from('tasks')
        .select(`
          task_id,
          title,
          description,
          priority,
          deadline,
          status
        `)
        .eq('user_id', user?.id) // Tasks assigned to/claimed by the current user
        .in('status', ['claimed', 'submitted']); // In progress or awaiting review

      if (progressTasksError) throw progressTasksError;
      setTasksInProgress(progressTasksData.map(task => ({
        ...task,
        progress: Math.floor(Math.random() * 100), // Placeholder: Replace with real progress logic
        priorityColor: task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500',
      })));


    } catch (err) {
      console.error("Error fetching dashboard data:", err.message);
      setError(`Failed to load dashboard data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [user?.id]); // Re-fetch if the user ID changes

  useEffect(() => {
    if (user) { // Only fetch if user is logged in
      fetchDashboardData();
    } else {
      setLoading(false); // If no user, stop loading but don't show an error necessarily
      setError("Please log in to view your dashboard.");
    }
  }, [user, fetchDashboardData]); // Depend on user and fetchDashboardData

  const handleClaimTaskClick = () => {
    router.push('/dashboard/tasks'); // Navigate to the tasks list to claim
  };

  const handleSubmitTaskClick = () => {
    // Implement submission logic or navigate to a task submission page
    alert("Submit Task functionality coming soon!");
  };

  if (loading) {
    return (
      <div className="bg-[#131619] text-gray-300 min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (error && user) { // Show error if there's an issue and user is logged in
    return (
      <div className="bg-[#131619] text-gray-300 min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-red-500 text-lg mb-4">Error: {error}</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition" onClick={fetchDashboardData}>
          Retry
        </button>
      </div>
    );
  }
  
  if (!user) { // Show message if not logged in
    return (
        <div className="bg-[#131619] text-gray-300 min-h-screen flex flex-col items-center justify-center p-8">
            <p className="text-white text-lg mb-4">You need to be logged in to view the dashboard.</p>
            {/* Optional: Add a link to login page */}
        </div>
    );
  }


  return (
    <div className="space-y-6 p-6 bg-[#131619] text-gray-300 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, {userName}</h1>
          <p className="text-lg text-gray-400">Start your day by managing your tasks or getting one</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={handleClaimTaskClick} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
            Claim Task
          </button>
          <button onClick={handleSubmitTaskClick} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition">
            Submit Task
          </button>
        </div>
      </div>

      {/* Task Statistics, Rewards, Productivity, and Leaderboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Tasks */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-4 flex flex-col justify-between items-center text-white border border-gray-600">
          <h3 className="text-xl font-semibold mb-1 self-center">Available Task</h3>
          <div className='flex flex-row mx-4 items-center space-x-2'>
            <ClipboardList size={28} className="text-teal-400" />
            <p className="text-3xl font-bold">{availableTasksCount}</p>
          </div>
        </div>

        {/* Claimed Tasks */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg p-4 flex flex-col justify-between items-center text-white border border-blue-600">
          <h3 className="text-xl font-semibold mb-1 self-center">Claimed Tasks</h3>
          <div className='flex flex-row mx-4 items-center space-x-2'>
            <Hourglass size={28} className="text-yellow-400"/>
            <p className="text-3xl font-bold">{claimedTasksCount}</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-lg p-4 flex flex-col justify-between items-center text-white border border-green-600">
          <h3 className="text-xl font-semibold mb-1 self-center">Completed Tasks</h3>
          <div className='flex flex-row mx-4 items-center space-x-2'>
            <TaskComplete width={28} height={28} className="text-green-300" />
            <p className="text-3xl font-bold">{completedTasksCount}</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-[#1A1D21] rounded-lg py-4 flex flex-col border-2 border-[#363A3D] lg:row-span-2"> {/* Added lg:row-span-2 for larger screens */}
          <div className="flex items-center">
            <h3 className="text-xl font-semibold ml-4 text-white">Leader Board</h3>
            <Trophy className="ml-2 text-yellow-500" size={24} />
          </div>
          <span className="text-xs text-gray-400 mb-4 ml-4">Top performers (completed tasks)</span>
          <div className="flex-1">
            {leaderboard.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">No leaderboard data yet.</p>
            ) : (
              leaderboard.map((user, index) => (
                <div key={user.name + index} className="flex items-center odd:bg-[#0D0F10] py-2 px-4">
                  {/* Placeholder image, replace with user avatars if available */}
                  <Image
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} // Dynamic avatar
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full mr-3 border border-gray-600"
                    alt={user.name}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">Completed: {user.completedTasks} tasks</p>
                  </div>
                  <span className="text-base font-bold text-teal-400">{user.rank}</span>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 mx-2">
            <button className="bg-green-700 text-white p-3 rounded text-sm w-full mt-2 hover:bg-green-800 transition">
              View All Rankings
            </button>
          </div>
        </div>

        {/* Rewards Summary */}
        <div className="bg-[#0D0F10] rounded-lg p-4 border border-[#363A3D]">
          <h3 className="text-xl font-semibold mb-3 text-white">Rewards Summary</h3>
          <div className="mb-3 flex items-center justify-between">
            <div className='flex flex-row items-center'>
              <Money width={28} height={28} className="text-green-500" />
              <p className="text-base text-gray-400 ml-4">Total Earned Points</p>
            </div>
            <p className="text-xl font-bold text-green-500">{userRewardPoints}</p>
          </div>
          {/* <div className="flex items-center justify-between mb-8">
            <div className='flex flex-row items-center'>
              <Clock3 className="text-yellow-500"/>
              <p className="text-base text-gray-400 ml-4">Pending</p>
            </div>
            <p className="text-xl font-bold text-yellow-500">UGX 56,000</p>
          </div> */}
          <button className="bg-green-600 text-white p-3 rounded text-sm w-full my-2 hover:bg-green-700 transition">
            View Reward History
          </button>
        </div>

        {/* Productivity */}
        <div className="bg-[#0D0F10] rounded-lg p-4 sm:col-span-2 border border-[#363A3D]">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <ChartSpline size={20} className="text-blue-400"/>
              <h3 className="text-xl font-semibold text-white">Productivity</h3>
            </div>
            <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="flex justify-center items-center h-32">
            {/* Simple placeholder for productivity chart */}
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#2D3748" strokeWidth="10" />
                    {/* Quality (e.g., 70%) */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#6366F1" strokeWidth="10"
                        strokeDasharray="220 283" strokeDashoffset="-0" />
                    {/* Speed (e.g., 50%) */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#3B82F6" strokeWidth="10"
                        strokeDasharray="110 220" strokeDashoffset="-0" />
                    {/* Accuracy (e.g., 85%) */}
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#10B981" strokeWidth="10"
                        strokeDasharray="133 157" strokeDashoffset="-0" />
                </svg>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
              <span>Quality (70%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Speed (50%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Accuracy (85%)</span>
            </div>
          </div>
          <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm w-full mt-3 hover:bg-gray-600 transition">
            View Detailed Analytics
          </button>
        </div>
      </div>

      {/* Tasks Progress */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-white">Your Tasks Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasksInProgress.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-5">No tasks in progress.</p>
          ) : (
            tasksInProgress.map((task, index) => (
              <div key={task.task_id || index} className="bg-[#1A1D21] rounded-lg p-5 flex flex-row justify-between items-center px-6 border border-[#363A3D]">
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-white">{task.title}</h4>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{task.description || 'No description'}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Priority:</span>
                    <span className={`text-sm ${task.priorityColor}`}>{task.priority}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Deadline:</span>
                    <span className="text-sm text-red-400 flex items-center"><CalendarDays size={14} className="mr-1"/> {task.deadline || 'N/A'}</span>
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0">
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
                          stroke="#4C51BF" // Or a dynamic color based on progress
                          strokeWidth="3"
                          strokeDasharray={`${task.progress}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">{task.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-3 py-1 rounded text-xs w-full hover:bg-indigo-700 transition">
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;