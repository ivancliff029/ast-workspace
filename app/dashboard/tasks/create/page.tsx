'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
// Import your existing Supabase client
import { supabase } from '../../../../lib/supabaseClient'
import { useRouter } from 'next/navigation' // For redirection after task creation

export default function CreateTaskPage() {
  const [date, setDate] = useState<Date>()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('')
  const [complexity, setComplexity] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [milestones, setMilestones] = useState('')
  const [tags, setTags] = useState('') // Stored as string, will be split into array
  const [rewardPoints, setRewardPoints] = useState<number | undefined>(undefined)
  const [githubRepoUrl, setGithubRepoUrl] = useState('')
  const [branch, setBranch] = useState('')
  const [allowCollaboration, setAllowCollaboration] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Get the current user's ID
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.error("Error fetching user:", userError.message);
      setError("Failed to get user information. Please try again or log in.");
      setLoading(false);
      return;
    }

    if (!user) {
      setError("You must be logged in to create a task.")
      setLoading(false)
      return
    }

    // Convert tags string to an array, filtering out empty strings
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    try {
      const { data, error: insertError } = await supabase
        .from('tasks')
        .insert([
          {
            user_id: user.id,
            title,
            priority,
            complexity,
            description,
            deadline: date ? format(date, 'yyyy-MM-dd') : null, // Format date for database
            requirements,
            milestones,
            tags: tagsArray,
            reward_points: rewardPoints,
            github_repo_url: githubRepoUrl,
            branch,
            allow_collaboration: allowCollaboration,
            is_public: isPublic,
          },
        ])
        .select() // Select the newly inserted row to get its data if needed

      if (insertError) {
        throw insertError
      }

      console.log('Task created successfully:', data)
      alert('Task created successfully!')
      router.push('/dashboard') // Redirect to a dashboard or tasks list after creation


      // Optionally clear the form
      setTitle('')
      setPriority('')
      setComplexity('')
      setDescription('')
      setDate(undefined)
      setRequirements('')
      setMilestones('')
      setTags('')
      setRewardPoints(undefined)
      setGithubRepoUrl('')
      setBranch('')
      setAllowCollaboration(false)
      setIsPublic(false)

    } catch (err: any) {
      console.error('Error creating task:', err.message)
      setError(`Failed to create task: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#131619] text-gray-300 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">Create Task </h1>
        <p className="text-sm text-gray-400 mb-8">Let's you create task for the public or selected individuals</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Task Information</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-400">Task Title</Label>
                <Input
                  id="title"
                  placeholder="ex: Implement new feature"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-400">Priority</Label>
                  <Select value={priority} onValueChange={setPriority} required>
                    <SelectTrigger className="mt-1 bg-[#1c1f23] border-gray-700 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1c1f23] text-white border-gray-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="complexity" className="text-sm font-medium text-gray-400">Complexity</Label>
                  <Select value={complexity} onValueChange={setComplexity} required>
                    <SelectTrigger className="mt-1 bg-[#1c1f23] border-gray-700 text-white">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1c1f23] text-white border-gray-700">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="complex">Complex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-400">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Task Details</h2>
            <div className="grid gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-400">Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-1 bg-[#1c1f23] border-gray-700 text-white"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select deadline</span>}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1c1f23] border-gray-700" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="bg-[#1c1f23] text-white"
                      classNames={{
                        day_selected: "bg-teal-500 text-white hover:bg-teal-600 hover:text-white focus:bg-teal-600 focus:text-white",
                        day_today: "bg-gray-700 text-white",
                        day: "text-gray-300 hover:bg-gray-800",
                        nav_button_previous: "text-gray-300",
                        nav_button_next: "text-gray-300",
                        caption: "text-white",
                        head_cell: "text-gray-400",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="requirements" className="text-sm font-medium text-gray-400">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter task requirements"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="milestones" className="text-sm font-medium text-gray-400">Milestones</Label>
                <Textarea
                  id="milestones"
                  placeholder="Enter task milestones"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={milestones}
                  onChange={(e) => setMilestones(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Additional Information</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="tags" className="text-sm font-medium text-gray-400">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="reward" className="text-sm font-medium text-gray-400">Reward Points</Label>
                <Input
                  id="reward"
                  type="number"
                  placeholder="Enter reward points"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={rewardPoints === undefined ? '' : rewardPoints}
                  onChange={(e) => setRewardPoints(e.target.value === '' ? undefined : parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="attachments" className="text-sm font-medium text-gray-400">Attachments and References</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md bg-[#1c1f23]">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Repository Information</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="github" className="text-sm font-medium text-gray-400">GitHub Repository</Label>
                <Input
                  id="github"
                  placeholder="Enter GitHub repository URL"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={githubRepoUrl}
                  onChange={(e) => setGithubRepoUrl(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="branch" className="text-sm font-medium text-gray-400">Branch</Label>
                <Input
                  id="branch"
                  placeholder="Enter branch name"
                  className="mt-1 bg-[#1c1f23] border-gray-700 text-white"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Collaboration and Privacy</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="collaboration"
                  className="border-gray-700"
                  checked={allowCollaboration}
                  onCheckedChange={(checked) => setAllowCollaboration(!!checked)}
                />
                <Label htmlFor="collaboration" className="ml-2 text-sm text-gray-300">Allow collaboration on this task</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="public"
                  className="border-gray-700"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(!!checked)}
                />
                <Label htmlFor="public" className="ml-2 text-sm text-gray-300">Make this task public</Label>
              </div>
            </div>
          </section>

          {error && (
            <div className="text-red-500 text-sm mt-4 p-3 bg-red-900 bg-opacity-30 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white" disabled={loading}>
            {loading ? 'Creating Task...' : 'Create Task'}
          </Button>
        </form>
      </div>
    </div>
  )
}