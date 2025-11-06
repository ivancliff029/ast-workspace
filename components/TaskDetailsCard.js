// src/components/TaskDetailsCard.jsx
import React from 'react';
import { FileText, Link as LinkIcon, Github, Users, GitBranch, CalendarDays, Award, Zap } from 'lucide-react';
import { format } from 'date-fns'; // For formatting dates

export default function TaskDetailsCard({
  id,
  title,
  description,
  creator,
  createdAt,
  dueDate,
  rewardPoints,
  complexity,
  priority,
  requirements,
  milestones,
  tags,
  githubRepoUrl,
  branch,
  allowCollaboration,
  isPublic,
}) {

  // Format dates for display
  const formattedCreatedAt = createdAt ? format(new Date(createdAt), 'PPP') : 'N/A';
  const formattedDueDate = dueDate ? format(new Date(dueDate), 'PPP') : 'N/A';

  return (
    <div className="bg-[#1A1D21] text-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Task Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold text-teal-400">{title}</h2>
          <p className="text-gray-400 text-sm mt-1">Task ID: {id}</p>
        </div>
        {/* Potentially an action button here, e.g., "Claim Task" */}
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
          Claim Task
        </button>
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-700 pt-6">
        <div>
          <p className="text-gray-400 text-sm">Created By</p>
          <p className="text-lg font-medium">{creator}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Created At</p>
          <p className="text-lg font-medium flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-gray-500" /> {formattedCreatedAt}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Due Date</p>
          <p className="text-lg font-medium flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-gray-500" /> {formattedDueDate}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Reward</p>
          <p className="text-lg font-medium flex items-center"><Award className="h-4 w-4 mr-2 text-gray-500" /> {rewardPoints ? `${rewardPoints} Ugx` : '0 pts'}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Complexity</p>
          <p className="text-lg font-medium flex items-center"><Zap className="h-4 w-4 mr-2 text-gray-500" /> {complexity}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Priority</p>
          <p className="text-lg font-medium flex items-center">{priority}</p>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><FileText className="h-5 w-5 mr-2 text-gray-500" /> Description</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>

      {/* Requirements */}
      {requirements && (
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{requirements}</p>
        </div>
      )}

      {/* Milestones */}
      {milestones && (
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold mb-2">Milestones</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{milestones}</p>
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Repository Information */}
      {(githubRepoUrl || branch) && (
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center"><Github className="h-5 w-5 mr-2 text-gray-500" /> Repository Information</h3>
          {githubRepoUrl && (
            <p className="text-gray-300 flex items-center"><LinkIcon className="h-4 w-4 mr-2 text-gray-500" /><a href={githubRepoUrl} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">{githubRepoUrl}</a></p>
          )}
          {branch && (
            <p className="text-gray-300 flex items-center"><GitBranch className="h-4 w-4 mr-2 text-gray-500" /> Branch: {branch}</p>
          )}
        </div>
      )}

      {/* Collaboration and Privacy */}
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><Users className="h-5 w-5 mr-2 text-gray-500" /> Collaboration & Privacy</h3>
        <p className="text-gray-300">Allow Collaboration: {allowCollaboration ? 'Yes' : 'No'}</p>
        <p className="text-gray-300">Public Task: {isPublic ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}