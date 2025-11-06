"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown } from 'lucide-react'; // Removed unused Calendar, Clock, ChevronRight
import Link from 'next/link'; // Keep Link if used for navigation, even if not explicitly in this snippet's current render
import TaskCard from '@/components/TaskCard'; // Assuming TaskCard is adapted for Supabase task data
import { supabase } from '../../../lib/supabaseClient'; // Adjust path if necessary

// No need for interface in JS, but understanding the structure helps

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('complexity');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          employees (first_name, last_name)
        `) // Select all task fields and join with employees to get creator name
        .eq('is_public', true); // Only fetch tasks marked as public

      // Add search functionality
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Default order, client-side sorting will handle complexity
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform data to match TaskCard expectations, and include creator name
      const fetchedTasks = data.map((task) => ({
        task_id: task.task_id,
        created_at: task.created_at,
        user_id: task.user_id,
        title: task.title,
        priority: task.priority,
        complexity: task.complexity,
        description: task.description,
        deadline: task.deadline,
        reward_points: task.reward_points,
        creator: task.employees ? `${task.employees.first_name} ${task.employees.last_name}` : 'Unknown Creator',
        // ... other fields if needed by TaskCard
      }));

      // Client-side sort for 'complexity', 'reward', and 'dueDate'
      let sortedTasks = [...fetchedTasks]; // Create a mutable copy

      if (sortBy === 'complexity') {
        const order = { 'Low': 1, 'Medium': 2, 'High': 3 };
        sortedTasks.sort((a, b) => (order[a.complexity] || 99) - (order[b.complexity] || 99)); // Handle undefined complexity
      } else if (sortBy === 'reward') {
        sortedTasks.sort((a, b) => b.reward_points - a.reward_points);
      } else if (sortBy === 'dueDate') {
        sortedTasks.sort((a, b) => {
          const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
          const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
          return dateA - dateB;
        });
      }

      setTasks(sortedTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err.message);
      setError(`Failed to load tasks: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [sortBy, searchTerm]); // Depend on sortBy and searchTerm

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Refetch tasks when sort or search criteria changes

  const handleSort = (criteria) => {
    setSortBy(criteria);
    // The sorting logic is now within fetchTasks due to the dependency array.
    // fetchTasks will be re-called with the new sortBy value.
  };

  if (loading) {
    return <div className="text-center text-white text-lg mt-10">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg mt-10">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-[#131619] text-gray-300 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Task Lists</h1>
        <p className="text-gray-400">Find and claim tasks which are suitable for you ...</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-xl">
          <input
            type="text"
            placeholder="Search task..."
            className="w-full bg-[#1A1D21] text-white rounded-lg pl-10 pr-4 py-2 border-[#363A3D] border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            className="appearance-none bg-[#1A1D21] text-white rounded-lg pl-4 pr-10 py-2 border-[#363A3D] border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="complexity">Sort by: Complexity</option>
            <option value="reward">Sort by: Reward</option>
            <option value="dueDate">Sort by: Due Date</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {tasks.length === 0 ? (
          <p className="text-white col-span-full text-center py-10">No public tasks found.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.task_id}
              id={task.task_id}
              creator={task.creator || 'Unknown'} // Pass the creator name
              createdAt={task.created_at}
              title={task.title}
              description={task.description || 'No description available.'}
              dueDate={task.deadline} // Use 'deadline' from Supabase
              reward={task.reward_points ? `${task.reward_points} pts` : '0 pts'} // Format reward points
              complexity={task.complexity}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;