import { useState } from "react";

type ProfileTab = "posts" | "saved" | "academic";

const profilePosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop&auto=format", likes: 234 },
  { id: 2, image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop&auto=format", likes: 87 },
  { id: 3, image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&h=300&fit=crop&auto=format", likes: 412 },
  { id: 4, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&auto=format", likes: 156 },
  { id: 5, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format", likes: 289 },
  { id: 6, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format", likes: 341 },
  { id: 7, image: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=300&fit=crop&auto=format", likes: 198 },
  { id: 8, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop&auto=format", likes: 512 },
  { id: 9, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop&auto=format", likes: 73 },
];

const stories = [
  { id: 1, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop&auto=format", label: "Thesis" },
  { id: 2, img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop&auto=format", label: "Lab" },
  { id: 3, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&auto=format", label: "Design" },
  { id: 4, img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=80&h=80&fit=crop&auto=format", label: "Campus" },
];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 md:pb-8">
      <div className="max-w-[680px] mx-auto px-4 pt-6">

        {/* Profile Header */}
        <div className="flex items-start gap-5 mb-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20">
              {/* Hex ring for profile */}
              <div className="w-20 h-[90px] absolute inset-0 flex items-center justify-center" style={{
                clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                background: "#0a0a0a"
              }}>
                <div className="w-[72px] h-[82px] overflow-hidden" style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&auto=format"
                    alt="Alex Moreau"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-lg font-semibold text-[#0a0a0a]">alex.moreau</h1>
              <button
                onClick={() => setEditing(!editing)}
                className="text-xs font-semibold px-4 py-1.5 border border-[#ebebeb] rounded-xl text-[#0a0a0a] hover:bg-[#f5f5f5] transition-all"
              >
                Edit profile
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-3">
              <div>
                <span className="text-sm font-bold text-[#0a0a0a]">9</span>
                <span className="text-xs text-[#6b6b6b] ml-1">posts</span>
              </div>
              <div>
                <span className="text-sm font-bold text-[#0a0a0a]">1,284</span>
                <span className="text-xs text-[#6b6b6b] ml-1">followers</span>
              </div>
              <div>
                <span className="text-sm font-bold text-[#0a0a0a]">348</span>
                <span className="text-xs text-[#6b6b6b] ml-1">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-3">
              <div className="text-sm font-semibold text-[#0a0a0a]">Alex Moreau</div>
              <div className="text-xs text-[#6b6b6b] mt-0.5">MSc Computer Science · MIT</div>
              <div className="text-xs text-[#6b6b6b]">Distributed systems · ML inference · Design</div>
              <p className="text-xs text-[#6b6b6b] mt-1.5 leading-relaxed">
                Building the future, one system at a time. Senior thesis on distributed ML inference at MIT CSAIL.
              </p>
              <a href="#" className="text-xs text-[#0a0a0a] font-medium hover:underline">alexmoreau.dev ↗</a>
            </div>
          </div>
        </div>

        {/* Highlight Stories (hexagonal) */}
        <div className="flex gap-5 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {stories.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
              <div className="relative">
                <div className="w-[56px] h-[64px] flex items-center justify-center" style={{
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  background: "#ebebeb"
                }}>
                  <div className="w-[50px] h-[57px] overflow-hidden" style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}>
                    <img src={s.img} alt={s.label} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-[#6b6b6b]">{s.label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
            <div className="w-[56px] h-[64px] flex items-center justify-center" style={{
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              background: "#f5f5f5",
              border: "1px solid #ebebeb"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </div>
            <span className="text-[10px] text-[#9e9e9e]">New</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-[#ebebeb] mb-4">
          {([
            { id: "posts", label: "Posts", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg> },
            { id: "saved", label: "Saved", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg> },
            { id: "academic", label: "Academic", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg> },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProfileTab)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold border-t-2 transition-all
                ${activeTab === tab.id ? "border-[#0a0a0a] text-[#0a0a0a]" : "border-transparent text-[#9e9e9e] hover:text-[#6b6b6b]"}`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Post Grid */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-3 gap-1">
            {profilePosts.map((p) => (
              <div key={p.id} className="relative aspect-square bg-[#f5f5f5] overflow-hidden group cursor-pointer">
                <img src={p.image} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-white text-xs font-semibold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                    {p.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="grid grid-cols-3 gap-1">
            {[...profilePosts].reverse().slice(0, 6).map((p) => (
              <div key={p.id} className="relative aspect-square bg-[#f5f5f5] overflow-hidden group cursor-pointer">
                <img src={p.image} alt="Saved post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-1 right-1">
                  <div className="bg-black/50 rounded-full p-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "academic" && (
          <div className="space-y-3">
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-[#0a0a0a]">Academic Information</div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#9e9e9e] bg-[#f5f5f5] px-2 py-1 rounded-full">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                  Public
                </div>
              </div>
              {[
                { label: "University", value: "Massachusetts Institute of Technology" },
                { label: "Faculty", value: "School of Engineering" },
                { label: "Program", value: "Computer Science & AI" },
                { label: "Degree", value: "MSc" },
                { label: "Year", value: "2nd Year" },
                { label: "Academic Year", value: "2025–2026" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#f5f5f5] last:border-0">
                  <span className="text-xs text-[#9e9e9e]">{item.label}</span>
                  <span className="text-xs font-medium text-[#0a0a0a]">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#f5f5f5] border border-[#ebebeb] rounded-2xl p-4 text-center">
              <svg className="mx-auto mb-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <div className="text-xs text-[#9e9e9e]">GPA, grades and private academic records are never shown publicly.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
