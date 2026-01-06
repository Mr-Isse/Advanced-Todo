import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const TodoTable = () => {
  // const tasks = [
  //   { id: 1, name: "Fix Authentication Bug", priority: "High", date: "Jan 12", status: "Ongoing" },
  //   { id: 2, name: "Design System Update", priority: "Medium", date: "Jan 15", status: "Pending" },
  //   { id: 3, name: "API Integration", priority: "Low", date: "Jan 18", status: "Completed" },
  // ];
  const[tasks,setTask]=useState([]);
  const userId=localStorage.getItem('UserId')
  const username=localStorage.getItem('username')

  useEffect(()=>{
    const fetchTodo=async()=>{
      const {data}=await axios.get('/api/todo/getTodo',userId)
      setTask(data)
    }
    fetchTodo()
  },[userId])

  const delteTodo=async(id)=>{
    const data=await axios.delete(`/api/todo/deleteTodo/${id}`)
    toast.success("Deleted Success fully")
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-50">
        <h3 className="font-bold text-gray-800 text-lg">Current Assignments</h3>
        <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
            <tr>
              <th className="p-4">title</th>
              <th className="p-4">description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50/80 transition group">
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-md font-black  ${
                    task.title === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {task.title}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{task.description}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${task.status==="pending" ? "bg-indigo-500 animate-pulse cursor-pointer":""} ${task.status==="in-progress" ? "bg-yellow-500 animate-pulse ": ""} ${task.status==="completed"? "bg-green-500 animate-pulse ": ""}`}></div>
                    <span className={`text-sm font-medium ${task.status==="pending" ?"text-indigo-600 cursor-pointer": ""} ${task.status==="in-progress"? "text-yellow-500 cursor-pointer":""} ${task.status=== "completed"? "text-green-600 cursor-pointer": ""}`}>{task.status}</span>
                  </div>
                </td>
                <div className='flex space-x-3'>
                  <button className='bg-indigo-700 cursor-pointer p-2 text-white' >Edit</button>
                  <button className='bg-red-600 cursor-pointer p-2 text-white' onClick={()=>delteTodo(task._id)}>Delete</button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;