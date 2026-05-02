import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Maximize2, Minimize2 } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

export function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { currentUser } = useAuth();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const q = query(
      collection(db, 'chat_messages'),
      orderBy('timestamp', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      
      // Auto scroll to bottom
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });

    return () => unsubscribe();
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'chat_messages'), {
        text: newMessage,
        senderId: currentUser.uid,
        senderName: currentUser.email || 'User',
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMaximized && isOpen 
        ? 'inset-0' 
        : 'bottom-6 right-6 flex flex-col items-end'
    }`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`flex flex-col shadow-2xl overflow-hidden border border-white/20 bg-white/80 backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300 ${
          isMaximized 
            ? 'w-full h-full rounded-none' 
            : 'mb-4 w-80 sm:w-96 h-[500px] rounded-2xl'
        }`}>
          {/* Header */}
          <div className="p-4 bg-indigo-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <h3 className="font-semibold">Team Chat</h3>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsMaximized(false);
                }}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <MessageCircle size={32} strokeWidth={1.5} />
                <p className="text-sm">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === currentUser.uid;
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1 mb-1 px-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isMe ? 'text-slate-500' : 'text-indigo-600'
                      }`}>
                        {isMe ? 'You' : (msg.senderName || 'Anonymous').split('@')[0]}
                      </span>
                    </div>
                    <div 
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all ${
                        isMe 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input */}
          <form 
            onSubmit={handleSendMessage}
            className={`p-4 border-t border-slate-100 bg-white/50 ${
              isMaximized ? 'pb-8 sm:pb-4' : ''
            }`}
          >
            <div className={`flex items-center space-x-2 ${isMaximized ? 'max-w-4xl mx-auto' : ''}`}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-sm shadow-indigo-200"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button - Only show if not maximized and not open, or if not maximized */}
      {!isMaximized && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
            isOpen 
              ? 'bg-white text-slate-600 rotate-90 shadow-indigo-100' 
              : 'bg-indigo-600 text-white shadow-indigo-300'
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      )}
    </div>
  );
}
