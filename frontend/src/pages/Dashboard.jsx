import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Statscard from '../components/dashboard/StatsCard';
import TodoTable from '../components/dashboard/TodoTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TodoModel from '../components/dashboard/TodoModel';

const Dashboard=()=> {
  const [isOpen, setIsOpen] = useState(false);
  const username=localStorage.getItem('username')
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('username')
    localStorage.removeItem('UserId')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    navigate('/login')
  }
  const[tasks,setTask]=useState([]);
  const UserId= localStorage.getItem('UserId')
  useEffect(()=>{
    const getTodo=async()=>{
      const {data}=await axios.get('/api/todo/getTodo',UserId)
      setTask(data)
    }
    getTodo()
  },[UserId])

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <Sidebar logout={logout} />
      
      <main className="flex-1 md:ml-64 p-4 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">General Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back, {username}</p>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-105 transition active:scale-95"
          >
            + Create Task
          </button>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Statscard title="Total Tasks" count={tasks.length} color="text-indigo-600" trend="+12%" />
          <Statscard title="Ongoing" count="12" color="text-amber-600" trend="+3%" />
          <Statscard title="Finished" count="30" color="text-emerald-600" trend="+18%" />
        </div>

        <TodoTable isOpen={isOpen} onClose={() => setIsOpen(false)}  />
      </main>

      <TodoModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Dashboard;