"use client"
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, Upload, X, ChevronDown, MessageSquare, Tag, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const ResolveIssueDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const issueId = params.id;
  
  const [issue, setIssue] = useState(null);
  const [resolution, setResolution] = useState('');
  const [status, setStatus] = useState('in_progress');
  const [comment, setComment] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState('');

  // Simulate fetching issue data (replace with actual API call)
  useEffect(() => {
    const fetchIssue = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - replace with your actual API call
      setIssue({
        id: issueId,
        title: 'Login page fails on mobile devices',
        description: 'Users report being unable to log in when accessing from mobile browsers. Error occurs after submitting credentials.',
        priority: 'high',
        category: 'bug',
        reportedBy: 'Jane Smith',
        dateReported: '2023-11-15',
        assignedTo: 'You',
        status: 'in_progress',
        stepsToReproduce: '1. Open mobile browser\n2. Navigate to login page\n3. Enter credentials\n4. Submit form\n5. Observe white screen',
        expectedResult: 'User should be logged in and redirected to dashboard',
        actualResult: 'White screen appears, no redirect occurs',
        deadline: '2023-11-22'
      });
    };

    fetchIssue();
  }, [issueId]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmitResolution = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form submission logic would go here
    console.log({
      issueId,
      resolution,
      status,
      comment,
      timeSpent,
      attachments
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    // Redirect after successful submission
    router.push('/dashboard/issue-tracker/resolve');
  };

  if (!issue) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading issue details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <Link href="/dashboard/issue-tracker/resolve" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to assigned issues
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Resolve Issue: {issue.id}</h1>
          <p className="text-gray-500">Assigned to: {issue.assignedTo}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            issue.priority === 'critical' ? 'bg-red-100 text-red-800' :
            issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
            issue.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            issue.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
            issue.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {issue.status === 'in_progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Rest of your resolution form from previous example */}
      {/* ... (include all the form fields from the previous resolution component) ... */}
      
      <form onSubmit={handleSubmitResolution} className="space-y-6">
        {/* Issue Details Section */}
        <div className="mb-8 space-y-6">
          {/* ... (include all the issue detail display from previous example) ... */}
        </div>

        {/* Resolution Form Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Resolution Details</h2>
          
          {/* Resolution textarea */}
          <div>
            <label htmlFor="resolution" className="block text-sm font-medium text-gray-700 mb-1">
              Resolution <span className="text-red-500">*</span>
            </label>
            <textarea
              id="resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe how you resolved the issue..."
              required
            />
          </div>

          {/* Status and Time Spent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="cannot_reproduce">Cannot Reproduce</option>
                <option value="wont_fix">Won't Fix</option>
                <option value="duplicate">Duplicate</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeSpent" className="block text-sm font-medium text-gray-700 mb-1">
                Time Spent
              </label>
              <div className="relative">
                <input
                  id="timeSpent"
                  type="text"
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 2h 30m"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Add Comment</h2>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Internal Notes
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add any additional notes about this resolution..."
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Attachments</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                <span>Upload files</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  multiple 
                  className="sr-only" 
                  onChange={handleFileUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF, LOG up to 10MB</p>
          </div>
          
          {attachments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Selected files:</h3>
              <ul className="divide-y divide-gray-200">
                {attachments.map((file, index) => (
                  <li key={index} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <DocumentText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="ml-4 p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/issue-tracker/resolve')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Clock className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
                Submit Resolution
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResolveIssueDetailPage;