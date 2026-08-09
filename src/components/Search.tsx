import { useState } from "react";
import type { Page } from "../types";

interface SearchProps {
  onNavigate: (page: Page) => void;
}

type Category = "all" | "universities" | "schools" | "companies" | "people" | "clubs";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "universities", label: "Universities" },
  { id: "schools", label: "Schools" },
  { id: "companies", label: "Companies" },
  { id: "people", label: "People" },
  { id: "clubs", label: "Clubs" },
];

const suggestions = ["MIT", "AI Research", "Design Thinking", "Internships", "Study Groups", "ETH Zürich", "Research Projects"];

const universityCards = [
  { name: "MIT", location: "Cambridge, MA", desc: "World-leading research university in science and technology.", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=260&fit=crop&auto=format", followers: "184K", verified: true },
  { name: "Sorbonne Université", location: "Paris, France", desc: "One of Europe's oldest and most prestigious universities.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&auto=format", followers: "212K", verified: true },
  { name: "ETH Zürich", location: "Zürich, Switzerland", desc: "Top-ranked technical university, known for STEM excellence.", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop&auto=format", followers: "97K", verified: true },
  { name: "UCL", location: "London, UK", desc: "Research-intensive university in the heart of London.", img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=280&fit=crop&auto=format", followers: "145K", verified: true },
  { name: "HEC Paris", location: "Jouy-en-Josas, France", desc: "Europe's leading business school with global reach.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=220&fit=crop&auto=format", followers: "63K", verified: true },
  { name: "Parsons School of Design", location: "New York, NY", desc: "World-renowned art and design school at The New School.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=340&fit=crop&auto=format", followers: "41K", verified: false },
];

const peopleCards = [
  { name: "Sofia Chen", handle: "@sofia.chen", role: "PhD Student", uni: "MIT", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format", field: "Computer Science" },
  { name: "James Kim", handle: "@james.k", role: "MSc Student", uni: "UCL", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", field: "Architecture" },
  { name: "Nina Wolf", handle: "@nina.wolf", role: "Research Scientist", uni: "ETH Zürich", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", field: "Bioengineering" },
  { name: "Marc Dubois", handle: "@marc.dubois", role: "MBA Student", uni: "HEC Paris", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format", field: "Finance" },
  { name: "Léa Martin", handle: "@lea.m", role: "Bachelor Student", uni: "Sorbonne", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format", field: "Law" },
  { name: "David Osei", handle: "@david.osei", role: "Professor", uni: "MIT", img: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=80&h=80&fit=crop&auto=format", field: "Electrical Eng." },
];

const companyCards = [
  { name: "DeepMind", industry: "AI Research", opportunities: "12 internships", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=240&fit=crop&auto=format", logo: "DM" },
  { name: "Airbus", industry: "Aerospace", opportunities: "8 positions", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=280&fit=crop&auto=format", logo: "AB" },
  { name: "McKinsey & Co.", industry: "Consulting", opportunities: "5 internships", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop&auto=format", logo: "MK" },
  { name: "CERN", industry: "Research", opportunities: "20 openings", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=320&fit=crop&auto=format", logo: "CE" },
];

const clubCards = [
  { name: "Parsons Design Club", category: "Design", members: 234, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format" },
  { name: "MIT AI Lab Society", category: "Technology", members: 412, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=240&fit=crop&auto=format" },
  { name: "HEC Entrepreneurs", category: "Business", members: 187, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=180&fit=crop&auto=format" },
  { name: "UCL Law Review", category: "Academia", members: 89, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=260&fit=crop&auto=format" },
  { name: "Sorbonne Film Circle", category: "Arts", members: 156, img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop&auto=format" },
];

function UniversityCard({ u, onNavigate }: { u: typeof universityCards[0]; onNavigate: (p: Page) => void }) {
  return (
    <button
      onClick={() => onNavigate("university")}
      className="block w-full text-left bg-white border border-[#ebebeb] rounded-2xl overflow-hidden hover:border-[#d4d4d4] hover:shadow-sm transition-all group break-inside-avoid mb-3"
    >
      <div className="relative overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "16/9" }}>
        <img src={u.img} alt={u.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {u.verified && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-sm font-semibold text-[#0a0a0a]">{u.name}</div>
            <div className="text-[11px] text-[#9e9e9e] flex items-center gap-1 mt-0.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /></svg>
              {u.location}
            </div>
          </div>
          <div className="text-[10px] text-[#9e9e9e] font-mono flex-shrink-0">{u.followers}</div>
        </div>
        <p className="text-[11px] text-[#6b6b6b] mt-2 leading-relaxed line-clamp-2">{u.desc}</p>
      </div>
    </button>
  );
}

function PersonCard({ p, onNavigate }: { p: typeof peopleCards[0]; onNavigate: (pg: Page) => void }) {
  const [following, setFollowing] = useState(false);
  return (
    <div className="bg-white border border-[#ebebeb] rounded-2xl p-4 flex items-center gap-3 hover:border-[#d4d4d4] transition-all break-inside-avoid mb-3">
      <button onClick={() => onNavigate("profile")}>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5f5f5] flex-shrink-0">
          <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
        </div>
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#0a0a0a]">{p.name}</div>
        <div className="text-[10px] text-[#9e9e9e]">{p.role} · {p.uni}</div>
        <div className="text-[10px] text-[#6b6b6b] mt-0.5">{p.field}</div>
      </div>
      <button
        onClick={() => setFollowing(!following)}
        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex-shrink-0
          ${following ? "bg-[#f5f5f5] text-[#6b6b6b]" : "bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]"}`}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}

function CompanyCard({ c }: { c: typeof companyCards[0] }) {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden hover:border-[#d4d4d4] transition-all break-inside-avoid mb-3">
      <div className="relative bg-[#f5f5f5]" style={{ aspectRatio: "16/9" }}>
        <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-[9px] font-bold text-[#0a0a0a]">{c.logo}</span>
        </div>
      </div>
      <div className="p-3">
        <div className="text-sm font-semibold text-[#0a0a0a]">{c.name}</div>
        <div className="text-[11px] text-[#9e9e9e] mt-0.5">{c.industry}</div>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full" />
          <span className="text-[11px] text-[#6b6b6b] font-medium">{c.opportunities}</span>
        </div>
      </div>
    </div>
  );
}

export default function Search({ onNavigate }: SearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [focused, setFocused] = useState(false);

  const showUniversities = activeCategory === "all" || activeCategory === "universities";
  const showPeople = activeCategory === "all" || activeCategory === "people";
  const showCompanies = activeCategory === "all" || activeCategory === "companies";
  const showClubs = activeCategory === "all" || activeCategory === "clubs";

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 md:pb-8">
      {/* Search Header */}
      <div className="sticky top-0 bg-[#fafafa]/95 backdrop-blur-sm z-30 pt-4 pb-3 px-4">
        <div className="max-w-[900px] mx-auto">
          <div className="relative mb-3">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9e9e9e]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search universities, people, clubs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#ebebeb] rounded-2xl text-sm text-[#0a0a0a] placeholder-[#9e9e9e] focus:border-[#0a0a0a] transition-all"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#0a0a0a]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>

          {/* Search suggestions dropdown */}
          {focused && !query && (
            <div className="absolute left-4 right-4 bg-white border border-[#ebebeb] rounded-2xl shadow-lg z-50 py-2">
              <div className="px-4 py-2 text-[10px] text-[#9e9e9e] font-semibold uppercase tracking-wider">Trending</div>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f5f5f5] text-sm text-[#0a0a0a] text-left"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /></svg>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all
                  ${activeCategory === cat.id ? "bg-[#0a0a0a] text-white" : "bg-white border border-[#ebebeb] text-[#6b6b6b] hover:border-[#d4d4d4]"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 pt-2">
        {/* Universities section */}
        {showUniversities && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#0a0a0a]">Universities</h2>
              <button className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a]">See all</button>
            </div>
            <div className="masonry-grid">
              {universityCards.map((u) => (
                <UniversityCard key={u.name} u={u} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}

        {/* Companies section */}
        {showCompanies && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#0a0a0a]">Companies & Opportunities</h2>
              <button className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a]">See all</button>
            </div>
            <div className="masonry-grid">
              {companyCards.map((c) => (
                <CompanyCard key={c.name} c={c} />
              ))}
            </div>
          </section>
        )}

        {/* People section */}
        {showPeople && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#0a0a0a]">People</h2>
              <button className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a]">See all</button>
            </div>
            <div className="masonry-grid">
              {peopleCards.map((p) => (
                <PersonCard key={p.handle} p={p} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}

        {/* Clubs section */}
        {showClubs && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#0a0a0a]">Clubs & Associations</h2>
              <button className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a]">See all</button>
            </div>
            <div className="masonry-grid">
              {clubCards.map((c) => (
                <div key={c.name} className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden hover:border-[#d4d4d4] transition-all break-inside-avoid mb-3">
                  <div className="relative bg-[#f5f5f5]" style={{ aspectRatio: "4/3" }}>
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-[10px] bg-white/90 text-[#0a0a0a] px-2 py-0.5 rounded-full font-medium">{c.category}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold text-[#0a0a0a]">{c.name}</div>
                    <div className="text-[11px] text-[#9e9e9e] mt-0.5">{c.members} members</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
