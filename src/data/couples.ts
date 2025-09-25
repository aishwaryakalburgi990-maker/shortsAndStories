export interface Couple {
  id: string;
  names: string;
  title: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  vimeoId?: string;
  videoDuration?: string;
  videoDescription?: string;
}

export const couples: Couple[] = [
  {
    id: 'arjun-priya',
    names: 'Arjun & Priya',
    title: 'A Royal Rajasthani Celebration',
    date: 'December 15, 2023',
    location: 'Jaipur, Rajasthan',
    description: 'A magnificent celebration of love set against the backdrop of Rajasthan\'s royal heritage. Arjun and Priya\'s wedding was a perfect blend of traditional ceremonies and contemporary elegance.',
    coverImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200',
    vimeoId: '123456789',
    videoDuration: '4:32',
    videoDescription: 'A cinematic journey through three days of celebration',
    gallery: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253868/pexels-photo-2253868.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253844/pexels-photo-2253844.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729800/pexels-photo-1729800.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253869/pexels-photo-2253869.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 'rohit-sneha',
    names: 'Rohit & Sneha',
    title: 'Modern Mumbai Romance',
    date: 'November 8, 2023',
    location: 'Mumbai, Maharashtra',
    description: 'A contemporary celebration where tradition meets modernity. Rohit and Sneha\'s wedding showcased the vibrant spirit of Mumbai with intimate moments and grand celebrations.',
    coverImage: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1200',
    vimeoId: '987654321',
    videoDuration: '5:18',
    videoDescription: 'Urban elegance meets traditional values',
    gallery: [
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253868/pexels-photo-2253868.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 'vikram-asha',
    names: 'Vikram & Asha',
    title: 'Himalayan Hill Station Wedding',
    date: 'October 22, 2023',
    location: 'Shimla, Himachal Pradesh',
    description: 'A magical destination wedding nestled in the hills of Himachal Pradesh. Vikram and Asha chose the serene mountains as the backdrop for their intimate celebration.',
    coverImage: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=1200',
    vimeoId: '456789123',
    videoDuration: '6:45',
    videoDescription: 'Love among the mountains',
    gallery: [
      'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253868/pexels-photo-2253868.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 'karan-meera',
    names: 'Karan & Meera',
    title: 'Lakeside Palace Wedding',
    date: 'September 12, 2023',
    location: 'Udaipur, Rajasthan',
    description: 'An intimate ceremony by the lakes of Udaipur, where every moment was filled with heartfelt emotions and timeless beauty.',
    coverImage: 'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=1200',
    vimeoId: '789123456',
    videoDuration: '3:56',
    videoDescription: 'Intimate moments by the lake',
    gallery: [
      'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253868/pexels-photo-2253868.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 'amit-kavya',
    names: 'Amit & Kavya',
    title: 'Beachside Goa Celebration',
    date: 'August 5, 2023',
    location: 'Goa',
    description: 'A vibrant beach wedding celebrating the union of two free spirits. The golden sands and ocean breeze created the perfect setting for Amit and Kavya\'s joyous celebration.',
    coverImage: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1200',
    vimeoId: '321654987',
    videoDuration: '7:12',
    videoDescription: 'Sun, sand, and endless love',
    gallery: [
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253868/pexels-photo-2253868.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 'raj-pooja',
    names: 'Raj & Pooja',
    title: 'Classic Delhi Elegance',
    date: 'July 18, 2023',
    location: 'Delhi',
    description: 'A timeless celebration where classic elegance met contemporary style. Raj and Pooja\'s wedding was a perfect showcase of Delhi\'s grandeur and sophistication.',
    coverImage: 'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=1200',
    vimeoId: '654987321',
    videoDuration: '5:03',
    videoDescription: 'Timeless elegance in the capital',
    gallery: [
      'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253868/pexels-photo-2253868.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];