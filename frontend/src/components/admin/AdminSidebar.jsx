import React from 'react';
import { 
  HiMenu, 
  HiSearch, 
  HiHome, 
  HiCube, 
  HiMail, 
  HiFlag, 
  HiCalendar, 
  HiUserGroup,
  HiBell,
  HiChat,
  HiCog,
  HiDotsVertical,
  HiUser
} from 'react-icons/hi';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, adminMenuItems }) => {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 flex flex-col h-screen ${sidebarOpen ? 'w-72' : 'w-20'}`}>
      {/* Header with Logo */}
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PB</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg text-gray-800">PhotoBooth</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <HiMenu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {sidebarOpen && (
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหา..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <HiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      )}



      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {adminMenuItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>



      {/* User Profile */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <HiUser className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@pbphotobooth.com</p>
            </div>
          )}
          {sidebarOpen && (
            <button className="text-gray-400 hover:text-gray-600">
              <HiDotsVertical className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 