import { useState, useRef } from 'react';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Upload, X, Plus, Save, LogOut, Users, Image, Settings, Home, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCouples, useCouplesMutations, useCouple } from '../hooks/useCouples';
import { useHeroImages, useHeroMutations } from '../hooks/useHero';
import { useAbout, useAboutMutations } from '../hooks/useAbout';
import { Couple, AboutMe } from '../services/api';
import { useUploadProgress } from '../hooks/useUploadProgress';

const Admin = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'couples' | 'hero' | 'about'>('couples');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-light text-gray-900">Admin Panel</h1>
              <span className="ml-4 text-sm text-gray-500">Welcome, {user?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('couples')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'couples'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Couples
              </button>
              <button
                onClick={() => setActiveTab('hero')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'hero'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Image className="h-4 w-4 inline mr-2" />
                Hero Images
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'about'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                About
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'couples' && <CouplesTab />}
            {activeTab === 'hero' && <HeroTab />}
            {activeTab === 'about' && <AboutTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Couples Tab Component
const CouplesTab = () => {
  const { data: couplesData, loading, refetch } = useCouples();
  const mutations = useCouplesMutations();
  const [selectedCouple, setSelectedCouple] = useState<Couple | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading couples...</p>
      </div>
    );
  }

  const couples = couplesData?.couples || [];

  const handleDeleteCouple = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this couple? This action cannot be undone.')) {
      const result = await mutations.delete.mutate(id);
      if (result) {
        refetch();
      }
    }
  };

  const handleEditCouple = (couple: Couple) => {
    setSelectedCouple(couple);
    setShowEditForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Couples</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Couple
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || showEditForm) && (
        <CoupleFormModal
          couple={selectedCouple}
          isEdit={showEditForm}
          onClose={() => {
            setShowAddForm(false);
            setShowEditForm(false);
            setSelectedCouple(null);
          }}
          onSuccess={() => {
            setShowAddForm(false);
            setShowEditForm(false);
            setSelectedCouple(null);
            refetch();
          }}
          mutations={mutations}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {couples.map((couple) => (
          <div key={couple.id} className="bg-gray-50 rounded-lg p-4">
            <img
              src={couple.coverImageUrl}
              alt={couple.names}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{couple.names}</h3>
            <p className="text-gray-600 text-sm mb-2">{couple.title}</p>
            <p className="text-gray-500 text-xs mb-4">{couple.location}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditCouple(couple)}
                className="flex-1 px-3 py-2 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 transition-colors flex items-center justify-center gap-1"
              >
                <Edit className="h-3 w-3" />
                Edit
              </button>
              <button 
                onClick={() => handleDeleteCouple(couple.id)}
                className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                disabled={mutations.delete.loading}
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {couples.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No couples found. Add your first couple to get started.</p>
        </div>
      )}
    </div>
  );
};

// Hero Tab Component
const HeroTab = () => {
  const { data: heroData, loading, refetch } = useHeroImages();
  const mutations = useHeroMutations();
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading hero images...</p>
      </div>
    );
  }

  const heroImages = heroData?.heroImages || [];
  
  // Ensure we have exactly 7 slots (fill empty slots)
  const heroSlots = Array.from({ length: 7 }, (_, index) => {
    const orderIndex = index + 1;
    return heroImages.find(img => img.orderIndex === orderIndex) || { 
      id: 0, 
      imageUrl: '', 
      orderIndex, 
      createdAt: '', 
      updatedAt: '' 
    };
  });

  const handleFileUpload = async (orderIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeMB = file.size / 1024 / 1024;
    console.log(`Selected hero image: ${fileSizeMB.toFixed(2)}MB`);
    
    if (fileSizeMB > 50) {
      alert('File is too large. Maximum size is 50MB.');
      // Reset file input
      const inputRef = fileInputRefs.current[orderIndex - 1];
      if (inputRef) {
        inputRef.value = '';
      }
      return;
    }

    const result = await mutations.replace.mutate({ orderIndex, file });
    if (result) {
      refetch();
    }
    
    // Reset file input
    const inputRef = fileInputRefs.current[orderIndex - 1];
    if (inputRef) {
      inputRef.value = '';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage Hero Images</h2>
          <p className="text-sm text-gray-600 mt-1">Upload exactly 7 hero images for the homepage slider. Click on any image to replace it.</p>
        </div>
      </div>

      {mutations.replace.loading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
            <p className="text-blue-600">Processing and uploading image... This may take a moment for large files.</p>
          </div>
        </div>
      )}

      {mutations.replace.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {mutations.replace.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {heroSlots.map((slot, index) => (
          <div key={slot.orderIndex} className="bg-gray-50 rounded-lg p-4">
            <div className="relative">
              {slot.imageUrl ? (
                <img
                  src={slot.imageUrl}
                  alt={`Hero image ${slot.orderIndex}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No image</p>
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                Position {slot.orderIndex}
              </div>
            </div>
            
            <label className="w-full px-3 py-2 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 transition-colors cursor-pointer flex items-center justify-center gap-2">
              <Upload className="h-4 w-4" />
              {slot.imageUrl ? 'Replace Image' : 'Upload Image'}
              <input 
                ref={el => fileInputRefs.current[index] = el}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => handleFileUpload(slot.orderIndex, e)}
                disabled={mutations.replace.loading}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>Note:</strong> Hero images will be automatically compressed and optimized before uploading to maintain fast loading times.
          Recommended image size: 1920x1080 pixels or similar aspect ratio.
        </p>
      </div>
    </div>
  );
};

// About Tab Component
const AboutTab = () => {
  const { data: aboutData, loading, refetch } = useAbout();
  const mutations = useAboutMutations();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<AboutMe>>({});
  const profileImageInputRef = React.useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading about information...</p>
      </div>
    );
  }

  const aboutMe = aboutData?.aboutMe;

  const handleEdit = () => {
    setFormData(aboutMe || {});
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Clean and sanitize the form data
      const sanitizedData: Partial<AboutMe> = {};
      
      // Only include fields that have values
      if (formData.authorName !== undefined && formData.authorName !== '') {
        sanitizedData.authorName = String(formData.authorName).trim();
      }
      
      if (formData.description !== undefined) {
        sanitizedData.description = String(formData.description || '').trim();
      }
      
      if (formData.location !== undefined) {
        sanitizedData.location = String(formData.location || '').trim();
      }
      
      // Handle numeric fields with proper conversion
      if (formData.yearsExperience !== undefined) {
        const years = Number(formData.yearsExperience);
        sanitizedData.yearsExperience = isNaN(years) ? 0 : Math.max(0, Math.floor(years));
      }
      
      if (formData.couplesServed !== undefined) {
        const couples = Number(formData.couplesServed);
        sanitizedData.couplesServed = isNaN(couples) ? 0 : Math.max(0, Math.floor(couples));
      }
      
      if (formData.awardsCount !== undefined) {
        const awards = Number(formData.awardsCount);
        sanitizedData.awardsCount = isNaN(awards) ? 0 : Math.max(0, Math.floor(awards));
      }
      
      console.log('📝 Original form data:', JSON.stringify(formData, null, 2));
      console.log('📝 Sanitized data for API:', JSON.stringify(sanitizedData, null, 2));
      console.log('📝 Data types:', {
        authorName: typeof sanitizedData.authorName,
        yearsExperience: typeof sanitizedData.yearsExperience,
        couplesServed: typeof sanitizedData.couplesServed,
        awardsCount: typeof sanitizedData.awardsCount,
      });
      
      const result = await mutations.update.mutate(sanitizedData);
      console.log('✅ Save result:', result);
      if (result) {
        setIsEditing(false);
        await refetch();
      }
    } catch (error) {
      console.error('❌ Failed to save about information:', error);
      alert(`Failed to save changes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleInputChange = (field: keyof AboutMe, value: string | number) => {
    console.log(`📝 Input change: ${field} = ${value} (type: ${typeof value})`);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > 50) {
      alert('File is too large. Maximum size is 50MB.');
      if (profileImageInputRef.current) {
        profileImageInputRef.current.value = '';
      }
      return;
    }

    try {
      console.log('Uploading profile image...');
      const result = await mutations.uploadProfile.mutate(file);
      console.log('Profile upload result:', result);
      if (result) {
        await refetch();
        if (profileImageInputRef.current) {
          profileImageInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      alert('Failed to upload profile image. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage About Information</h2>
        {!isEditing && (
          <button 
            onClick={handleEdit}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Information
          </button>
        )}
      </div>

      {/* Error Display */}
      {(mutations.update.error || mutations.uploadProfile.error) && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            Error: {mutations.update.error || mutations.uploadProfile.error}
          </p>
        </div>
      )}
      
      {aboutMe ? (
        <div className="space-y-6">
          {/* Profile Image Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Profile Image</h3>
            <div className="flex items-center gap-6">
              {aboutMe.profileImageUrl ? (
                <div className="relative">
                  <img
                    src={aboutMe.profileImageUrl}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-lg border flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No image</p>
                  </div>
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-3">
                  {aboutMe.profileImageUrl ? 'Current profile image' : 'No profile image uploaded'}
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {aboutMe.profileImageUrl ? 'Replace Image' : 'Upload Image'}
                  <input 
                    ref={profileImageInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfileImageUpload}
                    disabled={mutations.uploadProfile.loading}
                  />
                </label>
                {mutations.uploadProfile.loading && (
                  <div className="mt-2 flex items-center text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Uploading and processing image...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={isEditing ? (formData.authorName || '') : aboutMe.authorName}
                onChange={(e) => handleInputChange('authorName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={isEditing ? (formData.location || '') : (aboutMe.location || '')}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years Experience
              </label>
              <input
                type="number"
                value={isEditing ? (formData.yearsExperience || 0) : aboutMe.yearsExperience}
                onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couples Served
              </label>
              <input
                type="number"
                value={isEditing ? (formData.couplesServed || 0) : aboutMe.couplesServed}
                onChange={(e) => handleInputChange('couplesServed', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Awards Count
              </label>
              <input
                type="number"
                value={isEditing ? (formData.awardsCount || 0) : aboutMe.awardsCount}
                onChange={(e) => handleInputChange('awardsCount', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={isEditing ? (formData.description || '') : (aboutMe.description || '')}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              readOnly={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleSave}
                disabled={mutations.update.loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {mutations.update.loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                disabled={mutations.update.loading}
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No about information found.</p>
          <button 
            onClick={handleEdit}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Create About Information
          </button>
        </div>
      )}
    </div>
  );
};

// Couple Form Modal Component
const CoupleFormModal = ({ 
  couple, 
  isEdit, 
  onClose, 
  onSuccess, 
  mutations 
}: {
  couple: Couple | null;
  isEdit: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mutations: ReturnType<typeof useCouplesMutations>;
}) => {
  const [formData, setFormData] = useState({
    names: couple?.names || '',
    title: couple?.title || '',
    description: couple?.description || '',
    location: couple?.location || '',
    date: couple?.date || '',
    videoUrl: couple?.videoUrl || '',
  });
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [selectedImagePreviews, setSelectedImagePreviews] = useState<string[]>([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const { progress: uploadProgress, isUploading, startUpload, updateProgress, finishUpload, resetUpload } = useUploadProgress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First create/update the couple without images
    let result;
    if (isEdit && couple) {
      result = await mutations.update.mutate({ id: couple.id, data: formData });
    } else {
      result = await mutations.create.mutate(formData);
    }
    
    if (result && result.couple) {
      // If we have gallery images (new couple), upload them
      if (!isEdit && galleryImages && galleryImages.length > 0) {
        await handleImageUpload(result.couple.id);
      } else {
        onSuccess();
      }
    }
  };

  const handleImageUpload = async (coupleId: number) => {
    if (!galleryImages || galleryImages.length === 0) return;

    startUpload();

    try {
      // Simulate progress updates
      updateProgress(20);
      
      // Upload images
      const uploadResult = await mutations.uploadImages.mutate({ 
        coupleId, 
        files: galleryImages 
      });

      updateProgress(80);

      if (uploadResult && uploadResult.images && uploadResult.images.length > 0) {
        // Set the first uploaded image as cover image
        const firstImageUrl = uploadResult.images[0].imageUrl;
        await mutations.update.mutate({ 
          id: coupleId, 
          data: { coverImageUrl: firstImageUrl } 
        });
      }

      finishUpload();
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
      resetUpload();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Check each file size
      const oversizedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const fileSizeMB = files[i].size / 1024 / 1024;
        if (fileSizeMB > 50) {
          oversizedFiles.push(files[i].name);
        }
      }
      
      if (oversizedFiles.length > 0) {
        alert(`The following files are too large (max 50MB):\n${oversizedFiles.join('\n')}`);
        e.target.value = ''; // Clear the input
        return;
      }
      
      setGalleryImages(files);
      
      // Create preview URLs
      const previews: string[] = [];
      for (let i = 0; i < Math.min(files.length, 5); i++) { // Show max 5 previews
        previews.push(URL.createObjectURL(files[i]));
      }
      setSelectedImagePreviews(previews);
    } else {
      setGalleryImages(null);
      setSelectedImagePreviews([]);
    }
  };

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      selectedImagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedImagePreviews]);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {isEdit ? 'Edit Couple' : 'Add New Couple'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isUploading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          {(mutations.create.error || mutations.update.error || mutations.uploadImages.error) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">
                Error: {mutations.create.error || mutations.update.error || mutations.uploadImages.error}
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {isUploading && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                <p className="text-blue-600 text-sm">
                  Uploading and processing images... ({uploadProgress}%)
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couple Names *
              </label>
              <input
                type="text"
                value={formData.names}
                onChange={(e) => handleInputChange('names', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                required
                disabled={isUploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                required
                disabled={isUploading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                disabled={isUploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                placeholder="e.g., December 15, 2023"
                disabled={isUploading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              disabled={isUploading}
            />
          </div>

            {/* Gallery Images - Only show for new couples */}
            {!isEdit && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                  required
                  disabled={isUploading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload multiple images for the gallery. The first image will be used as the cover image. 
                  Files larger than 10MB will be automatically compressed.
                </p>
                
                {/* Image Previews */}
                {selectedImagePreviews.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">
                      Selected images ({galleryImages?.length} total):
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {selectedImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-16 object-cover rounded border"
                          />
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-1 rounded">
                              Cover
                            </div>
                          )}
                        </div>
                      ))}
                      {galleryImages && galleryImages.length > 5 && (
                        <div className="w-full h-16 bg-gray-100 rounded border flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            +{galleryImages.length - 5} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Edit Gallery Button - Only show for existing couples */}
            {isEdit && couple && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Management
                </label>
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(true)}
                  className="w-full px-4 py-2 bg-amber-100 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
                  disabled={isUploading}
                >
                  <Image className="h-4 w-4" />
                  Edit Gallery ({couple.images?.length || 0} images)
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Manage gallery images, set cover photo, and add new images.
                </p>
              </div>
            )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Drive Video ID (optional)
            </label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => handleInputChange('videoUrl', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              placeholder="1BxfqkrQ7I0abcdefghijk (Google Drive video ID)"
              disabled={isUploading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the Google Drive video ID. You can find this in the Google Drive video URL after '/file/d/' and before '/view'.
            </p>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutations.create.loading || mutations.update.loading || isUploading}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {isUploading
                ? 'Uploading...'
                : mutations.create.loading || mutations.update.loading 
                  ? 'Saving...' 
                  : (isEdit ? 'Update Couple' : 'Create Couple')
              }
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* Gallery Management Modal */}
    {showGalleryModal && couple && (
      <GalleryManagementModal
        couple={couple}
        onClose={() => setShowGalleryModal(false)}
        onSuccess={() => {
          setShowGalleryModal(false);
          onSuccess(); // Refresh the parent data
        }}
        mutations={mutations}
      />
    )}
  </>
  );
};

// Gallery Management Modal Component
const GalleryManagementModal = ({
  couple,
  onClose,
  onSuccess,
  mutations
}: {
  couple: Couple;
  onClose: () => void;
  onSuccess: () => void;
  mutations: ReturnType<typeof useCouplesMutations>;
}) => {
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [selectedImagePreviews, setSelectedImagePreviews] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [operationLoading, setOperationLoading] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { progress: uploadProgress, isUploading, startUpload, updateProgress, finishUpload, resetUpload } = useUploadProgress();
  const { data: coupleData, refetch } = useCouple(couple.id);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown !== null) {
        const target = event.target as Element;
        if (!target.closest('.dropdown-container')) {
          setShowDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const currentCouple = coupleData?.couple || couple;
  const images = currentCouple.images || [];

  const handleAddImages = async () => {
    if (!galleryImages || galleryImages.length === 0) {
      console.log('No images selected');
      alert('Please select images first');
      return;
    }

    console.log('Starting upload of', galleryImages.length, 'images for couple', couple.id);
    startUpload();

    try {
      updateProgress(20);
      
      console.log('Calling uploadImages mutation...');
      const uploadResult = await mutations.uploadImages.mutate({ 
        coupleId: couple.id, 
        files: galleryImages 
      });

      console.log('Upload result:', uploadResult);
      updateProgress(100);

      if (uploadResult) {
        console.log('Upload successful, refreshing data...');
        await refetch();
        setGalleryImages(null);
        setSelectedImagePreviews([]);
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        console.log('Upload process completed');
      }

      finishUpload();
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`);
      resetUpload();
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        setOperationLoading(imageId);
        const result = await mutations.deleteImage.mutate(imageId);
        if (result) {
          await refetch();
          setShowDropdown(null);
        }
      } catch (error) {
        console.error('Failed to delete image:', error);
        alert('Failed to delete image. Please try again.');
      } finally {
        setOperationLoading(null);
      }
    }
  };

  const handleSetAsCover = async (imageUrl: string, imageId: number) => {
    try {
      setOperationLoading(imageId);
      const result = await mutations.update.mutate({ 
        id: couple.id, 
        data: { coverImageUrl: imageUrl } 
      });
      if (result) {
        await refetch();
        setShowDropdown(null);
        onSuccess(); // Refresh parent data
      }
    } catch (error) {
      console.error('Failed to set cover image:', error);
      alert('Failed to set cover image. Please try again.');
    } finally {
      setOperationLoading(null);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log('Files selected:', files?.length || 0);
    
    if (files) {
      // Check each file size
      const oversizedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const fileSizeMB = files[i].size / 1024 / 1024;
        console.log(`File ${i + 1}: ${files[i].name}, Size: ${fileSizeMB.toFixed(2)}MB`);
        if (fileSizeMB > 50) {
          oversizedFiles.push(files[i].name);
        }
      }
      
      if (oversizedFiles.length > 0) {
        alert(`The following files are too large (max 50MB):\n${oversizedFiles.join('\n')}`);
        e.target.value = '';
        return;
      }
      
      setGalleryImages(files);
      console.log('Gallery images set:', files.length);
      
      // Create preview URLs
      const previews: string[] = [];
      for (let i = 0; i < Math.min(files.length, 3); i++) {
        previews.push(URL.createObjectURL(files[i]));
      }
      setSelectedImagePreviews(previews);
      console.log('Preview URLs created:', previews.length);
    } else {
      setGalleryImages(null);
      setSelectedImagePreviews([]);
      console.log('No files selected, cleared state');
    }
  };

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      selectedImagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedImagePreviews]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            Gallery Management - {couple.names}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isUploading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Error Display */}
        {(mutations.uploadImages.error || mutations.deleteImage.error || mutations.update.error) && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">
              Error: {mutations.uploadImages.error || mutations.deleteImage.error || mutations.update.error}
            </p>
          </div>
        )}

        {/* Add New Images Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-medium mb-4">Add New Images</h4>
          
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImagesChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              disabled={isUploading}
            />
            
            {selectedImagePreviews.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Selected images ({galleryImages?.length} total):
                </p>
                <div className="flex gap-2 mb-4">
                  {selectedImagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))}
                  {galleryImages && galleryImages.length > 3 && (
                    <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                      <span className="text-xs text-gray-500">
                        +{galleryImages.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {galleryImages && galleryImages.length > 0 && (
              <button
                onClick={() => {
                  console.log('Upload button clicked, files:', galleryImages.length);
                  handleAddImages();
                }}
                disabled={isUploading}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : `Upload ${galleryImages.length} Image${galleryImages.length > 1 ? 's' : ''}`}
              </button>
            )}

            {/* Progress Bar */}
            {isUploading && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                  <p className="text-blue-600 text-sm">
                    Uploading and processing images... ({uploadProgress}%)
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Current Images Grid */}
        <div>
          <h4 className="text-lg font-medium mb-4">
            Current Gallery ({images.length} images)
          </h4>
          
          {images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No images in gallery. Add some images above.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((image) => (
                  <div key={image.id} className="relative group dropdown-container">
                    <img
                      src={image.imageUrl}
                      alt={`Gallery image ${image.orderIndex}`}
                      className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setShowDropdown(showDropdown === image.id ? null : image.id)}
                    />
                    
                    {/* Cover Image Badge */}
                    {currentCouple.coverImageUrl === image.imageUrl && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                        Cover
                      </div>
                    )}

                    {/* 3 Dots Menu Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDropdown(showDropdown === image.id ? null : image.id);
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center w-4 h-4">
                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-600 rounded-full mt-0.5"></div>
                        <div className="w-1 h-1 bg-gray-600 rounded-full mt-0.5"></div>
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown === image.id && (
                      <div className="absolute top-10 right-2 bg-white rounded-lg shadow-lg border z-50 min-w-[140px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetAsCover(image.imageUrl, image.id);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg flex items-center gap-2"
                          disabled={currentCouple.coverImageUrl === image.imageUrl || operationLoading === image.id}
                        >
                          {operationLoading === image.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-amber-600"></div>
                          ) : (
                            <Image className="h-3 w-3" />
                          )}
                          {currentCouple.coverImageUrl === image.imageUrl ? 'Current Cover' : 'Set as Cover'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image.id);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 rounded-b-lg flex items-center gap-2"
                          disabled={operationLoading === image.id}
                        >
                          {operationLoading === image.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6 mt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            disabled={isUploading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;

