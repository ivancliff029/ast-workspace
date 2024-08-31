import React from 'react';
import { FaCheck, FaEllipsisH, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
  onTakeTask: (taskId: number) => void;
  onViewDetails: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onTakeTask, 
  onViewDetails, 
  onEditTask, 
  onDeleteTask 
}) => {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <button className="text-gray-500 dark:text-gray-400">
          <FaEllipsisH />
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => onTakeTask(task.id)}
          className="flex items-center text-green-500 dark:text-green-400"
        >
          <FaCheck className="mr-2" /> Take
        </button>
        <button
          onClick={() => onViewDetails(task.id)}
          className="flex items-center text-blue-500 dark:text-blue-400"
        >
          <FaEye className="mr-2" /> View
        </button>
        <button
          onClick={() => onEditTask(task.id)}
          className="flex items-center text-yellow-500 dark:text-yellow-400"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="flex items-center text-red-500 dark:text-red-400"
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
