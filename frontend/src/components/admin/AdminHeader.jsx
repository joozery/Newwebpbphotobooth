import React from 'react';

const AdminHeader = ({ activeTab, adminMenuItems }) => {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          {adminMenuItems.find(item => item.id === activeTab)?.label || 'ภาพรวม'}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 