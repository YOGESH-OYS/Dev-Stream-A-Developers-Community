'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Video,
  Code,
  Clock
} from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  videoUrl: string;
  createdAt: string;
  lastAccessed: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Dummy chat data with enough entries to force scroll
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', title: 'React Hooks Tutorial', videoUrl: 'https://youtube.com/watch?v=example1', createdAt: '2024-01-15', lastAccessed: '2024-01-20' },
    { id: '2', title: 'JavaScript Async/Await', videoUrl: 'https://youtube.com/watch?v=example2', createdAt: '2024-01-18', lastAccessed: '2024-01-19' },
    { id: '3', title: 'Next.js App Router Guide', videoUrl: 'https://youtube.com/watch?v=example3', createdAt: '2024-01-20', lastAccessed: '2024-01-21' },
    { id: '4', title: 'TypeScript Advanced Patterns', videoUrl: 'https://youtube.com/watch?v=example4', createdAt: '2024-01-22', lastAccessed: '2024-01-23' },
    { id: '5', title: 'Node.js Backend Development', videoUrl: 'https://youtube.com/watch?v=example5', createdAt: '2024-01-24', lastAccessed: '2024-01-25' },
    { id: '6', title: 'MongoDB Database Design', videoUrl: 'https://youtube.com/watch?v=example6', createdAt: '2024-01-26', lastAccessed: '2024-01-27' },
    { id: '7', title: 'GraphQL API Development', videoUrl: 'https://youtube.com/watch?v=example7', createdAt: '2024-01-28', lastAccessed: '2024-01-29' },
    { id: '8', title: 'Docker Containerization', videoUrl: 'https://youtube.com/watch?v=example8', createdAt: '2024-01-30', lastAccessed: '2024-01-31' },
    { id: '9', title: 'Kubernetes Orchestration', videoUrl: '...', createdAt: '2024-02-01', lastAccessed: '2024-02-02' },
    { id: '10', title: 'Serverless Functions', videoUrl: '...', createdAt: '2024-02-03', lastAccessed: '2024-02-04' },
    { id: '11', title: 'Go Language Basics', videoUrl: '...', createdAt: '2024-02-05', lastAccessed: '2024-02-06' },
    { id: '12', title: 'Advanced CSS Grid', videoUrl: '...', createdAt: '2024-02-07', lastAccessed: '2024-02-08' },
  ]);

  // ... (handleEditChat, handleDeleteChat, handleSaveEdit, formatDate functions remain the same)
  const handleEditChat = (chat: Chat) => {
    setSelectedChat(chat);
    setEditingTitle(chat.title);
    setShowSettings(true);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    setShowSettings(false);
    setSelectedChat(null);
  };

  const handleSaveEdit = () => {
    if (selectedChat && editingTitle.trim()) {
      setChats(chats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, title: editingTitle.trim() }
          : chat
      ));
    }
    setShowSettings(false);
    setSelectedChat(null);
    setEditingTitle('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <>
      {/* Floating Logo Button */}
      <button
        onClick={onToggle}
        className={`fixed top-6 left-6 z-50 bg-slate-800/50 backdrop-blur-xl border border-white/20 rounded-xl p-3 text-white hover:bg-slate-700/50 transition-all duration-500 hover:scale-105 ${
          isOpen ? 'translate-x-115' : 'translate-x-0'
        }`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* 1. Sidebar Container: Sets fixed full height (h-screen) */}
      <div className={`fixed top-0 left-0 h-screen w-115 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-500 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* 2. Header: Fixed height h-20 (5rem) */}
        <div className="flex items-center justify-between h-20 p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            Video Chats
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Chat List - Scrollable: Explicitly calculates height (100vh - 5rem header height) */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto p-4 space-y-3">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/DEV-labs/compiler?video=${encodeURIComponent(chat.videoUrl)}`}
              className="block group"
            >
              <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium text-sm group-hover:text-purple-200 transition-colors line-clamp-2">
                    {chat.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditChat(chat);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white transition-all"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Video className="w-3 h-3" />
                  <span className="truncate">YouTube Video</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Created {formatDate(chat.createdAt)}</span>
                  </div>
                  <Code className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}

          {/* Add New Chat Button */}
          <button className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 group">
            <div className="flex items-center justify-center gap-2 text-purple-300 group-hover:text-white">
              <Plus className="w-4 h-4" />
              <span className="font-medium">Start New Chat</span>
            </div>
          </button>
        </div>
      </div>

      {/* Settings Modal (remains unchanged) */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Chat Settings</h3>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setSelectedChat(null);
                  setEditingTitle('');
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedChat ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chat Title
                  </label>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full bg-slate-700/50 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="Enter chat title"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => handleDeleteChat(selectedChat.id)}
                    className="flex-1 bg-red-600/20 border border-red-500/30 text-red-400 py-2 px-4 rounded-lg hover:bg-red-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Settings className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p>Select a chat to edit or delete</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}