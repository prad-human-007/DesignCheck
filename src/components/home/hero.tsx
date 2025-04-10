'use client'

import React, { useState } from 'react';
import {Send, Menu, ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown'
import { Sidebar } from './Sidebar';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Hero = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage: Message = {
      role: 'user' ,
      content: inputValue,
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

    if (!response.ok || !response.body) {
      console.error("Failed to get response stream");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

  
    const read = async () => {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
     
  
        // Optional: stream updates to the UI
        setMessages(prevMessages => {
          const updated = [...prevMessages];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant') {
            last.content += chunk;
          } else {
            updated.push({ role: 'assistant', content: chunk });
          }
          return [...updated];
        });
      }
    };

    await read();

    // const data = await response.json();
    // console.log("Response from server:", data);
    // setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.message }]);

  };
  
  const pastConversations = [
    { id: 1, title: "Lift Information", date: "2 days ago" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        pastConversations={pastConversations}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className= {` bg-[#1e1e1e] border-b border-gray-700 p-4 flex items-center justify-between`}>
          <button 
            className="p-1 rounded-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ArrowLeft size={20} color="white" /> : <Menu size={20} color="white" />}
          </button>
          <h1 className="text-white text-xl font-bold">ArchGPT</h1>
          <div></div>
        </header>
        
        {/* Messages Area */}
        <div className="bg-[#1e1e1e] flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-lg max-w-xl text-lg ${message.role == 'user' ? 'bg-[#2a2b32] text-white' : 'bg-[#1e1e1e] text-white'}`}>
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="bg-[#1e1e1e] p-4 text-white  ">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-center border border-gray-400 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-1	bg-[#343541] p-3 focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="p-3 hover:bg-black text-gray-700"
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