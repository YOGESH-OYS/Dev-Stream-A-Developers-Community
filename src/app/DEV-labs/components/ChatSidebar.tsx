'use client';

import { useState, useEffect, useCallback } from 'react';
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
  Loader2,
} from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  difficulty?: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chats', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats ?? []);
      } else {
        setChats([]);
      }
    } catch {
      setChats([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    if (isOpen) fetchChats();
  }, [isOpen, fetchChats]);

  const handleEditChat = (chat: Chat) => {
    setSelectedChat(chat);
    setEditingTitle(chat.title);
    setShowSettings(true);
  };

  const handleDeleteChat = async (chatId: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/chats/${chatId}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setChats((prev) => prev.filter((c) => c.id !== chatId));
        setShowSettings(false);
        setSelectedChat(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedChat || !editingTitle.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/chats/${selectedChat.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: editingTitle.trim() }),
      });
      if (res.ok) {
        setChats((prev) =>
          prev.map((c) => (c.id === selectedChat.id ? { ...c, title: editingTitle.trim() } : c))
        );
      }
      setShowSettings(false);
      setSelectedChat(null);
      setEditingTitle('');
    } finally {
      setSaving(false);
    }
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

        {/* 3. Chat List - Scrollable */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Loading chats...</span>
            </div>
          ) : (
            <>
              {chats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/DEV-labs/compiler?brainnerd_devlabs_=${chat.id}`}
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
                      <span className="truncate">Lesson</span>
                      {chat.difficulty && (
                        <span className="text-purple-400/80 capitalize">{chat.difficulty}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Open in compiler</span>
                      <Code className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}

              <Link
                href="/DEV-labs"
                className="block w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center gap-2 text-purple-300 group-hover:text-white">
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Start New Chat</span>
                </div>
              </Link>
            </>
          )}
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
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Save Changes
                  </button>
                  <button
                    onClick={() => handleDeleteChat(selectedChat.id)}
                    disabled={saving}
                    className="flex-1 bg-red-600/20 border border-red-500/30 text-red-400 py-2 px-4 rounded-lg hover:bg-red-600/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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