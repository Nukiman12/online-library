export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  bio?: string;
  friends: string[]; // IDs of friends
  friendRequests: string[]; // IDs of pending requests
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  fileUrl?: string;
  fileData?: string; // Base64 encoded file for local storage
  uploadedBy: string;
  uploadedAt: string;
  genre: string;
  pages?: number;
  language: string;
  sharedWith: string[]; // user IDs
  isPublic: boolean;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface ShareRequest {
  id: string;
  bookId: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

