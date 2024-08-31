import React from 'react';

interface TaskProps {
  taskName: string;
  assignedTo: string;
  deadline: string;
  status: 'In Progress' | 'Completed' | 'Pending';
}

const TaskComponent: React.FC<TaskProps> = ({ taskName, assignedTo, deadline, status }) => {
  return (
    <div className="task-card bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold text-gray-800">{taskName}</h2>
      <p className="text-gray-600">
        <strong>Assigned To:</strong> {assignedTo}
      </p>
      <p className="text-gray-600">
        <strong>Deadline:</strong> {deadline}
      </p>
      <p className={`status ${status === 'Completed' ? 'text-green-500' : status === 'In Progress' ? 'text-blue-500' : 'text-yellow-500'}`}>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
};

export default TaskComponent;
