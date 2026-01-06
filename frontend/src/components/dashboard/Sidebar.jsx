import React from 'react';

const Sidebar = ({logout}) => (
  <aside className="w-64 bg-slate-900 h-screen text-white p-6 hidden md:flex flex-col fixed left-0 top-0">
    <div className="mb-10 px-2">
      <h1 className="text-2xl font-bold tracking-tight text-indigo-400">TaskMaster <span className="text-white">OS</span></h1>
    </div>
    <nav className="flex-1 space-y-2">
      <div className="flex items-center gap-3 p-3 bg-indigo-600/20 text-indigo-400 rounded-xl cursor-pointer border border-indigo-600/30">
        <span className="font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-3 p-3 text-gray-400 hover:bg-slate-800 rounded-xl cursor-pointer transition">
        <span>Analytics</span>
      </div>
      <div className="flex items-center gap-3 p-3 text-gray-400 hover:bg-slate-800 rounded-xl cursor-pointer transition">
        <span>Settings</span>
      </div>
    </nav>
    <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl">
      <button className="w-full py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold cursor-pointer" onClick={logout}>Logout</button>
    </div>
    <div>
    </div>
  </aside>
);

export default Sidebar;