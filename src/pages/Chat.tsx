import React, { useState, useRef, useEffect } from 'react';
import { Send, Search } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Chat: React.FC = () => {
  const { chats, getMessagesForChat, sendMessage } = useChat();
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    chats.length > 0 ? chats[0].id : null
  );
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(c => c.id === selectedChatId);
  const messages = selectedChatId ? getMessagesForChat(selectedChatId) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChat) return;

    const receiverId = selectedChat.participants[0].id;
    sendMessage(receiverId, messageText);
    setMessageText('');
  };

  const filteredChats = chats.filter(chat =>
    chat.participants.some(p =>
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="card h-full overflow-hidden">
        <div className="flex h-full">
          {/* Chats List */}
          <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>
            </div>

            {/* Chats */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length > 0 ? (
                filteredChats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                      selectedChatId === chat.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={chat.participants[0].avatar}
                        alt={chat.participants[0].username}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p className="font-medium text-gray-900 truncate">
                            {chat.participants[0].username}
                          </p>
                          {chat.unreadCount > 0 && (
                            <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                        {chat.lastMessage && (
                          <p className="text-sm text-gray-500 truncate">
                            {chat.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Чаты не найдены
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 flex flex-col hidden md:flex">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedChat.participants[0].avatar}
                      alt={selectedChat.participants[0].username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedChat.participants[0].username}
                      </p>
                      <p className="text-sm text-gray-500">Онлайн</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => {
                    const isOwn = message.senderId === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            isOwn
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwn ? 'text-primary-100' : 'text-gray-500'
                            }`}
                          >
                            {format(new Date(message.timestamp), 'HH:mm', { locale: ru })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="input-field flex-1"
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Выберите чат для начала общения
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

