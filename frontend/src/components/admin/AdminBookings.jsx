import React, { useState } from 'react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'คุณสมชาย จันทร์เจ้า',
      email: 'somchai@email.com',
      phone: '081-234-5678',
      service: 'PhotoBooth',
      eventDate: '2024-02-15',
      eventTime: '10:00-18:00',
      location: 'โรงแรมแกรนด์ไฮแอท เอราวัณ',
      price: '25,000',
      status: 'confirmed',
      bookingDate: '2024-01-10',
      notes: 'งานแต่งงาน 200 คน ต้องการแบคดรอปพิเศษ'
    },
    {
      id: 2,
      customerName: 'คุณสมหญิง ใจดี',
      email: 'somying@email.com',
      phone: '082-345-6789',
      service: '360 Video Booth',
      eventDate: '2024-02-20',
      eventTime: '14:00-22:00',
      location: 'ศูนย์การประชุมแห่งชาติสิริกิติ์',
      price: '35,000',
      status: 'pending',
      bookingDate: '2024-01-12',
      notes: 'งานเลี้ยงบริษัท ต้องการเอฟเฟกต์พิเศษ'
    },
    {
      id: 3,
      customerName: 'คุณนายใส สวยงาม',
      email: 'sai@email.com',
      phone: '083-456-7890',
      service: 'AI Photobooth',
      eventDate: '2024-01-25',
      eventTime: '16:00-20:00',
      location: 'โรงแรมเซ็นทารา แกรนด์',
      price: '30,000',
      status: 'completed',
      bookingDate: '2024-01-05',
      notes: 'งานวันเกิด 50 ปี ต้องการธีมวินเทจ'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusConfig = {
    pending: { label: 'รอดำเนินการ', color: 'bg-yellow-100 text-yellow-800' },
    confirmed: { label: 'ยืนยันแล้ว', color: 'bg-blue-100 text-blue-800' },
    completed: { label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'ยกเลิก', color: 'bg-red-100 text-red-800' }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการการจอง</h1>
          <p className="text-gray-600">ติดตามและจัดการการจองทั้งหมด</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = bookings.filter(b => b.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{config.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="ค้นหาชื่อลูกค้าหรือบริการ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">ทุกสถานะ</option>
            {Object.entries(statusConfig).map(([status, config]) => (
              <option key={status} value={status}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ลูกค้า
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  บริการ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่งาน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ราคา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.service}</div>
                    <div className="text-sm text-gray-500">{booking.eventTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.eventDate).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ฿{booking.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[booking.status].color}`}>
                      {statusConfig[booking.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            ❌
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          className="text-green-600 hover:text-green-900 text-sm"
                        >
                          เสร็จสิ้น
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">ไม่พบการจองที่ตรงกับการค้นหา</p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings; 