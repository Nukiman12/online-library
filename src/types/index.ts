export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  created_at: string;
  bio?: string;
  friends: string[]; // IDs of friends
  friend_requests: string[]; // IDs of pending requests
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url?: string;
  file_url?: string;
  file_data?: string; // Base64 encoded file for local storage
  uploaded_by: string;
  uploaded_at: string;
  genre: string;
  pages?: number;
  language: string;
  shared_with: string[]; // user IDs
  is_public: boolean;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  user_id: string;
  book_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
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
  book_id: string;
  from_user_id: string;
  to_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

