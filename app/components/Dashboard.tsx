"use client"
import React, {useState} from 'react';
import { FaTasks, FaFileUpload, FaCheckCircle, FaAward } from 'react-icons/fa';
import TaskSearch from './TaskSearch';
import TaskCard from './TaskCard';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface DashboardProps {
  profilePicUrl: string;
  userName: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Design Homepage', description: 'Create the homepage layout for the website.' },
  { id: 2, title: 'Algorithm Optimization', description: 'Optimize the search algorithm for better performance.' },
  { id: 3, title: 'Database Migration', description: 'Migrate the database to the new server.' },
  // Add more tasks here
];

const handleTakeTask = (taskId: number) => {
  console.log(`Task ${taskId} taken!`);
};

const handleViewDetails = (taskId: number) => {
  console.log(`Viewing details for task ${taskId}.`);
};

const handleEditTask = (taskId: number) => {
  console.log(`Editing task ${taskId}.`);
};

const handleDeleteTask = (taskId: number) => {
  console.log(`Deleting task ${taskId}.`);
};

const Dashboard: React.FC<DashboardProps> = ({ profilePicUrl, userName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center dark:bg-gray-800">
        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
          <h1 className="text-2xl font-bold dark:text-gray-200">
            Workspace Dashboard
          </h1>
        </a>
      <div className="flex items-center space-x-4 relative">
        <span className="text-gray-600 dark:text-gray-400">{userName}</span>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <img
              src={profilePicUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Profile
              </a>
              <a
                href="#logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>

      {/* Task Search */}
      <div className="p-4">
        <TaskSearch tasks={tasks} />
      </div>

      {/* Task Cards */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onTakeTask={handleTakeTask}
              onViewDetails={handleViewDetails}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>

      {/* Main Features */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Find Task */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FaTasks className="text-blue-500 text-2xl" />
          <div>
            <h2 className="text-xl font-bold dark:text-gray-200">Find Task</h2>
            <p className="text-gray-500 dark:text-gray-400">Browse available tasks</p>
          </div>
        </div>

        {/* Submit Work */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FaFileUpload className="text-green-500 text-2xl" />
          <div>
            <h2 className="text-xl font-bold dark:text-gray-200">Submit Work</h2>
            <p className="text-gray-500 dark:text-gray-400">Upload your completed tasks</p>
          </div>
        </div>

        {/* AI Review */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FaCheckCircle className="text-yellow-500 text-2xl" />
          <div>
            <h2 className="text-xl font-bold dark:text-gray-200">AI Review</h2>
            <p className="text-gray-500 dark:text-gray-400">Get your work reviewed by AI</p>
          </div>
        </div>

        {/* Awards */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FaAward className="text-red-500 text-2xl" />
          <div>
            <h2 className="text-xl font-bold dark:text-gray-200">Awards</h2>
            <p className="text-gray-500 dark:text-gray-400">Earn rewards for your work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
