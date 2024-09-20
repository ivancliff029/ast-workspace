"use client"
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskSearchProps {
  tasks: Task[];
}

const TaskSearch: React.FC<TaskSearchProps> = ({ tasks }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Search for Tasks</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded mb-4"
      />
      <ul className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <li
              key={task.id}
              className="p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 rounded-lg"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
            </li>
          ))
        ) : (
          <li className="text-gray-500 dark:text-gray-400">No tasks found</li>
        )}
      </ul>
    </div>
  );
};

export default TaskSearch;
