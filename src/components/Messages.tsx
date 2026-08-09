import { useState } from "react";

interface Conversation {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  { id: 1, name: "Sofia Chen", handle: "@sofia.chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&h=56&fit=crop&auto=format", lastMessage: "Did you finish your thesis section?", time: "2m", unread: 3, online: true },
  { id: 2, name: "James Kim", handle: "@james.k", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&auto=format", lastMessage: "The architecture studio session was amazing 🏛️", time: "1h", unread: 0, online: true },
  { id: 3, name: "Nina Wolf", handle: "@nina.wolf", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&auto=format", lastMessage: "Thanks for sharing the research paper!", time: "3h", unread: 0, online: false },
  { id: 4, name: "MIT AI Lab Society", handle: "Group · 84 members", avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=56&h=56&fit=crop&auto=format", lastMessage: "Next meeting is on Thursday at 6pm", time: "5h", unread: 12, online: false },
  { id: 5, name: "Marc Dubois", handle: "@marc.dubois", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=56&h=56&fit=crop&auto=format", lastMessage: "Let me know when you're free to study!", time: "1d", unread: 0, online: false },
  { id: 6, name: "Parsons Design Club", handle: "Group · 32 members", avatar: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=56&h=56&fit=crop&auto=format", lastMessage: "Exhibition set up at 10am on Friday", time: "2d", unread: 0, online: false },
  { id: 7, name: "Léa Martin", handle: "@lea.m", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=56&h=56&fit=crop&auto=format", lastMessage: "Can you review my paper intro?", time: "3d", unread: 0, online: false },
];

interface Message {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
}

const chatMessages: Message[] = [
  { id: 1, from: "them", text: "Hey! How's the thesis going?", time: "10:22" },
  { id: 2, from: "me", text: "Making progress! Just finished the architecture section. The distributed inference part is still tricky.", time: "10:25" },
  { id: 3, from: "them", text: "I know that feeling. Did you read that paper by Chen et al. about dynamic batching? It might help!", time: "10:26" },
  { id: 4, from: "me", text: "Not yet — can you send me the link?", time: "10:28" },
  { id: 5, from: "them", text: "Of course, one sec 🔗", time: "10:28" },
  { id: 6, from: "them", text: "Did you finish your thesis section?", time: "10:31" },
];

const reactions = ["👍", "❤️", "😄", "😮", "😢", "😡"];

export default function Messages() {
  const [selected, setSelected] = useState<Conversation | null>(conversations[0]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [showEmojiMenu, setShowEmojiMenu] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredConvos = conversations.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, from: "me", text: input, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden">
      {/* Conversations list */}
      <div className={`flex flex-col bg-white border-r border-[#ebebeb] w-full md:w-[320px] lg:w-[360px] flex-shrink-0 ${selected ? "hidden md:flex" : "flex"}`}>
        <div className="p-4 border-b border-[#ebebeb]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-base font-semibold text-[#0a0a0a]" style={{ fontFamily: "Instrument Serif, serif" }}>Messages</h1>
            <button className="text-[#9e9e9e] hover:text-[#0a0a0a] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </button>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e9e]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f5f5f5] rounded-xl text-xs text-[#0a0a0a] placeholder-[#9e9e9e] focus:outline-none"
            />
          </div>
        </div>

        {/* Message requests */}
        <div className="px-4 py-2 border-b border-[#ebebeb]">
          <button className="flex items-center gap-2 text-xs font-semibold text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors">
            <div className="w-5 h-5 bg-[#0a0a0a] rounded-full flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">2</span>
            </div>
            Message requests
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setSelected(convo)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-[#f5f5f5] transition-all border-b border-[#f5f5f5]
                ${selected?.id === convo.id ? "bg-[#f5f5f5]" : ""}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#f5f5f5]">
                  <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" />
                </div>
                {convo.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#0a0a0a] rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${convo.unread ? "font-bold text-[#0a0a0a]" : "font-medium text-[#0a0a0a]"}`}>
                    {convo.name}
                  </span>
                  <span className="text-[10px] text-[#9e9e9e] flex-shrink-0 ml-2">{convo.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className={`text-xs truncate ${convo.unread ? "font-semibold text-[#0a0a0a]" : "text-[#9e9e9e]"}`}>
                    {convo.lastMessage}
                  </span>
                  {convo.unread > 0 && (
                    <div className="ml-2 w-4 h-4 bg-[#0a0a0a] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[9px] font-bold">{convo.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selected ? (
        <div className={`flex flex-col flex-1 bg-white ${!selected ? "hidden md:flex" : "flex"}`}>
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b border-[#ebebeb]">
            <button
              onClick={() => setSelected(null)}
              className="md:hidden text-[#9e9e9e] hover:text-[#0a0a0a] mr-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="relative">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f5f5f5]">
                <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover" />
              </div>
              {selected.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0a0a0a] rounded-full border-2 border-white" />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#0a0a0a]">{selected.name}</div>
              <div className="text-[10px] text-[#9e9e9e]">{selected.online ? "Active now" : selected.handle}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-xl hover:bg-[#f5f5f5] flex items-center justify-center text-[#9e9e9e] hover:text-[#0a0a0a] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              </button>
              <button className="w-8 h-8 rounded-xl hover:bg-[#f5f5f5] flex items-center justify-center text-[#9e9e9e] hover:text-[#0a0a0a] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} group`}
                onMouseLeave={() => setShowEmojiMenu(null)}
              >
                {msg.from === "them" && (
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-[#f5f5f5] mr-2 flex-shrink-0 self-end">
                    <img src={selected.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative max-w-[70%]">
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                      ${msg.from === "me"
                        ? "bg-[#0a0a0a] text-white rounded-br-sm"
                        : "bg-[#f5f5f5] text-[#0a0a0a] rounded-bl-sm"
                      }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-[#9e9e9e] mt-1 ${msg.from === "me" ? "text-right" : "text-left"}`}>
                    {msg.time}
                  </div>

                  {/* Reaction button */}
                  <button
                    onMouseEnter={() => setShowEmojiMenu(msg.id)}
                    className={`absolute ${msg.from === "me" ? "-left-8" : "-right-8"} top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f5f5f5] border border-[#ebebeb] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs`}
                  >
                    😊
                  </button>

                  {showEmojiMenu === msg.id && (
                    <div className={`absolute ${msg.from === "me" ? "right-0" : "left-0"} -top-10 bg-white border border-[#ebebeb] rounded-full px-2 py-1 flex gap-1 shadow-sm z-10`}>
                      {reactions.map((r) => (
                        <button key={r} className="hover:scale-125 transition-transform text-sm">{r}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#ebebeb]">
            <div className="flex items-end gap-2">
              <button className="text-[#9e9e9e] hover:text-[#0a0a0a] transition-colors p-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Message..."
                  rows={1}
                  className="w-full px-4 py-2.5 bg-[#f5f5f5] rounded-2xl text-sm text-[#0a0a0a] placeholder-[#9e9e9e] focus:outline-none resize-none"
                  style={{ maxHeight: "120px" }}
                />
              </div>
              <div className="flex items-center gap-1">
                <button className="text-[#9e9e9e] hover:text-[#0a0a0a] transition-colors p-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-[#0a0a0a] text-white rounded-xl flex items-center justify-center disabled:opacity-30 hover:bg-[#1a1a1a] transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#f5f5f5] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            </div>
            <div className="text-sm font-semibold text-[#0a0a0a]">Your Messages</div>
            <div className="text-xs text-[#9e9e9e] mt-1">Select a conversation to start messaging</div>
          </div>
        </div>
      )}
    </div>
  );
}
