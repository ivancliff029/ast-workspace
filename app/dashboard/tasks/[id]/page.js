"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import TaskDetailsCard from '@/components/TaskDetailsCard'; 
import { supabase } from '../../../../lib/supabaseClient'; 

export default function TaskDetails() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isTaskClaimed, setIsTaskClaimed] = useState(false);
  const [claimingLoading, setClaimingLoading] = useState(false);
  const [claimError, setClaimError] = useState(null);

  useEffect(() => {
    const fetchUserAndTask = async () => {
      setLoading(true);
      setError(null);

      // Fetch current authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError.message);
        setError("Failed to load user information.");
        setLoading(false);
        return;
      }
      setUser(userData?.user || null);

      if (!id) {
        setLoading(false);
        setError("No task ID provided.");
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('tasks')
          .select(`
            *,
            employees (id, first_name, last_name),
            task_assignments (id, employee_id)
          `)
          .eq('id', id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setSelectedTask({
            id: data.id,
            title: data.title,
            description: data.description,
            creatorId: data.user_id, // Store creator's ID
            creator: data.employees ? `${data.employees.first_name} ${data.employees.last_name}` : 'Unknown Creator',
            createdAt: data.created_at,
            dueDate: data.deadline,
            rewardPoints: data.reward_points,
            complexity: data.complexity,
            priority: data.priority,
            requirements: data.requirements,
            milestones: data.milestones,
            tags: data.tags,
            githubRepoUrl: data.github_repo_url,
            branch: data.branch,
            allowCollaboration: data.allow_collaboration,
            isPublic: data.is_public,
            status: data.status, // Include task status
            // Check if the current user has claimed this task
            // Ensure task_assignments is an array, even if empty or single
            taskAssignments: data.task_assignments || [],
          });

          // Check if the task is already claimed by anyone, or specifically by the current user
          const claimedByCurrentUser = data.task_assignments?.some(
            (assignment) => assignment.employee_id === userData?.user?.id
          );
          setIsTaskClaimed(!!data.task_assignments?.length || claimedByCurrentUser);
        } else {
          setSelectedTask(null);
        }
      } catch (err) {
        console.error("Error fetching task details:", err.message);
        setError(`Failed to load task: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTask();
  }, [id]); // Re-run effect if the ID changes

  const handleClaimTask = async () => {
    if (!user || !selectedTask) {
      setClaimError("You must be logged in and a task must be selected to claim it.");
      return;
    }

    setClaimingLoading(true);
    setClaimError(null);

    try {
      // 1. Insert into task_assignments table
      const { error: assignError } = await supabase
        .from('task_assignments')
        .insert([
          {
            task_id: selectedTask.id,
            employee_id: user.id,
            status: 'in_progress', // Default status when claimed
          },
        ]);

      if (assignError) {
        // Handle specific error for unique constraint violation (already claimed)
        if (assignError.code === '23505') { // PostgreSQL unique_violation error code
          throw new Error("This task has already been claimed by you or another employee.");
        }
        throw assignError;
      }

      // 2. Update the status of the task in the tasks table
      const { error: updateTaskError } = await supabase
        .from('tasks')
        .update({ status: 'in_progress' })
        .eq('id', selectedTask.id);

      if (updateTaskError) {
        throw updateTaskError;
      }

      // If successful, update the local state to reflect the claim
      setSelectedTask((prev) => ({
        ...prev,
        status: 'in_progress',
        taskAssignments: [...prev.taskAssignments, { employee_id: user.id, status: 'in_progress' }],
      }));
      setIsTaskClaimed(true);
      alert("Task claimed successfully and status updated to 'in_progress'!");
    } catch (err) {
      console.error("Error claiming task:", err.message);
      setClaimError(`Failed to claim task: ${err.message}`);
    } finally {
      setClaimingLoading(false);
    }
  };

  const isCreator = user && selectedTask && user.id === selectedTask.creatorId;
  const isAssigned = selectedTask?.taskAssignments?.some(assignment => assignment.employee_id === user?.id);
  const isAnyUserAssigned = selectedTask?.taskAssignments?.length > 0;
  const canClaim = user && !isCreator && !isAssigned && !isAnyUserAssigned; // Only allow claiming if not creator, not already assigned, and no one else is assigned.

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
          <>
            <TaskDetailsCard
              id={selectedTask.id}
              title={selectedTask.title}
              description={selectedTask.description}
              creator={selectedTask.creator}
              createdAt={selectedTask.createdAt}
              dueDate={selectedTask.dueDate}
              rewardPoints={selectedTask.rewardPoints}
              complexity={selectedTask.complexity}
              priority={selectedTask.priority}
              requirements={selectedTask.requirements}
              milestones={selectedTask.milestones}
              tags={selectedTask.tags}
              githubRepoUrl={selectedTask.githubRepoUrl}
              branch={selectedTask.branch}
              allowCollaboration={selectedTask.allowCollaboration}
              isPublic={selectedTask.isPublic}
              status={selectedTask.status} // Pass status to card
            />

            {claimError && <p className="text-red-500 mt-4 text-center">{claimError}</p>}

            {canClaim && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleClaimTask}
                  disabled={claimingLoading || isTaskClaimed}
                  className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200
                    ${claimingLoading || isTaskClaimed
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                  {claimingLoading ? 'Claiming Task...' : 'Claim Task'}
                </Button>
              </div>
            )}
            {isCreator && (
              <p className="text-center text-gray-400 mt-4">You are the creator of this task.</p>
            )}
            {isAssigned && !isCreator && (
              <p className="text-center text-green-500 mt-4">You have claimed this task!</p>
            )}
            {isAnyUserAssigned && !isCreator && !isAssigned && (
              <p className="text-center text-yellow-500 mt-4">This task has already been claimed by another employee.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}