import React, { useState, useEffect } from 'react';
import { 
  HiCurrencyDollar, 
  HiCalendar, 
  HiUserAdd, 
  HiCube,
  HiTrendingUp,
  HiTrendingDown,
  HiMinus
} from 'react-icons/hi';

const AdminOverview = () => {
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timers = [];
    
    // Animate stats counting up
    const finalValues = [45000, 28, 15, 10];
    finalValues.forEach((value, index) => {
      const timer = setInterval(() => {
        setAnimatedStats(prev => {
          const newStats = [...prev];
          if (newStats[index] < value) {
            newStats[index] = Math.min(newStats[index] + Math.ceil(value / 50), value);
            return newStats;
          }
          return prev;
        });
      }, 50);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  const stats = [
    { 
      title: 'ยอดขายวันนี้', 
      value: animatedStats[0].toLocaleString(), 
      unit: 'บาท', 
      change: '+12%', 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: <HiCurrencyDollar className="w-6 h-6" />,
      trend: 'up'
    },
    { 
      title: 'การจองเดือนนี้', 
      value: animatedStats[1], 
      unit: 'รายการ', 
      change: '+8%', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: <HiCalendar className="w-6 h-6" />,
      trend: 'up'
    },
    { 
      title: 'ลูกค้าใหม่', 
      value: animatedStats[2], 
      unit: 'คน', 
      change: '+25%', 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      icon: <HiUserAdd className="w-6 h-6" />,
      trend: 'up'
    },
    { 
      title: 'สินค้าทั้งหมด', 
      value: animatedStats[3], 
      unit: 'รายการ', 
      change: '0%', 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      icon: <HiCube className="w-6 h-6" />,
      trend: 'neutral'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center">
              <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:rotate-12`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
                </div>
                <div className="flex items-center mt-1">
                  {stat.trend === 'up' ? (
                    <HiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : stat.trend === 'down' ? (
                    <HiTrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <HiMinus className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <p className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 
                    stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change} จากเดือนที่แล้ว
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <HiCalendar className="w-5 h-5 mr-2 text-blue-500" />
              การจองล่าสุด
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'คุณสมชาย', service: 'PhotoBooth', date: '2024-01-15', status: 'confirmed' },
                { name: 'คุณสมหญิง', service: '360 Video Booth', date: '2024-01-14', status: 'pending' },
                { name: 'คุณนายใส', service: 'AI Photobooth', date: '2024-01-13', status: 'completed' },
              ].map((booking, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all duration-300 transform hover:scale-105"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{booking.name}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{booking.date}</p>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                      booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      'bg-green-100 text-green-800 border border-green-200'
                    }`}>
                      {booking.status === 'confirmed' ? 'ยืนยันแล้ว' :
                       booking.status === 'pending' ? 'รอดำเนินการ' : 'เสร็จสิ้น'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <HiTrendingUp className="w-5 h-5 mr-2 text-green-500" />
              สินค้ายอดนิยม
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'PhotoBooth', bookings: 12, revenue: '180,000', color: 'from-blue-500 to-blue-600' },
                { name: '360 Video Booth', bookings: 8, revenue: '200,000', color: 'from-purple-500 to-purple-600' },
                { name: 'AI Photobooth', bookings: 6, revenue: '120,000', color: 'from-green-500 to-green-600' },
                { name: 'PB Memory', bookings: 4, revenue: '32,000', color: 'from-orange-500 to-orange-600' },
              ].map((product, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.bookings} การจอง</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{product.revenue} บาท</p>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`bg-gradient-to-r ${product.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${(product.bookings / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview; 