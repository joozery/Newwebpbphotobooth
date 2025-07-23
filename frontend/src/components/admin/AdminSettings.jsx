import React, { useState } from 'react';
import { 
  HiUser, 
  HiBell, 
  HiShieldCheck, 
  HiGlobe, 
  HiMail, 
  HiPhone, 
  HiSave 
} from 'react-icons/hi';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    companyName: 'PB PhotoBooth',
    email: 'admin@pbphotobooth.com',
    phone: '02-123-4567',
    address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110',
    website: 'https://pbphotobooth.com',
    description: 'บริการ PhotoBooth และ Video Booth คุณภาพสูง สำหรับงานแต่งงาน งานอีเวนท์ และงานเลี้ยงต่างๆ',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    paymentAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    
    // Business Settings
    currency: 'THB',
    timezone: 'Asia/Bangkok',
    language: 'th'
  });

  const tabs = [
    { id: 'profile', label: 'ข้อมูลบริษัท', icon: <HiUser className="w-5 h-5" /> },
    { id: 'notifications', label: 'การแจ้งเตือน', icon: <HiBell className="w-5 h-5" /> },
    { id: 'security', label: 'ความปลอดภัย', icon: <HiShieldCheck className="w-5 h-5" /> },
    { id: 'business', label: 'ตั้งค่าธุรกิจ', icon: <HiGlobe className="w-5 h-5" /> }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    alert('บันทึกการตั้งค่าเรียบร้อยแล้ว');
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อบริษัท
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <HiMail className="w-4 h-4" />
            อีเมล
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <HiPhone className="w-4 h-4" />
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <HiGlobe className="w-4 h-4" />
            เว็บไซต์
          </label>
          <input
            type="url"
            value={settings.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📍 ที่อยู่
        </label>
        <textarea
          value={settings.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          คำอธิบายบริษัท
        </label>
        <textarea
          value={settings.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การแจ้งเตือนทั่วไป</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">การแจ้งเตือนทางอีเมล</label>
              <p className="text-sm text-gray-500">รับการแจ้งเตือนทางอีเมลสำหรับกิจกรรมสำคัญ</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
              className="rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">การแจ้งเตือนทาง SMS</label>
              <p className="text-sm text-gray-500">รับการแจ้งเตือนทาง SMS สำหรับกรณีเร่งด่วน</p>
            </div>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
              className="rounded"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การแจ้งเตือนธุรกิจ</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">การจองใหม่</label>
              <p className="text-sm text-gray-500">แจ้งเตือนเมื่อมีการจองใหม่</p>
            </div>
            <input
              type="checkbox"
              checked={settings.bookingAlerts}
              onChange={(e) => handleInputChange('bookingAlerts', e.target.checked)}
              className="rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">การชำระเงิน</label>
              <p className="text-sm text-gray-500">แจ้งเตือนเมื่อได้รับการชำระเงิน</p>
            </div>
            <input
              type="checkbox"
              checked={settings.paymentAlerts}
              onChange={(e) => handleInputChange('paymentAlerts', e.target.checked)}
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การรักษาความปลอดภัย</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">การยืนยันตัวตนแบบ 2 ขั้นตอน</label>
              <p className="text-sm text-gray-500">เพิ่มความปลอดภัยด้วยการยืนยันผ่าน SMS หรือ App</p>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
              className="rounded"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          หมดเวลาเซสชัน (นาที)
        </label>
        <select
          value={settings.sessionTimeout}
          onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={15}>15 นาที</option>
          <option value={30}>30 นาที</option>
          <option value={60}>1 ชั่วโมง</option>
          <option value={120}>2 ชั่วโมง</option>
        </select>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-yellow-800 mb-2">เปลี่ยนรหัสผ่าน</h4>
        <p className="text-sm text-yellow-700 mb-3">ควรเปลี่ยนรหัสผ่านเป็นประจำเพื่อความปลอดภัย</p>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
          เปลี่ยนรหัสผ่าน
        </button>
      </div>
    </div>
  );

  const renderBusinessTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สกุลเงิน
          </label>
          <select
            value={settings.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="THB">บาท (THB)</option>
            <option value="USD">ดอลลาร์ (USD)</option>
            <option value="EUR">ยูโร (EUR)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เขตเวลา
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleInputChange('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Asia/Bangkok">กรุงเทพฯ (UTC+7)</option>
            <option value="Asia/Singapore">สิงคโปร์ (UTC+8)</option>
            <option value="America/New_York">นิวยอร์ก (UTC-5)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ภาษา
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="th">ไทย</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'business':
        return renderBusinessTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ตั้งค่าระบบ</h1>
          <p className="text-gray-600">จัดการการตั้งค่าและการกำหนดค่าระบบ</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <HiSave className="w-5 h-5" />
          บันทึกการตั้งค่า
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 