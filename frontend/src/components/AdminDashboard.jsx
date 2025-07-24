import React, { useState } from 'react';
import { 
  HomeIcon, 
  CubeIcon, 
  PhotoIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  PlayIcon,
  ViewColumnsIcon,
  PresentationChartLineIcon,
  MegaphoneIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import AdminOverview from './admin/AdminOverview';
import AdminProducts from './admin/AdminProducts';
import AdminGallery from './admin/AdminGallery';
import AdminBookings from './admin/AdminBookings';
import AdminAnalytics from './admin/AdminAnalytics';
import AdminSettings from './admin/AdminSettings';
import AdminVideos from './admin/AdminVideos';
import AdminImages from './admin/AdminImages';
import AdminHeroSlides from './admin/AdminHeroSlides';
import AdminPromotionSlides from './admin/AdminPromotionSlides';
import AdminClients from './admin/AdminClients';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const adminMenuItems = [
    { id: 'overview', label: 'ภาพรวม', icon: <HomeIcon className="w-5 h-5" /> },
    { id: 'hero-slides', label: 'Hero Slides', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
    { id: 'promotion-slides', label: 'Promotion Slides', icon: <MegaphoneIcon className="w-5 h-5" /> },
    { id: 'clients', label: 'ลูกค้า', icon: <BuildingOfficeIcon className="w-5 h-5" /> },
    { id: 'products', label: 'สินค้า/บริการ', icon: <CubeIcon className="w-5 h-5" /> },
    { id: 'gallery', label: 'แกลลอรี่', icon: <PhotoIcon className="w-5 h-5" /> },
    { id: 'images', label: 'รูปภาพ', icon: <ViewColumnsIcon className="w-5 h-5" /> },
    { id: 'videos', label: 'วิดีโอ', icon: <PlayIcon className="w-5 h-5" /> },
    { id: 'bookings', label: 'การจอง', icon: <CalendarIcon className="w-5 h-5" /> },
    { id: 'analytics', label: 'สถิติ', icon: <ChartBarIcon className="w-5 h-5" /> },
    { id: 'settings', label: 'ตั้งค่า', icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'hero-slides':
        return <AdminHeroSlides />;
      case 'promotion-slides':
        return <AdminPromotionSlides />;
      case 'clients':
        return <AdminClients />;
      case 'products':
        return <AdminProducts />;
      case 'gallery':
        return <AdminGallery />;
      case 'images':
        return <AdminImages />;
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