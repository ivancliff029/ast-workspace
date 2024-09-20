import { Calendar, ChevronRight } from 'lucide-react'
import React from 'react'
import Money from './icons/Money'
import Link from 'next/link'
import Image from 'next/image'
import { TaskCardProps } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'



function TaskCard({id, creator, createdAt, title, description, dueDate,reward, tags, complexity}:TaskCardProps) {
  return (
    <div>
      <div key={id} className="bg-[#1F2329] rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`/img/ivan.jpg`} alt={`${creator} avatar`} />
                    <AvatarFallback className='bg-[#ffffff] text-black'>{creator[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{creator}</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                </div>
              <span className="text-xs text-gray-400">{createdAt}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-400 mb-4">{description}</p>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <Calendar className="mr-1" size={16} />
                {dueDate}
              </div>
              <div className="flex items-center">
                <Money className="mr-1" width={18} height={18}/>
                {reward}
              </div>
            </div>
            <div className='tags flex items-center justify-evenly my-4'>
              <span className='bg-green-700 px-2 text-green-700 bg-opacity-25 rounded-full text-xs py-1'>Reactnative</span>
              <span className="text-xs text-blue-900 bg-blue-900 bg-opacity-25 py-1 px-2 rounded-full">Typescript</span>
              <span className='bg-cyan-700 px-2 text-cyan-700 bg-opacity-25 rounded-full text-xs py-1'>Reactnative</span>
              <span className="text-xs text-blue-900 bg-blue-900 bg-opacity-25 py-1 px-2 rounded-full">Typescript</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs bg-blue-900 text-blue-300 py-1 px-2 rounded">Complexity: {complexity}</span>
              <button className="text-xs bg-yellow-600 text-white py-1 px-2 rounded">Available</button>
            </div>
            <Link href={`/dashboard/tasks/${id}`} className="bg-green-600 text-white py-2 px-4 rounded-lg mt-auto flex items-center justify-center">Details <ChevronRight size={20} className='ml-4' /></Link>
          </div>
    </div>
  )
}

export default TaskCard