import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const TodoModel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" // Hubi inuu la mid yahay Schema-kaaga Backend-ka
  });
   const userId=localStorage.getItem('UserId')  
    useEffect(()=>{
      const fetchTodo=async()=>{
        const {data}=await axios.get('/api/todo/getTodo',userId)
        setTask(data)
      }
      fetchTodo()
    },[userId])

  const handleChange = (event) => {
    // Waxaan isticmaaleynaa 'id' maadaama aad input-yada id siisay
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 1. Hubi in title uusan maranayn ka hor intaanan dirin
      if(!formData.title) return alert("Fadlan cinwaanka qor!");

      // 2. Ku dar 'await' halkan
      const response = await axios.post('/api/todo/createTodo', formData);
      toast.success("create Todo")
      onClose(); // Xir modal-ka markuu guulaysto
    } catch (error) {
      // 3. Halkan waxaad ka arki kartaa dhibka rasmiga ah ee backend-ka
      console.log("Errorka: ", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg p-8 rounded-[32px] shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">New Task</h2>
        <p className="text-gray-500 mb-8 text-sm font-medium">Create a new assignment for your team.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Task Title</label>
              <input 
               id="title"               // Waa inuu la mid yahay kan formData ku jira
              type="text" 
              value={formData.title}   // Tani waa muhiim si loogu xiro state-ka
              onChange={handleChange}
                className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Title" 
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Description</label>
              <textarea 
                id='description'
                onChange={handleChange}
                className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Description" 
              />
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Status</label>
              <select  
                id='status' // Hubi inuu xaraf yar yahay (status)
                className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl outline-none"
                onChange={handleChange}
                value={formData.status}
              >
                <option value="pending">pending</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
              </select>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-gray-400 font-bold">Cancel</button>
            <button 
              type='submit'
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModel;