import { useState } from "react";
import type { Page } from "../types";

interface GenesysAIProps {
  onNavigate: (page: Page) => void;
}

type AIView = "chat" | "workspace" | "resources" | "research";

interface Message {
  id: number;
  from: "user" | "ai";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: "ai",
    text: "Welcome to GENESYS AI — your academic intelligence assistant. I'm here to help you with course analysis, document processing, research guidance, and study strategies. What would you like to work on today?",
    time: "10:00",
  },
];

const suggestedPrompts = [
  "Summarize this course in 15 pages",
  "Create revision notes from my PDF",
  "Generate exam questions from this chapter",
  "Create a study plan from this syllabus",
  "Explain this concept like I'm a beginner",
  "Extract key formulas and definitions",
  "Compare these two academic documents",
  "Help me structure my dissertation",
];

const conversations = [
  { id: 1, title: "Distributed Systems — Course Summary", date: "Today" },
  { id: 2, title: "Machine Learning — Exam Prep", date: "Yesterday" },
  { id: 3, title: "Thesis Chapter 3 Analysis", date: "Nov 6" },
  { id: 4, title: "Algorithm Complexity Notes", date: "Nov 4" },
  { id: 5, title: "Research Methodology Guide", date: "Nov 2" },
];

const resources = [
  { title: "Introduction to Distributed Systems", author: "M. van Steen", type: "Textbook", access: "Free", pages: 596, img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=100&fit=crop&auto=format" },
  { title: "Pattern Recognition and ML", author: "Bishop", type: "Textbook", access: "Free PDF", pages: 738, img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=80&h=100&fit=crop&auto=format" },
  { title: "Deep Learning", author: "Goodfellow et al.", type: "Textbook", access: "Free online", pages: 800, img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=80&h=100&fit=crop&auto=format" },
  { title: "The Algorithm Design Manual", author: "Skiena", type: "Textbook", access: "Paid", pages: 748, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=80&h=100&fit=crop&auto=format" },
  { title: "Attention Is All You Need", author: "Vaswani et al.", type: "Paper", access: "Free", pages: 15, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=100&fit=crop&auto=format" },
  { title: "MapReduce: Simplified Data Processing", author: "Dean & Ghemawat", type: "Paper", access: "Free", pages: 13, img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=80&h=100&fit=crop&auto=format" },
];

const researchTypes = [
  { label: "Mémoire / Dissertation", icon: "📋", desc: "Final year academic thesis" },
  { label: "Research Project", icon: "🔬", desc: "Supervised research work" },
  { label: "Projet Tutoré", icon: "👨‍🏫", desc: "Tutored group project" },
  { label: "Academic Report", icon: "📄", desc: "Formal academic writing" },
  { label: "Literature Review", icon: "📚", desc: "Systematic literature survey" },
  { label: "Scientific Article", icon: "🧪", desc: "Peer-reviewed publication" },
];

function DocumentUpload({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "done">("idle");
  const [docName] = useState("CS6.824 — Distributed Systems — Full Course.pdf");

  const simulateUpload = () => {
    setStatus("uploading");
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setStatus("processing");
        setTimeout(() => {
          setStatus("done");
          setUploading(false);
        }, 1500);
      }
      setProgress(Math.round(p));
    }, 200);
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#0a0a0a]">Document Upload</h3>
        <div className="text-[10px] text-[#9e9e9e]">Max. 500 pages · PDF, DOCX</div>
      </div>

      {status === "idle" ? (
        <button
          onClick={simulateUpload}
          className="w-full border-2 border-dashed border-[#ebebeb] rounded-xl p-8 flex flex-col items-center gap-3 hover:border-[#d4d4d4] hover:bg-[#fafafa] transition-all group"
        >
          <div className="w-12 h-12 bg-[#f5f5f5] rounded-xl flex items-center justify-center group-hover:bg-[#ebebeb] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#0a0a0a]">Upload your academic document</div>
            <div className="text-xs text-[#9e9e9e] mt-0.5">PDF, DOCX, TXT — up to 200+ pages</div>
          </div>
        </button>
      ) : (
        <div className="space-y-4">
          {/* File info */}
          <div className="flex items-start gap-3 p-3 bg-[#f5f5f5] rounded-xl">
            <div className="w-10 h-12 bg-[#0a0a0a] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[8px] font-bold">PDF</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#0a0a0a] truncate">{docName}</div>
              <div className="text-[10px] text-[#9e9e9e] mt-0.5">214 pages · 18.4 MB</div>
              {/* Progress */}
              {status === "uploading" && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#6b6b6b]">Uploading...</span>
                    <span className="text-[10px] font-mono text-[#0a0a0a]">{progress}%</span>
                  </div>
                  <div className="h-1 bg-[#ebebeb] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0a0a0a] rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
              {status === "processing" && (
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1 h-3 bg-[#0a0a0a] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#6b6b6b]">Analysing document structure...</span>
                </div>
              )}
              {status === "done" && (
                <div className="flex items-center gap-1.5 mt-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-[10px] text-[#0a0a0a] font-medium">Analysis complete — 214 pages processed</span>
                </div>
              )}
            </div>
          </div>

          {/* Analysis results */}
          {status === "done" && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#0a0a0a] mb-2">Document Analysis</div>
              {[
                { label: "Executive Summary", ready: true },
                { label: "Chapter-by-chapter breakdown (12 chapters)", ready: true },
                { label: "Key concepts & definitions (84 extracted)", ready: true },
                { label: "Important formulas (31 identified)", ready: true },
                { label: "Potential exam questions (suggested: 45)", ready: true },
                { label: "Revision notes (ready to generate)", ready: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 py-1.5 border-b border-[#f5f5f5] last:border-0">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0
                    ${item.ready ? "bg-[#0a0a0a]" : "border border-[#d4d4d4]"}`}>
                    {item.ready && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                  <span className="text-xs text-[#0a0a0a]">{item.label}</span>
                </div>
              ))}
              <button
                onClick={() => onNavigate("ai-workspace")}
                className="w-full mt-3 py-2.5 bg-[#0a0a0a] text-white text-xs font-semibold rounded-xl hover:bg-[#1a1a1a] transition-colors"
              >
                Open Document Workspace →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GenesysAI({ onNavigate }: GenesysAIProps) {
  const [view, setView] = useState<AIView>("chat");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeConvo] = useState(0);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: messages.length + 1, from: "user", text: input, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) };
    setMessages([...messages, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiReply: Message = {
        id: messages.length + 2,
        from: "ai",
        text: "I understand your request. Let me analyze that for you. Based on what you've shared, here's my academic guidance: I'd recommend approaching this systematically — starting with core concepts, then building toward advanced applications. Would you like me to generate structured revision notes or focus on a specific aspect?",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 800);
  };

  const views: { id: AIView; label: string }[] = [
    { id: "chat", label: "AI Chat" },
    { id: "workspace", label: "Document Workspace" },
    { id: "resources", label: "Academic Resources" },
    { id: "research", label: "Research & Thesis" },
  ];

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="hidden md:flex flex-col w-[240px] bg-white border-r border-[#ebebeb] flex-shrink-0">
          {/* Header */}
          <div className="p-4 border-b border-[#ebebeb]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <span className="text-sm font-semibold text-[#0a0a0a]">GENESYS AI</span>
            </div>
            <button className="w-full py-2 bg-[#0a0a0a] text-white text-xs font-semibold rounded-xl hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Conversation
            </button>
          </div>

          {/* View tabs */}
          <div className="p-2 border-b border-[#ebebeb] space-y-0.5">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all
                  ${view === v.id ? "bg-[#f5f5f5] text-[#0a0a0a]" : "text-[#6b6b6b] hover:bg-[#fafafa]"}`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Conversation history */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-[10px] text-[#9e9e9e] font-semibold px-3 py-2">Recent</div>
            {conversations.map((c, idx) => (
              <button
                key={c.id}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all group mb-0.5
                  ${activeConvo === idx ? "bg-[#f5f5f5]" : "hover:bg-[#f5f5f5]"}`}
              >
                <div className="text-xs font-medium text-[#0a0a0a] truncate">{c.title}</div>
                <div className="text-[9px] text-[#9e9e9e]">{c.date}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-[#ebebeb] px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex w-8 h-8 rounded-lg hover:bg-[#f5f5f5] items-center justify-center text-[#9e9e9e] hover:text-[#0a0a0a] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>

          <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${view === v.id ? "bg-[#0a0a0a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f5f5]"}`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat view */}
        {view === "chat" && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Document upload area */}
              <div className="max-w-[700px] mx-auto w-full">
                <DocumentUpload onNavigate={onNavigate} />
              </div>

              {/* Messages */}
              <div className="max-w-[700px] mx-auto w-full space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.from === "ai" && (
                      <div className="w-8 h-8 bg-[#0a0a0a] rounded-xl flex items-center justify-center flex-shrink-0 self-start mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                      ${msg.from === "ai" ? "bg-white border border-[#ebebeb] text-[#0a0a0a]" : "bg-[#0a0a0a] text-white"}`}
                    >
                      {msg.text}
                      <div className={`text-[10px] mt-1 ${msg.from === "ai" ? "text-[#9e9e9e]" : "text-white/50"}`}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested prompts */}
              {messages.length <= 1 && (
                <div className="max-w-[700px] mx-auto w-full">
                  <div className="text-xs font-semibold text-[#9e9e9e] mb-3">Suggested prompts</div>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => setInput(p)}
                        className="text-left p-3 bg-white border border-[#ebebeb] rounded-xl text-xs text-[#6b6b6b] hover:border-[#d4d4d4] hover:text-[#0a0a0a] transition-all"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#ebebeb] bg-white">
              <div className="max-w-[700px] mx-auto">
                {/* Custom instructions */}
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Custom instructions (e.g. 'Focus on exam-relevant concepts, summarize in 15 pages')"
                    className="w-full px-3 py-2 bg-[#f5f5f5] rounded-xl text-xs text-[#6b6b6b] placeholder-[#9e9e9e] focus:outline-none focus:bg-white focus:border focus:border-[#ebebeb] transition-all"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex gap-1">
                    <button className="w-9 h-9 rounded-xl hover:bg-[#f5f5f5] flex items-center justify-center text-[#9e9e9e] hover:text-[#0a0a0a] transition-all" title="Upload PDF">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </button>
                    <button className="w-9 h-9 rounded-xl hover:bg-[#f5f5f5] flex items-center justify-center text-[#9e9e9e] hover:text-[#0a0a0a] transition-all" title="Upload image">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    </button>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                    placeholder="Ask GENESYS AI anything about your studies..."
                    rows={1}
                    className="flex-1 px-4 py-2.5 bg-[#f5f5f5] rounded-2xl text-sm text-[#0a0a0a] placeholder-[#9e9e9e] focus:outline-none resize-none"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim()}
                    className="w-10 h-10 bg-[#0a0a0a] rounded-xl flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#1a1a1a] transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </button>
                </div>
                <div className="text-[10px] text-[#9e9e9e] text-center mt-2">
                  GENESYS AI assists with academic work. Always verify information with your course materials.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workspace view */}
        {view === "workspace" && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Document */}
            <div className="w-[260px] border-r border-[#ebebeb] bg-white flex flex-col flex-shrink-0">
              <div className="p-3 border-b border-[#ebebeb]">
                <div className="text-xs font-semibold text-[#0a0a0a] mb-1">Document</div>
                <div className="text-[10px] text-[#9e9e9e]">CS6.824 — Full Course.pdf</div>
                <div className="text-[10px] text-[#9e9e9e]">214 pages</div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <div className="text-[10px] font-semibold text-[#9e9e9e] px-2 py-1 mb-1">Table of Contents</div>
                {[
                  "1. Introduction to Distributed Computing",
                  "2. Time, Clocks & Global State",
                  "3. Distributed Mutual Exclusion",
                  "4. Distributed Deadlock Detection",
                  "5. Message Ordering & Group Communication",
                  "6. Consensus Algorithms",
                  "7. Fault Tolerance",
                  "8. Replication Protocols",
                  "9. Distributed File Systems",
                  "10. Peer-to-Peer Systems",
                  "11. Cloud Computing Fundamentals",
                  "12. Case Studies",
                ].map((ch, i) => (
                  <button key={ch} className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] transition-all mb-0.5
                    ${i === 5 ? "bg-[#0a0a0a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f5f5]"}`}>
                    {ch}
                  </button>
                ))}
              </div>
              {/* Page thumbnails */}
              <div className="p-2 border-t border-[#ebebeb]">
                <div className="flex gap-1 overflow-x-auto">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`w-10 h-12 flex-shrink-0 rounded bg-[#f5f5f5] border flex items-center justify-center cursor-pointer
                      ${i === 2 ? "border-[#0a0a0a]" : "border-transparent hover:border-[#d4d4d4]"}`}>
                      <span className="text-[8px] text-[#9e9e9e]">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: AI conversation */}
            <div className="flex-1 flex flex-col bg-[#fafafa] min-w-0">
              <div className="p-3 border-b border-[#ebebeb] bg-white">
                <div className="text-xs font-semibold text-[#0a0a0a]">AI Analysis — Chapter 6: Consensus Algorithms</div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-white border border-[#ebebeb] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    </div>
                    <div className="text-xs font-semibold text-[#0a0a0a]">Chapter Summary</div>
                  </div>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed">
                    Chapter 6 covers consensus algorithms — the fundamental problem of getting distributed processes to agree on a value despite failures. The chapter introduces the FLP impossibility theorem, then covers practical solutions including Paxos, Raft, and Byzantine fault-tolerant protocols. Key insight: consensus is impossible in an asynchronous system with even one faulty process — practical systems handle this through timing assumptions.
                  </p>
                </div>
                <div className="bg-white border border-[#ebebeb] rounded-2xl p-4">
                  <div className="text-xs font-semibold text-[#0a0a0a] mb-2">Key Concepts Extracted</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Paxos Protocol", "Raft Consensus", "FLP Impossibility", "Byzantine Generals", "Leader Election", "Log Replication", "Safety vs Liveness"].map((t) => (
                      <span key={t} className="text-[10px] bg-[#f5f5f5] text-[#0a0a0a] px-2 py-1 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-[#ebebeb] bg-white">
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 bg-[#f5f5f5] rounded-xl text-xs placeholder-[#9e9e9e] focus:outline-none"
                    placeholder="Ask about this chapter..."
                  />
                  <button className="w-8 h-8 bg-[#0a0a0a] rounded-xl flex items-center justify-center text-white hover:bg-[#1a1a1a] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Notes & Concepts */}
            <div className="hidden lg:flex w-[240px] border-l border-[#ebebeb] bg-white flex-col flex-shrink-0">
              <div className="p-3 border-b border-[#ebebeb]">
                <div className="text-xs font-semibold text-[#0a0a0a]">My Notes</div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {[
                  { type: "Important", text: "Raft is simpler than Paxos — study this for exam" },
                  { type: "Formula", text: "Quorum = ⌊N/2⌋ + 1" },
                  { type: "Question", text: "How does Raft handle network partitions?" },
                  { type: "Definition", text: "Consensus: agreement by all non-faulty nodes" },
                ].map((note) => (
                  <div key={note.text} className="p-2.5 border border-[#ebebeb] rounded-xl">
                    <div className="text-[9px] font-semibold text-[#9e9e9e] mb-1">{note.type}</div>
                    <div className="text-[11px] text-[#0a0a0a] leading-relaxed">{note.text}</div>
                  </div>
                ))}
                <button className="w-full py-2 border border-dashed border-[#ebebeb] rounded-xl text-[10px] text-[#9e9e9e] hover:border-[#d4d4d4] transition-all flex items-center justify-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Add note
                </button>
              </div>
              {/* Exam questions */}
              <div className="p-3 border-t border-[#ebebeb]">
                <div className="text-[10px] font-semibold text-[#0a0a0a] mb-2">Potential Exam Q's</div>
                {[
                  "Explain the Raft leader election process.",
                  "Why is FLP impossibility significant?",
                ].map((q) => (
                  <div key={q} className="text-[10px] text-[#6b6b6b] bg-[#f5f5f5] rounded-lg p-2 mb-1.5 leading-relaxed">{q}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources view */}
        {view === "resources" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-[700px] mx-auto">
              <div className="text-sm font-semibold text-[#0a0a0a] mb-4">Academic Resources</div>
              <div className="flex gap-2 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {["All", "Textbooks", "Papers", "Free", "Paid"].map((f) => (
                  <button key={f} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
                    ${f === "All" ? "bg-[#0a0a0a] text-white border-transparent" : "border-[#ebebeb] text-[#6b6b6b] hover:border-[#d4d4d4]"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {resources.map((r) => (
                  <div key={r.title} className="bg-white border border-[#ebebeb] rounded-2xl p-4 flex items-center gap-4 hover:border-[#d4d4d4] transition-all">
                    <div className="w-12 h-16 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                      <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#0a0a0a] truncate">{r.title}</div>
                      <div className="text-xs text-[#9e9e9e] mt-0.5">{r.author} · {r.pages} pages</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-[#9e9e9e] border border-[#ebebeb] px-2 py-0.5 rounded-full">{r.type}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                          ${r.access === "Paid" ? "bg-[#f5f5f5] text-[#9e9e9e]" : "bg-[#0a0a0a] text-white"}`}>
                          {r.access}
                        </span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 px-3 py-2 border border-[#ebebeb] rounded-xl text-xs font-semibold text-[#0a0a0a] hover:bg-[#f5f5f5] transition-all">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Research view */}
        {view === "research" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-[700px] mx-auto">
              <div className="text-sm font-semibold text-[#0a0a0a] mb-1">Research & Thesis Assistant</div>
              <div className="text-xs text-[#9e9e9e] mb-4">Select your project type to get started with structured academic guidance.</div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {researchTypes.map((rt) => (
                  <button key={rt.label} className="bg-white border border-[#ebebeb] rounded-2xl p-4 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all group">
                    <div className="text-xl mb-2">{rt.icon}</div>
                    <div className="text-xs font-semibold text-[#0a0a0a]">{rt.label}</div>
                    <div className="text-[10px] text-[#9e9e9e] mt-0.5">{rt.desc}</div>
                  </button>
                ))}
              </div>

              {/* Methodology placeholders */}
              <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 mb-4">
                <div className="text-xs font-semibold text-[#0a0a0a] mb-3">Methodology Requirements</div>
                <div className="space-y-2">
                  {[
                    { label: "University methodology", value: "[ PLACEHOLDER — Connect your university ]" },
                    { label: "Professor requirements", value: "[ PLACEHOLDER — Add professor guidelines ]" },
                    { label: "Citation style", value: "[ APA / MLA / Chicago / IEEE ]" },
                    { label: "Structure requirements", value: "[ PLACEHOLDER — Upload your brief ]" },
                    { label: "Formatting requirements", value: "[ PLACEHOLDER — Specify format ]" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#f5f5f5] last:border-0">
                      <span className="text-[10px] text-[#9e9e9e]">{item.label}</span>
                      <span className="text-[10px] font-medium text-[#d4d4d4]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#f5f5f5] border border-[#ebebeb] rounded-2xl p-4 text-center">
                <div className="text-xs text-[#9e9e9e] leading-relaxed">
                  Research methodologies and university-specific guidelines will be integrated with official academic frameworks in the full version. Content shown is illustrative only.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
