import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TodoModel from './TodoModel';

const TodoTable = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Qoraalka la qorayo
const [filterStatus, setFilterStatus] = useState("all"); // Status-ka la dooranayo

  const [tasks, setTask] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const userId = localStorage.getItem('UserId');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axios.get('/api/todo/getTodo', {
          params: { userId } 
        });
        setTask(data);
      } catch (error) {
        console.error("Xogta lama soo heli karo", error);
      }
    };
    if (userId) fetchTodo();
  }, [userId]);

  // // 2. Marka Edit la riixdo
  // const handleEditClick = (todo) => {
  //   setSelectedTodo(todo);
  //   setIsEditModalOpen(true);
  // };

  
  const delteTodo = async (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirto?")) {
      try {
        await axios.delete(`/api/todo/deleteTodo/${id}`);
        setTask(tasks.filter(t => t._id !== id)); 
        toast.success("Deleted Successfully");
      } catch (error) {
        toast.error("Wuu diiday inuu tirtirmo");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <TodoModel 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTodo(null); 
        }} 
        editData={selectedTodo} 
      />

      <div className="p-6 flex justify-between items-center border-b border-gray-50">
        <h3 className="font-bold text-gray-800 text-lg">Current Assignments</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase font-bold">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50/80 transition">
                <td className="p-4 font-medium text-gray-900">{task.title}</td>
                <td className="p-4 text-sm text-gray-500">{task.description}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      task.status === "pending" ? "bg-indigo-500" : 
                      task.status === "in-progress" ? "bg-yellow-500" : "bg-green-500"
                    } animate-pulse`}></div>
                    <span className="text-sm capitalize">{task.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className='flex justify-center space-x-2'>
                    <button 
                    onClick={() => {
                      setSelectedTodo(task); 
                      setIsEditModalOpen(true);
                    }}
                    className="bg-indigo-700 p-2 text-white"
                  >
                    Edit
                  </button>
                    <button 
                      onClick={() => delteTodo(task._id)}
                      className='bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;