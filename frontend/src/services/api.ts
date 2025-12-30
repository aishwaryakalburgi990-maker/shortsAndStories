// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types
export interface Couple {
  id: number;
  title: string;
  names: string;
  description: string;
  location: string;
  date: string;
  coverImageUrl: string;
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
  images: CoupleImage[];
}

export interface CoupleImage {
  id: number;
  coupleId: number;
  imageUrl: string;
  orderIndex: number;
  createdAt: string;
}

export interface HeroImage {
  id: number;
  imageUrl: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface AboutMe {
  id: number;
  authorName: string;
  description?: string;
  yearsExperience: number;
  couplesServed: number;
  awardsCount: number;
  profileImageUrl?: string;
  location?: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: AuthUser;
}

// API Error handling
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}

// Couples API
export const couplesApi = {
  // Get all couples (public)
  getAll: (): Promise<{ couples: Couple[] }> => 
    apiRequest('/couples'),

  // Get couples with videos (public)
  getWithVideos: (): Promise<{ couples: Couple[] }> => 
    apiRequest('/couples/videos'),

  // Get couple by ID (public)
  getById: (id: number): Promise<{ couple: Couple }> => 
    apiRequest(`/couples/${id}`),

  // Create couple (admin)
  create: (data: { names: string; title: string; description?: string; location?: string; date?: string; videoUrl?: string }): Promise<{ couple: Couple }> =>
    apiRequest('/couples', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update couple (admin)
  update: (id: number, data: { names?: string; title?: string; description?: string; location?: string; date?: string; videoUrl?: string; coverImageUrl?: string }): Promise<{ couple: Couple }> =>
    apiRequest(`/couples/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete couple (admin)
  delete: (id: number): Promise<{ message: string }> =>
    apiRequest(`/couples/${id}`, {
      method: 'DELETE',
    }),

  // Upload couple images (admin)
  uploadImages: (coupleId: number, files: FileList): Promise<{ message: string; images: any[] }> => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    return apiRequest(`/couples/${coupleId}/images`, {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  },

  // Upload cover image (admin)
  uploadCover: (coupleId: number, file: File): Promise<{ message: string; coverImageUrl: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    return apiRequest(`/couples/${coupleId}/cover`, {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  },

  // Delete couple image (admin)
  deleteImage: (imageId: number): Promise<{ message: string }> =>
    apiRequest(`/couples/images/${imageId}`, {
      method: 'DELETE',
    }),

  // Reorder couple images (admin)
  reorderImages: (coupleId: number, images: { id: number; orderIndex: number }[]): Promise<{ message: string; images: CoupleImage[] }> =>
    apiRequest(`/couples/${coupleId}/images/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ images }),
    }),
};

// Hero API
export const heroApi = {
  // Get hero images (public)
  getAll: (): Promise<{ heroImages: HeroImage[] }> => 
    apiRequest('/hero'),

  // Replace hero image (admin) - for specific position
  replace: (orderIndex: number, file: File): Promise<{ message: string; heroImage: HeroImage }> => {
    const formData = new FormData();
    formData.append('image', file);

    return apiRequest(`/hero/replace/${orderIndex}`, {
      method: 'PUT',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  },

  // Reorder hero images (admin)
  reorder: (images: { id: number; orderIndex: number }[]): Promise<{ message: string; heroImages: HeroImage[] }> =>
    apiRequest('/hero/reorder', {
      method: 'PUT',
      body: JSON.stringify({ images }),
    }),
};

// About API
export const aboutApi = {
  // Get about information (public)
  get: (): Promise<{ aboutMe: AboutMe }> => 
    apiRequest('/about'),

  // Update about information (admin)
  update: (data: Partial<AboutMe>): Promise<{ message: string; aboutMe: AboutMe }> =>
    apiRequest('/about', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Upload profile image (admin)
  uploadProfile: (file: File): Promise<{ message: string; profileImageUrl: string; aboutMe: AboutMe }> => {
    const formData = new FormData();
    formData.append('image', file);

    return apiRequest('/about/upload-profile', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  },
};

// Auth API
export const authApi = {
  // Login
  login: (email: string, password: string): Promise<LoginResponse> =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Logout
  logout: (): Promise<{ message: string }> =>
    apiRequest('/auth/logout', {
      method: 'POST',
    }),

  // Get profile
  getProfile: (): Promise<{ user: AuthUser }> =>
    apiRequest('/auth/profile'),
};

// Auth utilities
export const authUtils = {
  // Store token
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token);
  },

  // Get token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  // Remove token
  removeToken: () => {
    localStorage.removeItem('auth_token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },
};