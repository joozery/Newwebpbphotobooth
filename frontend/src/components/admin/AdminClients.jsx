import React, { useState, useEffect } from 'react';
import {
  PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, ArrowUpIcon, ArrowDownIcon,
  BuildingOfficeIcon, PhotoIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { clientService } from '../../services/clientService';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('ไม่สามารถดึงข้อมูลลูกค้าได้');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !editingClient) {
      toast.error('กรุณาเลือกไฟล์โลโก้');
      return;
    }

    try {
      setUploading(true);
      
      if (editingClient) {
        await clientService.updateClient(editingClient.id, selectedFile);
        toast.success('อัพเดทลูกค้าสำเร็จ');
      } else {
        await clientService.createClient(selectedFile);
        toast.success('เพิ่มลูกค้าสำเร็จ');
      }
      
      fetchClients();
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setPreviewUrl(client.logo_url);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบลูกค้านี้?')) {
      try {
        await clientService.deleteClient(id);
        toast.success('ลบลูกค้าสำเร็จ');
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        toast.error('เกิดข้อผิดพลาดในการลบข้อมูล');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await clientService.toggleClientStatus(id);
      toast.success('เปลี่ยนสถานะสำเร็จ');
      fetchClients();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ');
    }
  };

  const handleReorder = async (id, direction) => {
    const currentClient = clients.find(client => client.id === id);
    if (!currentClient) return;

    const currentOrder = currentClient.client_order;
    let newOrder;

    if (direction === 'up') {
      newOrder = Math.max(0, currentOrder - 1);
    } else {
      newOrder = currentOrder + 1;
    }

    try {
      await clientService.updateClientOrder(id, { client_order: newOrder });
      toast.success('เปลี่ยนลำดับสำเร็จ');
      fetchClients();
    } catch (error) {
      console.error('Error reordering:', error);
      toast.error('เกิดข้อผิดพลาดในการเปลี่ยนลำดับ');
    }
  };

  const resetForm = () => {
    setEditingClient(null);
    setSelectedFile(null);
    setPreviewUrl('');
    if (document.getElementById('logo-upload')) {
      document.getElementById('logo-upload').value = '';
    }
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการลูกค้า</h1>
          <p className="text-gray-600">อัพโหลดโลโก้ลูกค้าสำหรับแสดงในหน้า Our Clients</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          อัพโหลดโลโก้
        </button>
      </div>

      {/* Clients Grid */}
      {clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              {/* Client Logo */}
              <div className="aspect-video bg-gray-50 p-4 flex items-center justify-center">
                <img
                  src={client.logo_url}
                  alt={client.alt_text || client.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </div>

              {/* Client Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{client.name}</h3>
                <p className="text-sm text-gray-600 mb-3">ลำดับ: {client.client_order}</p>
                
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status === 'active' ? 'แสดงผล' : 'ซ่อน'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(client)}
                    className="flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    <PencilIcon className="w-3 h-3 mr-1" />
                    แก้ไข
                  </button>
                  
                  <button
                    onClick={() => handleToggleStatus(client.id, client.status)}
                    className={`flex items-center px-2 py-1 text-xs rounded transition-colors ${
                      client.status === 'active'
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {client.status === 'active' ? (
                      <>
                        <EyeSlashIcon className="w-3 h-3 mr-1" />
                        ซ่อน
                      </>
                    ) : (
                      <>
                        <EyeIcon className="w-3 h-3 mr-1" />
                        แสดง
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleReorder(client.id, 'up')}
                    className="flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    <ArrowUpIcon className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleReorder(client.id, 'down')}
                    className="flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    <ArrowDownIcon className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleDelete(client.id)}
                    className="flex items-center px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    <TrashIcon className="w-3 h-3 mr-1" />
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีลูกค้า</h3>
          <p className="text-gray-600 mb-6">เริ่มต้นโดยการอัพโหลดโลโก้ลูกค้า</p>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            อัพโหลดโลโก้แรก
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingClient ? 'แก้ไขลูกค้า' : 'เพิ่มลูกค้าใหม่'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    โลโก้ลูกค้า
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      {previewUrl ? (
                        <div className="space-y-4">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full max-h-48 mx-auto object-contain rounded-lg"
                          />
                          <p className="text-sm text-gray-600">คลิกเพื่อเปลี่ยนรูป</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto" />
                          <p className="text-sm text-gray-600">
                            คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวางที่นี่
                          </p>
                          <p className="text-xs text-gray-500">
                            รองรับไฟล์ PNG, JPG, JPEG ขนาดไม่เกิน 10MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || (!selectedFile && !editingClient)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        กำลังอัพโหลด...
                      </div>
                    ) : (
                      editingClient ? 'อัพเดท' : 'เพิ่มลูกค้า'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients; 