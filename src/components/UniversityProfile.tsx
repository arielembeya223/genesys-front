import { useState } from "react";
import type { Page } from "../types";

interface Props {
  onNavigate: (page: Page) => void;
}

type Tab = "posts" | "schools" | "programs" | "events" | "clubs" | "companies" | "students" | "about";

const tabs: { id: Tab; label: string }[] = [
  { id: "posts", label: "Publications" },
  { id: "schools", label: "Schools" },
  { id: "programs", label: "Programs" },
  { id: "events", label: "Events" },
  { id: "clubs", label: "Clubs" },
  { id: "companies", label: "Partners" },
  { id: "students", label: "Students" },
  { id: "about", label: "About" },
];

const uniPosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop&auto=format", likes: 1240 },
  { id: 2, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop&auto=format", likes: 876 },
  { id: 3, image: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=300&fit=crop&auto=format", likes: 2100 },
  { id: 4, image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop&auto=format", likes: 543 },
  { id: 5, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format", likes: 720 },
  { id: 6, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop&auto=format", likes: 1890 },
];

const programs = [
  { name: "Computer Science & AI", level: "BSc / MSc / PhD", duration: "3–5 years", students: 1840 },
  { name: "Mathematics", level: "BSc / MSc / PhD", duration: "3–5 years", students: 920 },
  { name: "Physics", level: "BSc / MSc / PhD", duration: "3–5 years", students: 780 },
  { name: "Electrical Engineering", level: "BSc / MSc / PhD", duration: "4–5 years", students: 1120 },
  { name: "Bioengineering", level: "BSc / MSc / PhD", duration: "4–5 years", students: 640 },
  { name: "Management of Technology", level: "MBA / Executive", duration: "1–2 years", students: 380 },
];

const events = [
  { name: "MIT AI Summit 2026", date: "Sep 15, 2026", type: "Conference", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&h=200&fit=crop&auto=format" },
  { name: "Open Research Day", date: "Oct 3, 2026", type: "Campus Event", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop&auto=format" },
  { name: "Senior Thesis Symposium", date: "Nov 22, 2026", type: "Academic", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop&auto=format" },
];

export default function UniversityProfile({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [following, setFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 md:pb-8">
      {/* Back button */}
      <button
        onClick={() => onNavigate("search")}
        className="fixed top-4 left-4 md:left-[80px] lg:left-[256px] z-40 bg-white/90 backdrop-blur-sm border border-[#ebebeb] rounded-xl p-2 hover:bg-white transition-all shadow-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      {/* Cover image */}
      <div className="relative w-full bg-[#f5f5f5] overflow-hidden" style={{ height: "260px" }}>
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop&auto=format"
          alt="MIT Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="max-w-[800px] mx-auto px-4">
        {/* Profile section */}
        <div className="relative -mt-14 mb-6">
          <div className="flex items-end gap-4">
            {/* Logo placeholder */}
            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-white shadow-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-[#f5f5f5] flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] flex items-center justify-center mb-1">
                  <span className="text-white text-xl font-bold" style={{ fontFamily: "Instrument Serif, serif" }}>M</span>
                </div>
                <span className="text-[7px] text-[#9e9e9e] text-center">LOGO PLACEHOLDER</span>
              </div>
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-semibold text-[#0a0a0a]" style={{ fontFamily: "Instrument Serif, serif" }}>
                  Massachusetts Institute of Technology
                </h1>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="text-sm text-[#6b6b6b] flex items-center gap-1 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /></svg>
                Cambridge, Massachusetts · United States
              </div>
            </div>
          </div>

          {/* Stats + actions */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-base font-bold text-[#0a0a0a]">184K</div>
                <div className="text-[10px] text-[#9e9e9e]">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-[#0a0a0a]">312</div>
                <div className="text-[10px] text-[#9e9e9e]">Following</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-[#0a0a0a]">1,862</div>
                <div className="text-[10px] text-[#9e9e9e]">Publications</div>
              </div>
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setFollowing(!following)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all
                  ${following ? "border border-[#ebebeb] text-[#6b6b6b] hover:bg-[#f5f5f5]" : "bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]"}`}
              >
                {following ? "Following" : "Follow"}
              </button>
              <button className="px-5 py-2 rounded-xl text-sm font-semibold border border-[#ebebeb] text-[#0a0a0a] hover:bg-[#f5f5f5] transition-all">
                Message
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-[#6b6b6b] mt-4 leading-relaxed max-w-[600px]">
            MIT is a private research university in Cambridge, Massachusetts. Founded in 1861, MIT has been pivotal in the development of modern science, engineering, mathematics, and technology.
          </p>
          <a href="#" className="text-xs text-[#0a0a0a] font-medium hover:underline mt-1 inline-block">mit.edu ↗</a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-6 border-b border-[#ebebeb]" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2
                ${activeTab === tab.id ? "text-[#0a0a0a] border-[#0a0a0a]" : "text-[#9e9e9e] border-transparent hover:text-[#6b6b6b]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-3 gap-2">
            {uniPosts.map((p) => (
              <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden bg-[#f5f5f5] group cursor-pointer">
                <img src={p.image} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-white text-xs font-semibold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                    {p.likes.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "programs" && (
          <div className="space-y-3">
            {programs.map((prog) => (
              <div key={prog.name} className="bg-white border border-[#ebebeb] rounded-2xl p-4 flex items-center justify-between hover:border-[#d4d4d4] transition-all">
                <div>
                  <div className="text-sm font-semibold text-[#0a0a0a]">{prog.name}</div>
                  <div className="text-xs text-[#9e9e9e] mt-0.5">{prog.level} · {prog.duration}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#0a0a0a]">{prog.students.toLocaleString()}</div>
                  <div className="text-[10px] text-[#9e9e9e]">students</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div className="grid md:grid-cols-2 gap-4">
            {events.map((ev) => (
              <div key={ev.name} className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden hover:border-[#d4d4d4] transition-all">
                <div className="relative bg-[#f5f5f5]" style={{ aspectRatio: "16/9" }}>
                  <img src={ev.img} alt={ev.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#0a0a0a] px-2 py-0.5 rounded-full">
                    {ev.type}
                  </span>
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-[#0a0a0a]">{ev.name}</div>
                  <div className="text-xs text-[#9e9e9e] mt-1">{ev.date}</div>
                  <button className="mt-3 w-full py-2 bg-[#0a0a0a] text-white text-xs font-semibold rounded-xl hover:bg-[#1a1a1a] transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-6 space-y-5">
            {[
              { label: "Founded", value: "1861" },
              { label: "Type", value: "Private Research University" },
              { label: "Motto", value: "Mens et Manus (Mind and Hand)" },
              { label: "Students", value: "11,520" },
              { label: "Faculty", value: "1,069" },
              { label: "Nobel Laureates", value: "97" },
              { label: "Annual Budget", value: "$4.6 Billion" },
              { label: "Campus Size", value: "168 acres" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-[#f5f5f5] pb-4 last:border-0 last:pb-0">
                <span className="text-xs text-[#9e9e9e] font-medium">{item.label}</span>
                <span className="text-sm font-semibold text-[#0a0a0a]">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {(activeTab === "schools" || activeTab === "clubs" || activeTab === "companies" || activeTab === "students") && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-[#f5f5f5] rounded-2xl flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="15" x2="12" y2="15" /></svg>
            </div>
            <div className="text-sm font-semibold text-[#0a0a0a] mb-1">Content coming soon</div>
            <div className="text-xs text-[#9e9e9e]">This section is under construction for this profile.</div>
          </div>
        )}
      </div>
    </div>
  );
}
