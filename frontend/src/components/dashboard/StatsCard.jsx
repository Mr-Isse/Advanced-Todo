import React from 'react';

const Statscard = ({ title, count, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-default">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-gray-800">{count}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-xl`}>
        {/* Halkan icon ayaa geli kara */}
      </div>
    </div>
    <div className="mt-4 flex items-center text-xs">
      <span className="text-emerald-500 font-bold">{trend}</span>
      <span className="ml-2 text-gray-400 text-[10px]">since last week</span>
    </div>
  </div>
);

export default Statscard;