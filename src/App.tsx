import { useState } from "react";
import type { Page } from "./types";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Search from "./components/Search";
import Messages from "./components/Messages";
import Notifications from "./components/Notifications";
import UserProfile from "./components/UserProfile";
import UniversityProfile from "./components/UniversityProfile";
import MyStudent from "./components/MyStudent";
import GenesysAI from "./components/GenesysAI";
import Settings from "./components/Settings";

// Create page — simple modal-style placeholder
function CreatePage({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-[540px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#ebebeb]">
          <h2 className="text-sm font-semibold text-[#0a0a0a]">Create Post</h2>
          <button onClick={onClose} className="text-[#9e9e9e] hover:text-[#0a0a0a] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="p-5">
          {/* Author */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5f5f5]">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=56&h=56&fit=crop&auto=format" alt="You" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#0a0a0a]">Alex Moreau</div>
              <div className="flex items-center gap-1">
                <select className="text-[10px] text-[#6b6b6b] bg-[#f5f5f5] rounded-lg px-2 py-0.5 focus:outline-none">
                  <option>Public</option>
                  <option>Followers only</option>
                  <option>Close friends</option>
                </select>
              </div>
            </div>
          </div>

          {/* Text */}
          <textarea
            placeholder="Share something with the GENESYS community..."
            className="w-full text-sm text-[#0a0a0a] placeholder-[#9e9e9e] resize-none focus:outline-none min-h-[120px] leading-relaxed"
            autoFocus
          />

          {/* Media upload */}
          <div className="mt-3 border-2 border-dashed border-[#ebebeb] rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#d4d4d4] transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            <div className="text-xs text-[#9e9e9e]">Add photo or video</div>
          </div>

          {/* Post types */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {["Photo", "Video", "Document", "Event", "Project", "Question"].map((t) => (
              <button key={t} className="flex-shrink-0 px-3 py-1 bg-[#f5f5f5] rounded-full text-[10px] font-semibold text-[#6b6b6b] hover:bg-[#ebebeb] transition-all">
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 p-5 border-t border-[#ebebeb]">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#ebebeb] rounded-xl text-sm font-semibold text-[#6b6b6b] hover:bg-[#f5f5f5] transition-all">Cancel</button>
          <button className="flex-1 py-2.5 bg-[#0a0a0a] text-white rounded-xl text-sm font-semibold hover:bg-[#1a1a1a] transition-all">Post</button>
        </div>
      </div>
    </div>
  );
}

// Layout offset by sidebar width
const sidebarWidths: Record<string, string> = {
  desktop: "240px",
  tablet: "64px",
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [showCreate, setShowCreate] = useState(false);

  const navigate = (p: Page) => {
    if (p === "create") {
      setShowCreate(true);
    } else {
      setPage(p);
    }
  };

  // Pages that use full-screen layout (no scroll padding)
  const fullScreenPages: Page[] = ["messages", "genesysai"];
  const isFullScreen = fullScreenPages.includes(page);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <Navigation current={page} onNavigate={navigate} />

      {/* Create modal */}
      {showCreate && <CreatePage onClose={() => setShowCreate(false)} />}

      {/* Main content — offset by sidebar on desktop */}
      <main
        className={`transition-all ${isFullScreen ? "h-screen overflow-hidden" : ""}`}
        style={{
          marginLeft: "0",
          // On md screens, offset by compact sidebar
          // On lg screens, offset by full sidebar
        }}
      >
        {/* Responsive sidebar offset */}
        <div className={`md:pl-[64px] lg:pl-[240px] ${isFullScreen ? "h-screen" : ""}`}>
          {page === "home" && <Home onNavigate={navigate} />}
          {page === "search" && <Search onNavigate={navigate} />}
          {page === "messages" && <Messages />}
          {page === "notifications" && <Notifications />}
          {page === "profile" && <UserProfile />}
          {page === "university" && <UniversityProfile onNavigate={navigate} />}
          {page === "mystudent" && <MyStudent />}
          {page === "genesysai" && <GenesysAI onNavigate={navigate} />}
          {page === "ai-workspace" && <GenesysAI onNavigate={navigate} />}
          {page === "settings" && <Settings onNavigate={navigate} />}
        </div>
      </main>

      {/* Welcome splash for first load */}
    </div>
  );
}
