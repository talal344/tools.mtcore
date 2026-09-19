'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './VbaBotClient.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

const VbaBotClient = () => {
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('vba_bot_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
        if (parsed.length > 0) {
          setCurrentSessionId(parsed[0].id);
        }
      } catch (e) {
        console.error('Failed to parse sessions', e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('vba_bot_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Scroll to bottom
  const currentSession = sessions.find(s => s.id === currentSessionId);

  useEffect(() => {
    if (scrollRef.current && currentSession && currentSession.messages.length > 0) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [sessions, currentSessionId, isLoading, currentSession]);

  const startNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Conversation',
      messages: [],
      updatedAt: Date.now(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newId);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    if (currentSessionId === id) {
      setCurrentSessionId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      setSessions([]);
      setCurrentSessionId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    let targetSessionId = currentSessionId;
    let updatedSessions = [...sessions];

    // Create new session if none exists
    if (!targetSessionId) {
      const newId = Date.now().toString();
      const newSession: ChatSession = {
        id: newId,
        title: input.slice(0, 30) + '...',
        messages: [],
        updatedAt: Date.now(),
      };
      updatedSessions = [newSession, ...updatedSessions];
      targetSessionId = newId;
      setCurrentSessionId(newId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    // Update session with user message
    updatedSessions = updatedSessions.map(s => {
      if (s.id === targetSessionId) {
        return {
          ...s,
          messages: [...s.messages, userMessage],
          updatedAt: Date.now(),
          title: s.messages.length === 0 ? input.slice(0, 40) + (input.length > 40 ? '...' : '') : s.title,
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tools/vba-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: updatedSessions.find(s => s.id === targetSessionId)?.messages 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI response failed');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: Date.now(),
      };

      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return { ...s, messages: [...s.messages, assistantMessage], updatedAt: Date.now() };
        }
        return s;
      }));
    } catch (error: unknown) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'AI response failed';
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          const systemErrorMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: `❌ **Configuration Error**\n\n${errorMessage}\n\n**If you are seeing this on Vercel:**\n1. Go to your Project Settings > Environment Variables.\n2. Add \`GROQ_API_KEY\` with your Groq API key.\n3. Redeploy your application.\n\n**If you are running locally:**\nEnsure \`GROQ_API_KEY\` is set in your \`.env.local\` and restart the server.`,
            timestamp: Date.now(),
          };
          return { ...s, messages: [...s.messages, systemErrorMessage], updatedAt: Date.now() };
        }
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const [toast, setToast] = useState<{ show: boolean; title: string; body: string } | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startToastTimer = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast(prev => prev ? { ...prev, show: false } : null);
    }, 3000); // 3 seconds auto-hide
  };

  const showToast = (title: string, body: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, title, body });
    startToastTimer();
  };

  const handleMouseEnterToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  };

  const handleMouseLeaveToast = () => {
    startToastTimer();
  };

  const handleDownload = async (code: string, format: 'mac' | 'windows' | 'notebook') => {
    try {
      const response = await fetch('/api/tools/vba-bot/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code, 
          format, 
          title: currentSession?.title 
        }),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const ext = format === 'mac' ? '.command' : format === 'windows' ? '.vbs' : '.txt';
      const safeTitle = (currentSession?.title || 'MT_VBA_Tool').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      
      a.download = `${safeTitle}${ext}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      if (format === 'mac') {
        showToast('Mac Automated Setup', 'Double-click the downloaded <strong>.command</strong> file to instantly prepare Excel with your AI code.');
      } else if (format === 'windows') {
        showToast('Windows Automated Setup', 'Double-click the downloaded <strong>.vbs</strong> file to instantly prepare Excel with your AI code.');
      } else {
        showToast('Notebook Exported', 'Your VBA code and instructions have been saved as a professional developer note.');
      }
    } catch (error) {
      console.error('Download error:', error);
      showToast('Error', 'Failed to generate file. Please use the Copy button instead.');
    }
  };

  const formatContent = (content: string) => {
    // Basic code block formatting
    const parts = content.split(/```/);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        const langPart = part.split('\n')[0];
        const lang = langPart.trim() || 'vba';
        const code = part.substring(langPart.length).trim();
        return (
          <div key={i} className={styles.codeBlockWrapper}>
            <div className={styles.codeHeader}>
              <div className={styles.langBadge}>{lang}</div>
              <div className={styles.codeActions}>
                <button onClick={() => navigator.clipboard.writeText(code).then(() => showToast('Success', 'Code copied to clipboard!'))} className={styles.copyBtn}>
                  📋 Copy
                </button>
                <div className={styles.downloadDropdown}>
                  <button onClick={() => handleDownload(code, 'mac')} className={styles.platformBtn} title="Mac Automation">🍎 Mac</button>
                  <button onClick={() => handleDownload(code, 'windows')} className={styles.platformBtn} title="Windows Automation">🪟 Win</button>
                  <button onClick={() => handleDownload(code, 'notebook')} className={styles.platformBtn} title="Download as Note">📝 Note</button>
                </div>
              </div>
            </div>
            <pre className={styles.codeBlock}><code>{code}</code></pre>
          </div>
        );
      }
      return part.split('\n').map((line, j) => (
        <p key={`${i}-${j}`} className={styles.textPart}>{line}</p>
      ));
    });
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button className={styles.newChatBtn} onClick={startNewChat}>+ New Chat</button>
          <button className={styles.clearBtn} onClick={clearAllHistory} title="Clear All History">🗑️</button>
        </div>
        <div className={styles.historyList}>
          {sessions.map(session => (
            <div 
              key={session.id} 
              className={`${styles.historyItem} ${currentSessionId === session.id ? styles.active : ''}`}
              onClick={() => setCurrentSessionId(session.id)}
            >
              <span className={styles.historyTitle}>{session.title}</span>
              <button className={styles.deleteBtn} onClick={(e) => deleteSession(session.id, e)}>×</button>
            </div>
          ))}
          {sessions.length === 0 && <div className={styles.emptyHistory}>No history yet</div>}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.chatArea}>
        {!currentSessionId || !currentSession || currentSession.messages.length === 0 ? (
          <div className={styles.welcome}>
            <div className={styles.botIcon}>🤖</div>
            <h2>AI Excel VBA Assistant</h2>
            <p>Tell me what you want to do in Excel, and I&apos;ll write the VBA code for you.</p>
            <div className={styles.examples}>
              <button onClick={() => setInput('Create a macro to sort Sheet1 by Column A')}>&quot;Sort Sheet1 by Column A...&quot;</button>
              <button onClick={() => setInput('Generate VBA to send email via Outlook')}>&quot;Send email via Outlook...&quot;</button>
              <button onClick={() => setInput('VBA to find and replace text in all sheets')}>&quot;Find and replace in all... &quot;</button>
            </div>
          </div>
        ) : (
          <div className={styles.messageList} ref={scrollRef}>
            {currentSession.messages.map(msg => (
              <div key={msg.id} className={`${styles.message} ${styles[msg.role]}`}>
                <div className={styles.avatar}>{msg.role === 'user' ? '👤' : '🤖'}</div>
                <div className={styles.messageContent}>
                  {formatContent(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.avatar}>🤖</div>
                <div className={styles.loading}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input area */}
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <textarea 
              rows={1}
              placeholder="Ask me for VBA code..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className={styles.sendBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </form>
      </div>

      {/* Themed Toast Notification - Globally Positioned */}
      {toast && (
        <div 
          className={`${styles.toast} ${toast.show ? styles.show : ''}`}
          onMouseEnter={handleMouseEnterToast}
          onMouseLeave={handleMouseLeaveToast}
        >
          <div className={styles.toastHeader}>
            <h4>{toast.title}</h4>
            <button 
              className={styles.toastClose} 
              onClick={() => setToast(prev => prev ? { ...prev, show: false } : null)}
            >
              ×
            </button>
          </div>
          <div 
            className={styles.toastBody} 
            dangerouslySetInnerHTML={{ __html: toast.body }}
          />
        </div>
      )}
    </div>
  );
};

export default VbaBotClient;
