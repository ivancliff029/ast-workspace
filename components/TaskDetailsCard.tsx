import React from 'react'
import { Button } from './ui/button'
import { FileText, Github, Link, Link2, Users } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { TaskCardProps } from '@/types'

const TaskDetailsCard = ({id, creator, createdAt, title, description, dueDate,reward, tags, complexity}:TaskCardProps) => {
  return (
    <div>
       <Card className=' bg-[#1C1F23] border-none'>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`/img/ivan.jpg`} alt={`${creator} avatar`} />
              <AvatarFallback>{creator[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h2 className="text-lg font-semibold">{creator}</h2>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
            <span className="ml-auto text-sm text-muted-foreground">{createdAt}</span>
          </div>

          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Requirements</h4>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <Checkbox id="requirement1" />
                  <label htmlFor="requirement1" className="ml-2 text-sm">Responsive design that works on all devices</label>
                </li>
                <li className="flex items-center">
                  <Checkbox id="requirement2" />
                  <label htmlFor="requirement2" className="ml-2 text-sm">Implement OAuth 2.0 and JWT authentication strategy</label>
                </li>
                <li className="flex items-center">
                  <Checkbox id="requirement3" />
                  <label htmlFor="requirement3" className="ml-2 text-sm">Improve the overall user experience</label>
                </li>
                <li className="flex items-center">
                  <Checkbox id="requirement4" />
                  <label htmlFor="requirement4" className="ml-2 text-sm">Ensure the website is accessible and SEO-friendly</label>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Deadline</span>
                <span className="font-semibold">{dueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Complexity</span>
                <span className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-sm font-semibold">{complexity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Priority</span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  <span className="font-semibold">High</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Reward</span>
                <span className="font-semibold">{reward}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Milestones</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Checkbox id="milestone1" />
                <label htmlFor="milestone1" className="ml-2 text-sm">Set up OAuth 2.0 provider</label>
              </li>
              <li className="flex items-center">
                <Checkbox id="milestone2" />
                <label htmlFor="milestone2" className="ml-2 text-sm">Implement JWT token generation and validation</label>
              </li>
              <li className="flex items-center">
                <Checkbox id="milestone3" />
                <label htmlFor="milestone3" className="ml-2 text-sm">Create user registration and login UI/UX endpoints</label>
              </li>
              <li className="flex items-center">
                <Checkbox id="milestone4" />
                <label htmlFor="milestone4" className="ml-2 text-sm">Enable multi-factor authentication</label>
              </li>
              <li className="flex items-center">
                <Checkbox id="milestone5" />
                <label htmlFor="milestone5" className="ml-2 text-sm">Test and Deploy</label>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Attachments</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FileText className="mr-2" size={16} />
                  <span className="text-sm">Brand Guidelines.pdf</span>
                </li>
                <li className="flex items-center">
                  <FileText className="mr-2" size={16} />
                  <span className="text-sm">Competitor Analysis.xlsx</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Reference</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Link className="mr-2" size={16} />
                  <span className="text-sm">Company Website Redesign Brief</span>
                </li>
                <li className="flex items-center">
                  <Link className="mr-2" size={16} />
                  <span className="text-sm">User Research Findings</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">GitHub Repository</h4>
            <div className="p-4 rounded-lg flex items-center">
              <Github className="mr-3" size={24} />
              <div>
                <p className="font-semibold">a/workspace</p>
                <p className="text-sm text-muted-foreground">Branch: feature/user-auth</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            <Button className='bg-green-500 text-white'>Claim Task</Button>
            <Button variant="outline"   className="flex items-center bg-gray-400 text-gray-500">
               <Users width={20} height={20} className="w-5 h-5 mr-2"/>
              Start Collaboration
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default TaskDetailsCard