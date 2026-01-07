import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const TodoModel = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  useEffect(() => {
    if (isOpen && editData) {
      setFormData({
        title: editData.title || "", 
        description: editData.description || "",
        status: editData.status || "pending"
      });
    } else {
      setFormData({ title: "", description: "", status: "pending" });
    }
  }, [editData, isOpen]);
  useEffect(() => {
    if (isOpen && editData) {
      setFormData({
        title: editData.title || "",      
        description: editData.description || "",
        status: editData.status || "pending"
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData && editData._id) {

        await axios.put(`/api/todo/updateTodo/${editData._id}`, formData);
        toast.success("Xogta waa la cusboonaysiiyay");
      } else {

        await axios.post('/api/todo/createTodo', formData);
        toast.success("Task cusub ayaa la abuuray");
      }
      onClose();
    } catch (error) {
      console.error("Cilad ayaa dhacday", error);
      toast.error(error.response?.data?.message || "Cilad ayaa dhacday inta lagu guda jiray keydinta");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg p-8 rounded-[32px] shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
          {editData ? "Update Task" : "New Task"}
        </h2>
        <p className="text-gray-500 mb-8 text-sm font-medium">
          {editData ? "Modify your assignment details below." : "Create a new assignment for your team."}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Task Title</label>
              <input 
                id="title"
                type="text" 
                value={formData.title} // Controlled input
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
                value={formData.description} // Controlled input
                onChange={handleChange}
                className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Description" 
              />
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Status</label>
              <select  
                id='status'
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
            <button type="button" onClick={onClose} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition">Cancel</button>
            <button 
              type='submit'
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition"
            >
              {editData ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModel;