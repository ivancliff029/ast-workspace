export interface TaskCardProps{
    id:number;
    creator:string;
    createdAt:string;
    title:string;
    description:string;
    dueDate:string;
    reward:string;
    tags?:[];
    complexity:string;
   
  }