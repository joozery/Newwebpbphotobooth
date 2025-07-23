import React, { useState } from 'react';
import { 
  HiHome, 
  HiCube, 
  HiPhotograph, 
  HiCalendar, 
  HiChartBar, 
  HiCog,
  HiPlay
} from 'react-icons/hi';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import AdminOverview from './admin/AdminOverview';
import AdminProducts from './admin/AdminProducts';
import AdminGallery from './admin/AdminGallery';
import AdminBookings from './admin/AdminBookings';
import AdminAnalytics from './admin/AdminAnalytics';
import AdminSettings from './admin/AdminSettings';
import AdminVideos from './admin/AdminVideos';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const adminMenuItems = [
    { id: 'overview', label: 'ภาพรวม', icon: <HiHome className="w-5 h-5" /> },
    { id: 'products', label: 'สินค้า/บริการ', icon: <HiCube className="w-5 h-5" /> },
    { id: 'gallery', label: 'แกลลอรี่', icon: <HiPhotograph className="w-5 h-5" /> },
    { id: 'videos', label: 'วิดีโอ', icon: <HiPlay className="w-5 h-5" /> },
    { id: 'bookings', label: 'การจอง', icon: <HiCalendar className="w-5 h-5" /> },
    { id: 'analytics', label: 'สถิติ', icon: <HiChartBar className="w-5 h-5" /> },
    { id: 'settings', label: 'ตั้งค่า', icon: <HiCog className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'products':
        return <AdminProducts />;
      case 'gallery':
        return <AdminGallery />;
      case 'videos':
        return <AdminVideos />;
      case 'bookings':
        return <AdminBookings />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adminMenuItems={adminMenuItems}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader 
          activeTab={activeTab}
          adminMenuItems={adminMenuItems}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 