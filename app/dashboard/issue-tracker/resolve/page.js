"use client"
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ResolveIssuesPage = () => {
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simulate fetching assigned issues (replace with actual API call)
  useEffect(() => {
    const fetchAssignedIssues = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data - replace with your actual API call
      setIssues([
        {
          id: 'ISS-42',
          title: 'Login page fails on mobile devices',
          priority: 'high',
          status: 'in_progress',
          category: 'bug',
          assignedDate: '2023-11-15',
          deadline: '2023-11-22'
        },
        {
          id: 'ISS-38',
          title: 'Dashboard performance issues',
          priority: 'critical',
          status: 'open',
          category: 'performance',
          assignedDate: '2023-11-10',
          deadline: '2023-11-17'
        },
        {
          id: 'ISS-55',
          title: 'User profile image upload fails',
          priority: 'normal',
          status: 'in_progress',
          category: 'bug',
          assignedDate: '2023-11-18',
          deadline: '2023-11-25'
        }
      ]);
      setIsLoading(false);
    };

    fetchAssignedIssues();
  }, []);

  const filteredIssues = issues.filter(issue => {
    if (filter === 'all') return true;
    if (filter === 'open') return issue.status === 'open';
    if (filter === 'in_progress') return issue.status === 'in_progress';
    return true;
  });

  const handleIssueClick = (issueId) => {
    router.push(`/dashboard/issue-tracker/resolve/${issueId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Issues Assigned to You</h1>
          <p className="text-gray-500">{issues.length} issues found</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="all">All Issues</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading your assigned issues...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No issues found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIssues.map((issue) => (
                    <tr 
                      key={issue.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleIssueClick(issue.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {issue.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {issue.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          issue.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          issue.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {issue.status === 'in_progress' ? 'In Progress' : 'Open'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResolveIssuesPage;