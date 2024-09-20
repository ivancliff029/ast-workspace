"use client"
import React, { useEffect, useState } from 'react';
import { FileText, Link, Github, Users, GitBranch } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { dummyTasks } from '@/constants';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import TaskDetailsCard from '@/components/TaskDetailsCard';


export default function TaskDetails() {
    const router = useRouter();
  const params = useParams();
  const { id } = params;
  const taskId = Number(id);
  const [selectedTask, setSelectedTask] = useState<{
    id: number;
    title: string;
    description: string;
    creator: string;
    createdAt: string;
    dueDate: string;
    reward: string;
    complexity: string;
  } | null>(null);

  useEffect(() => {
    const fetchTask = () => {
      const foundTask = dummyTasks.find((task) => task.id === taskId);
      setSelectedTask(foundTask || null);
    };

    if (id) {
      fetchTask();
    }
  }, [id]);



  return (
    <div className="bg-[#131619] text-white min-h-screen flex">
      <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Task Details</h1>
            <p className="text-muted-foreground">View and manage task information</p>
          </div>
          <Button onClick={() => router.push('/dashboard/tasks')} className='flex items-center justify-center border border-green-600 text-green-600 rounded p-2 bg-transparent hover:text-white hover:bg-green-600' >
            ← Back to Tasks
          </Button>
        </div>


        {selectedTask && ( // Render only if selectedTask is not null
          <TaskDetailsCard creator={selectedTask.creator} createdAt={selectedTask.createdAt} title={selectedTask.title} description={selectedTask.description} dueDate={selectedTask.dueDate} reward={selectedTask.reward} complexity={selectedTask.complexity} id={selectedTask.id} />
        )}
      </main>
    </div>
  );
}

