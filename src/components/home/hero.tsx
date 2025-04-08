'use client'

import React, { useState } from 'react';
import { ChevronDown, MessageSquare, PlusCircle, Settings, LogOut, Send, Menu, X, ChevronRight, ArrowLeft } from 'lucide-react';

const Hero = () => {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! How can I help you today?", isUser: false },
    { id: 2, content: "I'd like to learn about React and Tailwind.", isUser: true },
    { id: 3, content: "Great choice! React is a JavaScript library for building user interfaces, and Tailwind CSS is a utility-first CSS framework that makes styling much faster.", isUser: false },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      content: inputValue,
      isUser: true
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    const response = await fetch('/api/chat-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [...messages, newUserMessage] }),
    });

    const data = await response.json();
    console.log("Response from server:", data);
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, content: data.message, isUser: false }]);

  };
  
  const pastConversations = [
    { id: 1, title: "React Components", date: "2 days ago" },
    { id: 2, title: "JavaScript Promises", date: "5 days ago" },
    { id: 3, title: "CSS Grid Layout", date: "1 week ago" },
    { id: 4, title: "API Integration", date: "2 weeks ago" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}>
        {/* New Chat Button */}
        <button className="flex items-center space-x-2 p-4 border border-gray-700 rounded-md m-3 hover:bg-gray-800">
          <PlusCircle size={18} />
          <span>New Chat</span>
        </button>
        
        {/* Past Conversations */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <h2 className="px-3 py-2 text-sm text-gray-400 font-medium">Previous Chats</h2>
            <ul>
              {pastConversations.map(convo => (
                <li key={convo.id} className="px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <MessageSquare size={18} className="text-gray-400" />
                    <div className="flex-1 truncate">
                      <span className="block">{convo.title}</span>
                      <span className="text-xs text-gray-500">{convo.date}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* User Section */}
        <div className="p-3 border-t border-gray-700">
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-medium">U</span>
            </div>
            <span className="flex-1">User Account</span>
          </div>
          <div className="mt-2 space-y-1">
            <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-md text-left">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-md text-left">
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button 
            className="p-1 rounded-md hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ArrowLeft size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-bold">ChatGPT Clone</h1>
          <div className="w-8"></div> {/* Placeholder for symmetry */}
        </header>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-500">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-lg max-w-xl ${message.isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-1 p-3 focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="p-3 bg-white hover:bg-gray-100 text-gray-700"
                disabled={!inputValue.trim()}
              >
                <Send size={20} className={inputValue.trim() ? "text-indigo-600" : "text-gray-400"} />
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;