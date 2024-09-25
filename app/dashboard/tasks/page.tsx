"use client"
import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { dummyTasks } from '@/constants';
import Link from 'next/link';
import TaskCard from '@/components/TaskCard';



const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [sortBy, setSortBy] = useState('complexity');

  const handleSort = (criteria: 'complexity' | 'reward' | 'dueDate') => {
    setSortBy(criteria);
    const sortedTasks = [...tasks].sort((a, b) => {
      if (criteria === 'complexity') {
        const order: { [key: string]: number } = { 'Low': 1, 'Medium': 2, 'High': 3 };
        return order[a.complexity] - order[b.complexity];
      } else if (criteria === 'reward') {
        return parseInt(b.reward.replace(/\D/g, '')) - parseInt(a.reward.replace(/\D/g, ''));
      } else if (criteria === 'dueDate') {
        return new Date(a.dueDate.split('/').reverse().join('-')).getTime() - new Date(b.dueDate.split('/').reverse().join('-')).getTime();
      }
      return 0;
    });
    setTasks(sortedTasks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Task Lists</h1>
        <p className="text-gray-400">Find and claim tasks which are suitable for you ...</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search task..."
            className="w-full bg-[#1A1D21] text-white rounded-lg pl-10 pr-4 py-2 border-[#363A3D] border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <select 
            className="appearance-none bg-[#1A1D21] text-white rounded-lg pl-4 pr-10 py-2 border-[#363A3D] border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as 'complexity' | 'reward' | 'dueDate')}
          >
            <option value="complexity">Sort by: Complexity</option>
            <option value="reward">Sort by: Reward</option>
            <option value="dueDate">Sort by: Due Date</option>
          </select>
          <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {tasks.map(({id, creator, createdAt, title, description, dueDate,reward, complexity}) => (
            <TaskCard id={id} creator={creator}  createdAt={createdAt} title={title} description={description} dueDate={dueDate} reward={reward} complexity={complexity}/>
        ))}
      </div>
    </div>
  );
};

export default TaskList;