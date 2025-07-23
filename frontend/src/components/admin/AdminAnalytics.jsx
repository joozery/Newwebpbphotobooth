import React, { useState } from 'react';

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  
  const periods = [
    { value: '7days', label: '7 วันที่ผ่านมา' },
    { value: '30days', label: '30 วันที่ผ่านมา' },
    { value: '3months', label: '3 เดือนที่ผ่านมา' },
    { value: '1year', label: '1 ปีที่ผ่านมา' }
  ];

  // Mock data
  const statsData = [
    { title: 'รายได้รวม', value: '1,250,000', change: '+15.3%', trend: 'up', icon: '💰' },
    { title: 'การจองทั้งหมด', value: '89', change: '+8.2%', trend: 'up', icon: '📅' },
    { title: 'ลูกค้าใหม่', value: '156', change: '-3.1%', trend: 'down', icon: '👥' },
    { title: 'เข้าชมเว็บไซต์', value: '12,450', change: '+23.7%', trend: 'up', icon: '👁️' }
  ];

  const topServices = [
    { name: 'PhotoBooth', bookings: 34, revenue: 510000, percentage: 38.2 },
    { name: '360 Video Booth', bookings: 18, revenue: 450000, percentage: 20.2 },
    { name: 'AI Photobooth', bookings: 22, revenue: 440000, percentage: 24.7 },
    { name: 'PB Memory', bookings: 15, revenue: 120000, percentage: 16.9 }
  ];

  const recentActivity = [
    { time: '2 ชั่วโมงที่แล้ว', action: 'การจองใหม่', detail: 'PhotoBooth - คุณสมชาย', amount: '25,000' },
    { time: '4 ชั่วโมงที่แล้ว', action: 'ชำระเงิน', detail: '360 Video Booth - คุณสมหญิง', amount: '35,000' },
    { time: '6 ชั่วโมงที่แล้ว', action: 'การจองใหม่', detail: 'AI Photobooth - คุณจำรัส', amount: '20,000' },
    { time: '8 ชั่วโมงที่แล้ว', action: 'ยกเลิกการจอง', detail: 'PB Memory - คุณประยุทธ์', amount: '12,000' },
    { time: '1 วันที่แล้ว', action: 'การจองใหม่', detail: 'PhotoBooth - คุณมาลี', amount: '15,000' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">สถิติและวิเคราะห์</h1>
          <p className="text-gray-600">ติดตามผลประกอบการและแนวโน้มธุรกิจ</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {periods.map(period => (
            <option key={period.value} value={period.value}>{period.label}</option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-1">{stat.trend === 'up' ? '📈' : '📉'}</span>
                  {stat.change} จากเดือนที่แล้ว
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Services Performance & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">บริการยอดนิยม</h3>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                    <span className="text-sm text-gray-600">{service.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>{service.bookings} การจอง</span>
                    <span>฿{service.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">กิจกรรมล่าสุด</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    activity.action === 'การจองใหม่' ? 'bg-green-500' :
                    activity.action === 'ชำระเงิน' ? 'bg-blue-500' :
                    activity.action === 'ยกเลิกการจอง' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">฿{activity.amount}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">อัตราการแปลงลูกค้า</h4>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">24.5%</span>
            <span className="ml-2 text-sm text-green-600 flex items-center">
              📈 +3.2%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">จากผู้เข้าชมเว็บไซต์</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">มูลค่าการจองเฉลี่ย</h4>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">฿18,450</span>
            <span className="ml-2 text-sm text-green-600 flex items-center">
              📈 +5.8%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">ต่อการจองหนึ่งครั้ง</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">อัตราลูกค้าซ้ำ</h4>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">68%</span>
            <span className="ml-2 text-sm text-red-600 flex items-center">
              📉 -1.2%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">ลูกค้าที่กลับมาใช้บริการซ้ำ</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics; 