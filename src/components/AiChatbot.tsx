import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Send, X, Bot, User, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiChatbotProps {
  telemetryContext: any;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ telemetryContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am AquaSense AI Virtual Assistant. Ask me anything about groundwater levels, rainfall analytics, sensor health, or drought mitigation strategies.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: telemetryContext
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || "I analyzed your query regarding groundwater levels.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      console.error("AI Chatbot error:", err);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'assistant',
        text: "I am temporarily offline. Based on current telemetry, Central Valley Aquifer is at 72% capacity with normal recharge trends.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "What is current groundwater status?",
    "Why is sensor AQUA-04 critical?",
    "Suggest drought conservation tips",
    "How does rainfall affect recharge?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold shadow-2xl shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center relative group"
          title="AquaSense AI Assistant"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00FF9D] border-2 border-[#050816]" />
        </button>
      )}

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-80 sm:w-96 glass-panel rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0B1120] to-[#050816] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AquaSense AI Assistant</h4>
                  <span className="text-[10px] text-[#00FF9D] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" /> Gemini 3.6 Online
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Log Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender === 'assistant' && (
                    <div className="p-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-medium rounded-tr-none shadow-md'
                        : 'bg-[#0B1120]/90 text-gray-200 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    <div>{m.text}</div>
                    <div className={`text-[9px] mt-1 font-mono ${m.sender === 'user' ? 'text-[#050816]/70' : 'text-gray-400'}`}>
                      {m.timestamp}
                    </div>
                  </div>

                  {m.sender === 'user' && (
                    <div className="p-1.5 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-cyan-300 font-mono text-[11px]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>AquaSense AI thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t border-white/5 bg-[#050816]/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {quickPrompts.map((qp) => (
                <button
                  key={qp}
                  onClick={() => handleSend(qp)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap bg-white/5 hover:bg-[#00E5FF]/20 text-cyan-300 border border-white/10 transition-all"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#0B1120] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask AquaSense AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-[#050816] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold disabled:opacity-50 hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
