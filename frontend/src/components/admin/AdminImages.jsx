import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  EyeSlashIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const AdminImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'hero',
    status: 'active',
    order_index: 0
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const categories = [
    { value: 'hero', label: 'Hero Section', color: 'bg-blue-100 text-blue-800' },
    { value: 'promotion', label: 'Promotion', color: 'bg-green-100 text-green-800' },
    { value: 'popup', label: 'Popup', color: 'bg-purple-100 text-purple-800' }
  ];

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pbphotobooth-backend-2-a50dde720de0.herokuapp.com/api';

  // Fetch images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? `${API_BASE_URL}/images`
        : `${API_BASE_URL}/images?category=${selectedCategory}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to load images');
      // Fallback data
      setImages([
        {
          id: 1,
          title: 'Hero Slide 1',
          description: 'Hero section slide 1',
          category: 'hero',
          image_url: 'https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Hero+Slide+1',
          status: 'active',
          order_index: 1
        },
        {
          id: 2,
          title: 'Promotion Banner',
          description: 'Special offer promotion',
          category: 'promotion',
          image_url: 'https://via.placeholder.com/800x300/10B981/FFFFFF?text=Promotion+Banner',
          status: 'active',
          order_index: 1
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Upload image
  const uploadImage = async () => {
    if (!selectedFile) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedFile);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('order_index', formData.order_index);

      const response = await fetch(`${API_BASE_URL}/images/upload`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const result = await response.json();
      toast.success('Image uploaded successfully!');
      resetForm();
      fetchImages();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Update image
  const updateImage = async () => {
    try {
      setUploading(true);
      const response = await fetch(`${API_BASE_URL}/images/${editingImage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Update failed');
      }

      toast.success('Image updated successfully!');
      resetForm();
      fetchImages();
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.message || 'Failed to update image');
    } finally {
      setUploading(false);
    }
  };

  // Delete image
  const deleteImage = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/images/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Delete failed');
      }

      toast.success('Image deleted successfully!');
      fetchImages();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete image');
    }
  };

  // Update order
  const updateOrder = async (id, newOrder) => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/${id}/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_index: newOrder }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Order update failed');
      }

      fetchImages();
    } catch (error) {
      console.error('Order update error:', error);
      toast.error(error.message || 'Failed to update order');
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'hero',
      status: 'active',
      order_index: 0
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setEditingImage(null);
    setShowModal(false);
  };

  // Open edit modal
  const openEditModal = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      category: image.category,
      status: image.status,
      order_index: image.order_index
    });
    setPreviewUrl(image.image_url);
    setShowModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingImage) {
      updateImage();
    } else {
      uploadImage();
    }
  };

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const filteredImages = images.filter(img => 
    selectedCategory === 'all' || img.category === selectedCategory
  );

  const getCategoryColor = (category) => {
    return categories.find(cat => cat.value === category)?.color || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Management</h1>
          <p className="text-gray-600">Manage hero slides, promotions, and popup images</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add Image
          </button>
        </div>

        {/* Images Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200/9CA3AF/FFFFFF?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(image.category)}`}>
                      {getCategoryLabel(image.category)}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    {image.status === 'active' ? (
                      <EyeIcon className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Order: {image.order_index}</span>
                    
                    <div className="flex gap-2">
                      {/* Order Controls */}
                      <button
                        onClick={() => updateOrder(image.id, image.order_index - 1)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Move Up"
                      >
                        <ArrowUpIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateOrder(image.id, image.order_index + 1)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Move Down"
                      >
                        <ArrowDownIcon className="w-4 h-4" />
                      </button>
                      
                      {/* Action Buttons */}
                      <button
                        onClick={() => openEditModal(image)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first image.</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Image
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingImage ? 'Edit Image' : 'Add New Image'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image File {!editingImage && '*'}
                </label>
                {!editingImage && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                )}
                {previewUrl && (
                  <div className="mt-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Order Index */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Index
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Saving...' : (editingImage ? 'Update' : 'Upload')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminImages; 