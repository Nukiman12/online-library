import React, { useState } from 'react';
import { Search, UserPlus, UserCheck, UserX, MessageCircle, BookOpen } from 'lucide-react';
import { useFriends } from '../contexts/FriendsContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Friends: React.FC = () => {
  const { friends, friendRequests, allUsers, addFriend, acceptFriendRequest, rejectFriendRequest, removeFriend } = useFriends();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'find'>('friends');
  const navigate = useNavigate();

  const searchResults = allUsers.filter(user => {
    if (user.id === '1') return false; // Exclude current user
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const isFriend = friends.some(f => f.id === user.id);
    const hasRequest = friendRequests.some(r => r.id === user.id);
    return matchesSearch && !isFriend && !hasRequest;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Друзья</h1>
        <p className="text-gray-600 dark:text-gray-400">Управляйте вашими друзьями и связями</p>
      </motion.div>

      {/* Tabs */}
      <div className="glass-card p-2 mb-6 inline-flex rounded-xl">
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'friends'
              ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Мои друзья ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all relative ${
            activeTab === 'requests'
              ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Запросы ({friendRequests.length})
          {friendRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {friendRequests.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('find')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'find'
              ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Найти друзей
        </button>
      </div>

      {/* Friends List */}
      {activeTab === 'friends' && (
        <div className="space-y-4">
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={friend.avatar}
                      alt={friend.username}
                      className="w-16 h-16 rounded-full ring-4 ring-primary-500/20"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{friend.username}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{friend.email}</p>
                      {friend.bio && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{friend.bio}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/chat')}
                      className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-200 dark:hover:bg-primary-900/50"
                      title="Написать сообщение"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50"
                      title="Книги друга"
                    >
                      <BookOpen className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFriend(friend.id)}
                      className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50"
                      title="Удалить из друзей"
                    >
                      <UserX className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="glass-card p-12 text-center">
              <UserPlus className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">У вас пока нет друзей</p>
              <button
                onClick={() => setActiveTab('find')}
                className="btn-primary mt-4"
              >
                Найти друзей
              </button>
            </div>
          )}
        </div>
      )}

      {/* Friend Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {friendRequests.length > 0 ? (
            friendRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={request.avatar}
                      alt={request.username}
                      className="w-16 h-16 rounded-full ring-4 ring-primary-500/20"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{request.username}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{request.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => acceptFriendRequest(request.id)}
                      className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 font-semibold shadow-lg flex items-center gap-2"
                    >
                      <UserCheck className="w-5 h-5" />
                      Принять
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => rejectFriendRequest(request.id)}
                      className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 font-semibold shadow-lg"
                    >
                      Отклонить
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="glass-card p-12 text-center">
              <UserCheck className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">Нет новых запросов в друзья</p>
            </div>
          )}
        </div>
      )}

      {/* Find Friends */}
      {activeTab === 'find' && (
        <div>
          <div className="glass-card p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск пользователей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </div>

          <div className="space-y-4">
            {searchResults.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-16 h-16 rounded-full ring-4 ring-primary-500/20"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{user.username}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      {user.bio && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{user.bio}</p>
                      )}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addFriend(user.id)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Добавить в друзья
                  </motion.button>
                </div>
              </motion.div>
            ))}
            {searchQuery && searchResults.length === 0 && (
              <div className="glass-card p-12 text-center">
                <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">Пользователи не найдены</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;

