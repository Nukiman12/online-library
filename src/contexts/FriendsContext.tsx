import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface FriendsContextType {
  allUsers: User[];
  friends: User[];
  friendRequests: User[];
  sentRequests: User[];
  addFriend: (userId: string) => void;
  acceptFriendRequest: (userId: string) => void;
  rejectFriendRequest: (userId: string) => void;
  removeFriend: (userId: string) => void;
  searchUsers: (query: string) => User[];
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
};

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const currentUserId = '1'; // TODO: Get from AuthContext

  useEffect(() => {
    // Mock users
    const mockUsers: User[] = [
      {
        id: '2',
        username: 'Анна Смирнова',
        email: 'anna@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Anna+Smirnova&background=6366f1&color=fff',
        createdAt: new Date().toISOString(),
        bio: 'Люблю классическую литературу',
        friends: ['1'],
        friendRequests: [],
      },
      {
        id: '3',
        username: 'Дмитрий Петров',
        email: 'dmitry@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Dmitry+Petrov&background=ec4899&color=fff',
        createdAt: new Date().toISOString(),
        bio: 'Фанат научной фантастики',
        friends: [],
        friendRequests: ['1'],
      },
      {
        id: '4',
        username: 'Елена Волкова',
        email: 'elena@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Elena+Volkova&background=10b981&color=fff',
        createdAt: new Date().toISOString(),
        bio: 'Читаю детективы',
        friends: ['1'],
        friendRequests: [],
      },
      {
        id: '5',
        username: 'Иван Кузнецов',
        email: 'ivan@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Ivan+Kuznetsov&background=f59e0b&color=fff',
        createdAt: new Date().toISOString(),
        bio: 'Обожаю исторические романы',
        friends: [],
        friendRequests: [],
      },
    ];
    setAllUsers(mockUsers);
  }, []);

  const friends = allUsers.filter(user => user.friends.includes(currentUserId));
  const friendRequests = allUsers.filter(user => user.friendRequests.includes(currentUserId));
  const sentRequests = allUsers.filter(user => 
    allUsers.find(u => u.id === currentUserId)?.friendRequests.includes(user.id)
  );

  const addFriend = (userId: string) => {
    setAllUsers(users => 
      users.map(user => 
        user.id === userId 
          ? { ...user, friendRequests: [...user.friendRequests, currentUserId] }
          : user
      )
    );
  };

  const acceptFriendRequest = (userId: string) => {
    setAllUsers(users => 
      users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            friends: [...user.friends, currentUserId],
            friendRequests: user.friendRequests.filter(id => id !== currentUserId),
          };
        }
        if (user.id === currentUserId) {
          return {
            ...user,
            friends: [...user.friends, userId],
            friendRequests: user.friendRequests.filter(id => id !== userId),
          };
        }
        return user;
      })
    );
  };

  const rejectFriendRequest = (userId: string) => {
    setAllUsers(users => 
      users.map(user => 
        user.id === currentUserId
          ? { ...user, friendRequests: user.friendRequests.filter(id => id !== userId) }
          : user
      )
    );
  };

  const removeFriend = (userId: string) => {
    setAllUsers(users => 
      users.map(user => ({
        ...user,
        friends: user.friends.filter(id => id !== userId && id !== currentUserId),
      }))
    );
  };

  const searchUsers = (query: string) => {
    return allUsers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <FriendsContext.Provider
      value={{
        allUsers,
        friends,
        friendRequests,
        sentRequests,
        addFriend,
        acceptFriendRequest,
        rejectFriendRequest,
        removeFriend,
        searchUsers,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

