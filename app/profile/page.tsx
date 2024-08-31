import Navbar from "../components/Navbar";
import TaskComponent from "../components/TaskComponent";

export default function Profile () {

    const tasks = [
        {
          taskName: 'Design Homepage',
          assignedTo: 'Alice',
          deadline: '2024-09-01',
          status: 'In Progress',
        },
        {
          taskName: 'Develop API',
          assignedTo: 'Bob',
          deadline: '2024-09-05',
          status: 'Pending',
        },
        {
          taskName: 'Deploy Application',
          assignedTo: 'Charlie',
          deadline: '2024-09-10',
          status: 'Completed',
        },
      ];

return(

    <>
        <Navbar />
        <h2 className="mx-10 mt-5">Tasks your'e running</h2>
        <div className="task-list grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 mx-10">
        {tasks.map((task, index) => (
          <TaskComponent
            key={index}
            taskName={task.taskName}
            assignedTo={task.assignedTo}
            deadline={task.deadline}
            status={task.status as 'In Progress' | 'Pending' | 'Completed'}
        />
        ))}
      </div>
    </>

);

}