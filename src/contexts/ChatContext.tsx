import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Message, Chat } from '../types';

interface ChatContextType {
  chats: Chat[];
  messages: Message[];
  sendMessage: (receiverId: string, content: string) => void;
  getMessagesForChat: (chatId: string) => Message[];
  markAsRead: (messageId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load mock chats
    const mockChats: Chat[] = [
      {
        id: '1',
        participants: [
          {
            id: '2',
            username: 'Анна',
            email: 'anna@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Anna&background=0ea5e9&color=fff',
            created_at: new Date().toISOString(),
            friends: ['1'],
            friend_requests: [],
          },
        ],
        unreadCount: 2,
      },
    ];
    setChats(mockChats);

    const mockMessages: Message[] = [
      {
        id: '1',
        sender_id: '2',
        receiver_id: '1',
        content: 'Привет! Ты читал "Войну и мир"?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        id: '2',
        sender_id: '1',
        receiver_id: '2',
        content: 'Да, отличная книга!',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: true,
      },
    ];
    setMessages(mockMessages);
  }, []);

  const sendMessage = (receiverId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender_id: '1', // TODO: use actual user ID
      receiver_id: receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages([...messages, newMessage]);
  };

  const getMessagesForChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return [];
    
    const participantIds = chat.participants.map(p => p.id);
    return messages.filter(
      m => (m.sender_id === '1' && participantIds.includes(m.receiver_id)) ||
           (m.receiver_id === '1' && participantIds.includes(m.sender_id))
    );
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(m => (m.id === messageId ? { ...m, read: true } : m)));
  };

  return (
    <ChatContext.Provider
      value={{ chats, messages, sendMessage, getMessagesForChat, markAsRead }}
    >
      {children}
    </ChatContext.Provider>
  );
};

