"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import TaskDetailsCard from '@/components/TaskDetailsCard'; // Your TaskDetailsCard component

// Import your Supabase client
import { supabase } from '../../../../lib/supabaseClient';

export default function TaskDetails() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // The 'id' from the URL will be the task_id (UUID string)
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        setLoading(false); // Stop loading if no ID
        setError("No task ID provided.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('tasks')
          .select(`
            task_id,
            created_at,
            title,
            priority,
            complexity,
            description,
            deadline,
            requirements,
            milestones,
            tags,
            reward_points,
            github_repo_url,
            branch,
            allow_collaboration,
            is_public,
            employees (first_name, last_name)
          `)
          .eq('task_id', id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setSelectedTask({
            task_id: data.task_id,
            title: data.title,
            description: data.description,
            creator: data.employees ? `${data.employees.first_name} ${data.employees.last_name}` : 'Unknown Creator',
            createdAt: data.created_at,
            dueDate: data.deadline,
            rewardPoints: data.reward_points, // Renamed to clearly separate from formatted string
            complexity: data.complexity,
            priority: data.priority, // Added priority
            requirements: data.requirements,
            milestones: data.milestones,
            tags: data.tags,
            githubRepoUrl: data.github_repo_url,
            branch: data.branch,
            allowCollaboration: data.allow_collaboration,
            isPublic: data.is_public,
          });
        } else {
          setSelectedTask(null); // Task not found
        }
      } catch (err) {
        console.error("Error fetching task details:", err.message);
        setError(`Failed to load task: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]); // Re-run effect if the ID changes

  if (loading) {
    return (
      <div className="bg-[#131619] text-gray-300 min-h-screen flex items-center justify-center p-8">
        <p className="text-white text-lg">Loading task details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#131619] text-gray-300 min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-red-500 text-lg mb-4">Error: {error}</p>
        <Button onClick={() => router.push('/dashboard/tasks')} className='flex items-center justify-center border border-green-600 text-green-600 rounded p-2 bg-transparent hover:text-white hover:bg-green-600' >
            ← Back to Tasks
        </Button>
      </div>
    );
  }

  if (!selectedTask) {
    return (
      <div className="bg-[#131619] text-gray-300 min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-white text-lg mb-4">Task not found.</p>
        <Button onClick={() => router.push('/dashboard/tasks')} className='flex items-center justify-center border border-green-600 text-green-600 rounded p-2 bg-transparent hover:text-white hover:bg-green-600' >
            ← Back to Tasks
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#131619] text-gray-300 min-h-screen flex justify-center p-8">
      <main className="flex-1 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-white">Task Details</h1>
            <p className="text-gray-400">View and manage task information</p>
          </div>
          <Button onClick={() => router.push('/dashboard/tasks')} className='flex items-center justify-center border border-green-600 text-green-600 rounded p-2 bg-transparent hover:text-white hover:bg-green-600' >
            ← Back to Tasks
          </Button>
        </div>

        {selectedTask && (
          <TaskDetailsCard
            id={selectedTask.task_id} // Use task_id from the database
            title={selectedTask.title}
            description={selectedTask.description}
            creator={selectedTask.creator}
            createdAt={selectedTask.createdAt}
            dueDate={selectedTask.dueDate}
            rewardPoints={selectedTask.rewardPoints} // Pass as number
            complexity={selectedTask.complexity}
            priority={selectedTask.priority}
            requirements={selectedTask.requirements}
            milestones={selectedTask.milestones}
            tags={selectedTask.tags}
            githubRepoUrl={selectedTask.githubRepoUrl}
            branch={selectedTask.branch}
            allowCollaboration={selectedTask.allowCollaboration}
            isPublic={selectedTask.isPublic}
          />
        )}
      </main>
    </div>
  );
}