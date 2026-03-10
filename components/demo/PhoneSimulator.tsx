"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, PhoneCall, ChevronLeft, MoreHorizontal, Info } from "lucide-react";
import type { ChatMessage } from "@/lib/openrouter";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function PhoneSimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey, sorry we missed your call! This is Apex Plumbing. How can we help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const historyRaw: ChatMessage[] = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history: historyRaw }),
      });

      const data = await res.json();
      
      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Oops, something went wrong simulating the network. Try again!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mx-auto w-[340px] overflow-hidden rounded-[3rem] border-[8px] border-slate-200 bg-white shadow-2xl relative shadow-slate-900/20 sm:w-[380px] ring-1 ring-slate-950/5">
      {/* iOS Top Bar */}
      <div className="absolute top-0 w-full pt-1.5 z-20 bg-slate-100/80 backdrop-blur-md pb-2 border-b border-slate-200">
        <div className="flex h-5 w-full items-center justify-between px-6 text-[11px] font-semibold tracking-wide text-slate-800">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 54 33" className="w-[18px]"><path d="M49 9.5c0-2-1.6-3.7-3.6-3.7H3.6C1.6 5.8 0 7.5 0 9.5v14c0 2 1.6 3.7 3.6 3.7h41.8c2 0 3.6-1.7 3.6-3.7v-14zm3.8 2.3c.7 0 1.2.6 1.2 1.3v6.8c0 .7-.5 1.3-1.2 1.3V11.8z" fill="#1e293b"/></svg>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center text-sky-500">
              <ChevronLeft className="h-6 w-6" />
              <span className="text-[17px] -ml-1">Filters</span>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
              <span className="text-xs font-semibold text-slate-500">AP</span>
            </div>
            <span className="mt-0.5 text-[10px] font-medium text-slate-600">Apex Plumbing &gt;</span>
          </div>
          <button className="text-sky-500 pr-2">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="h-[600px] w-full bg-slate-50 overflow-y-auto px-4 pt-28 pb-4 scroll-smooth"
      >
        <div className="flex flex-col justify-end min-h-full space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug shadow-sm ${
                    msg.role === "user"
                      ? "bg-sky-500 text-white rounded-tr-sm"
                      : "bg-white text-slate-800 rounded-tl-sm border border-slate-100"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-sm">
                <motion.div
                  className="h-2 w-2 rounded-full bg-slate-300"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full bg-slate-300"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full bg-slate-300"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* iMessage Input Bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-3 pb-6 pt-3">
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400">
            <MoreHorizontal className="h-5 w-5" />
          </button>
          
          <div className="flex-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 flex items-center shadow-sm relative">
            <input
              type="text"
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-slate-400 py-1"
              placeholder="Text Message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            {inputValue && (
              <button 
                onClick={handleSend}
                className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm"
              >
                <ArrowUpIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        {/* iOS Home Bar */}
        <div className="mt-5 mx-auto h-1.5 w-1/3 rounded-full bg-slate-300" />
      </div>
    </div>
  );
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}
