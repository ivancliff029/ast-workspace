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

export default function CreateTaskPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="min-h-screen bg-[#131619] text-gray-300 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">Create Task </h1>
        <p className="text-sm text-gray-400 mb-8">Let's you create task for the public or selected individuals</p>

        <form className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Task Information</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-400">Task Title</Label>
                <Input id="title" placeholder="ex: Implement new feature" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-400">Priority</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-[#1c1f23] border-gray-700 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="complexity" className="text-sm font-medium text-gray-400">Complexity</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-[#1c1f23] border-gray-700 text-white">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="complex">Complex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-400">Description</Label>
                <Textarea id="description" placeholder="Enter task description" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
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
                    <Button variant="outline" className="w-full justify-start text-left font-normal mt-1 bg-[#1c1f23] border-gray-700 text-white">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select deadline</span>}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="requirements" className="text-sm font-medium text-gray-400">Requirements</Label>
                <Textarea id="requirements" placeholder="Enter task requirements" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
              </div>
              <div>
                <Label htmlFor="milestones" className="text-sm font-medium text-gray-400">Milestones</Label>
                <Textarea id="milestones" placeholder="Enter task milestones" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Additional Information</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="tags" className="text-sm font-medium text-gray-400">Tags</Label>
                <Input id="tags" placeholder="Enter tags separated by commas" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
              </div>
              <div>
                <Label htmlFor="reward" className="text-sm font-medium text-gray-400">Reward Points</Label>
                <Input id="reward" type="number" placeholder="Enter reward points" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
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
                <Input id="github" placeholder="Enter GitHub repository URL" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
              </div>
              <div>
                <Label htmlFor="branch" className="text-sm font-medium text-gray-400">Branch</Label>
                <Input id="branch" placeholder="Enter branch name" className="mt-1 bg-[#1c1f23] border-gray-700 text-white" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Collaboration and Privacy</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox id="collaboration" className="border-gray-700" />
                <Label htmlFor="collaboration" className="ml-2 text-sm text-gray-300">Allow collaboration on this task</Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="public" className="border-gray-700" />
                <Label htmlFor="public" className="ml-2 text-sm text-gray-300">Make this task public</Label>
              </div>
            </div>
          </section>

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
            Create Task
          </Button>
        </form>
      </div>
    </div>
  )
}