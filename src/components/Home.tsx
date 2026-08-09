import { useState } from "react";
import type { Page } from "../types";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const stories = [
  { id: 0, username: "Your Story", isOwn: true, img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format" },
  { id: 1, username: "sofia.chen", uni: "MIT", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format" },
  { id: 2, username: "Sorbonne", uni: "University", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=80&h=80&fit=crop&auto=format" },
  { id: 3, username: "james.k", uni: "UCL", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
  { id: 4, username: "ai.lab", uni: "Stanford", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop&auto=format" },
  { id: 5, username: "nina.wolf", uni: "ETH Zürich", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
  { id: 6, username: "design.club", uni: "Parsons", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&auto=format" },
  { id: 7, username: "marc.dubois", uni: "HEC Paris", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format" },
];

const posts = [
  {
    id: 1,
    type: "student",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&h=56&fit=crop&auto=format",
    name: "Sofia Chen",
    handle: "@sofia.chen",
    institution: "MIT · Computer Science",
    time: "2h",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&auto=format",
    caption: "Just finished my senior thesis on distributed ML inference — 6 months of late nights finally paying off. Here's a peek at the architecture diagram. Huge thanks to Prof. Williams for all the guidance 🎓",
    likes: 234,
    comments: 18,
    saved: false,
    liked: false,
  },
  {
    id: 2,
    type: "university",
    avatar: "https://images.unsplash.com/photo-1562774053-701939374585?w=56&h=56&fit=crop&auto=format",
    name: "Sorbonne Université",
    handle: "@sorbonne",
    institution: "Paris, France · Verified",
    time: "4h",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&auto=format",
    caption: "Proud to announce the launch of our new interdisciplinary AI & Humanities research program for the 2026–2027 academic year. Applications open December 1st.",
    likes: 1240,
    comments: 87,
    saved: false,
    liked: false,
  },
  {
    id: 3,
    type: "company",
    avatar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=56&h=56&fit=crop&auto=format",
    name: "DeepMind",
    handle: "@deepmind",
    institution: "Technology · London",
    time: "6h",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&auto=format",
    caption: "We're looking for exceptional PhD interns for our Research team. If you're working on reinforcement learning, neuroscience, or mathematical reasoning — we'd love to hear from you. Apply via the link in our bio.",
    likes: 3820,
    comments: 412,
    saved: false,
    liked: false,
  },
  {
    id: 4,
    type: "club",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=56&h=56&fit=crop&auto=format",
    name: "Parsons Design Club",
    handle: "@parsons.design",
    institution: "Parsons School of Design · Club",
    time: "1d",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    caption: "Our annual typography exhibition opens next Friday. Come see work from 40 students exploring the boundaries between type and identity. Free entry, all welcome.",
    likes: 567,
    comments: 34,
    saved: false,
    liked: false,
  },
];

function HexStory({ story, isOwn }: { story: typeof stories[0]; isOwn?: boolean }) {
  const [viewed, setViewed] = useState(false);

  return (
    <button
      onClick={() => setViewed(true)}
      className="flex flex-col items-center gap-1.5 flex-shrink-0"
    >
      <div className="relative">
        {/* Hex ring */}
        <div
          className={`w-[62px] h-[70px] flex items-center justify-center`}
          style={{
            clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            background: isOwn ? "#ebebeb" : viewed ? "#d4d4d4" : "#0a0a0a",
          }}
        >
          <div
            className="w-[55px] h-[63px] overflow-hidden"
            style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}
          >
            <img src={story.img} alt={story.username} className="w-full h-full object-cover" />
          </div>
        </div>
        {isOwn && (
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#0a0a0a] rounded-full flex items-center justify-center border border-white">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><line x1="12" y1="5" x2="12" y2="19" strokeWidth="3" stroke="white" /><line x1="5" y1="12" x2="19" y2="12" strokeWidth="3" stroke="white" /></svg>
          </div>
        )}
      </div>
      <span className="text-[10px] text-[#6b6b6b] max-w-[62px] truncate text-center">
        {story.username}
      </span>
    </button>
  );
}

function PostCard({ post, onNavigate }: { post: typeof posts[0]; onNavigate: (p: Page) => void }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const typeBadge: Record<string, string> = {
    student: "Student",
    university: "University",
    company: "Company",
    club: "Club",
  };

  return (
    <article className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden mb-4 hover:border-[#d4d4d4] transition-all">
      {/* Post header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <button onClick={() => onNavigate(post.type === "university" ? "university" : "profile")}>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5f5f5]">
            <img src={post.avatar} alt={post.name} className="w-full h-full object-cover" />
          </div>
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(post.type === "university" ? "university" : "profile")}
              className="font-semibold text-sm text-[#0a0a0a] hover:underline"
            >
              {post.name}
            </button>
            {(post.type === "university" || post.type === "company") && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            <span className="text-[10px] text-[#9e9e9e] border border-[#ebebeb] px-1.5 py-0.5 rounded-full">
              {typeBadge[post.type]}
            </span>
          </div>
          <div className="text-[11px] text-[#9e9e9e] flex items-center gap-1">
            <span>{post.institution}</span>
            <span>·</span>
            <span>{post.time}</span>
          </div>
        </div>
        <button className="text-[#9e9e9e] hover:text-[#0a0a0a] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
        </button>
      </div>

      {/* Post image with hexagonal overlay treatment */}
      {post.image && (
        <div className="relative mx-4 mb-3 rounded-xl overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "3/2" }}>
          <img src={post.image} alt="Post" className="w-full h-full object-cover" />
          {/* Subtle hex watermark */}
          <div className="absolute top-3 right-3 opacity-20">
            <div className="w-8 h-9" style={{
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              background: "white"
            }} />
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="px-4 pb-3">
        <p className="text-sm text-[#1a1a1a] leading-relaxed line-clamp-3">
          <span className="font-semibold">{post.handle} </span>
          {post.caption}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 pb-4 border-t border-[#f5f5f5] pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all
            ${liked ? "bg-[#0a0a0a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f5f5]"}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          {likes.toLocaleString()}
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium text-[#6b6b6b] px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          {post.comments}
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium text-[#6b6b6b] px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className={`ml-auto flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all
            ${saved ? "bg-[#0a0a0a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f5f5]"}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 bg-white border-b border-[#ebebeb] z-40 flex items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold" style={{ fontFamily: "Instrument Serif, serif" }}>GENESYS</span>
        <div className="flex items-center gap-3">
          <button className="text-[#0a0a0a]" onClick={() => onNavigate("notifications")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <button className="text-[#0a0a0a]" onClick={() => onNavigate("messages")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-[680px] mx-auto w-full px-4 pt-4 pb-24 md:pb-8">
        {/* Stories */}
        <section className="mb-6">
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            {stories.map((s) => (
              <HexStory key={s.id} story={s} isOwn={s.isOwn} />
            ))}
          </div>
        </section>

        {/* Suggested section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#0a0a0a]">For You</h2>
          <button
            onClick={() => onNavigate("search")}
            className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
          >
            Discover more
          </button>
        </div>

        {/* Feed */}
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onNavigate={onNavigate} />
          ))}
        </div>

        {/* Right sidebar suggestion (desktop) */}
      </div>

      {/* Desktop: suggestion sidebar */}
      <div className="hidden xl:block fixed right-8 top-8 w-[280px]">
        <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5f5f5]">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=56&h=56&fit=crop&auto=format" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#0a0a0a]">Alex Moreau</div>
              <div className="text-xs text-[#9e9e9e]">@alex.moreau</div>
            </div>
            <button
              onClick={() => onNavigate("profile")}
              className="ml-auto text-xs font-semibold text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors"
            >
              View
            </button>
          </div>
          <div className="text-xs font-semibold text-[#9e9e9e] mb-3">Suggested for you</div>
          {[
            { name: "Nina Wolf", uni: "ETH Zürich", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format" },
            { name: "James Kim", uni: "UCL", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format" },
            { name: "Marc Dubois", uni: "HEC Paris", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format" },
          ].map((u) => (
            <div key={u.name} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                <img src={u.img} alt={u.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-[#0a0a0a] truncate">{u.name}</div>
                <div className="text-[10px] text-[#9e9e9e]">{u.uni}</div>
              </div>
              <button className="text-xs font-semibold text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors">Follow</button>
            </div>
          ))}
        </div>

        {/* Quick nav */}
        <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
          <div className="text-xs font-semibold text-[#9e9e9e] mb-3">Quick Access</div>
          <button
            onClick={() => onNavigate("mystudent")}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a] text-white mb-2 hover:bg-[#1a1a1a] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            <span className="text-xs font-semibold">My Student</span>
          </button>
          <button
            onClick={() => onNavigate("genesysai")}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#f5f5f5] text-[#0a0a0a] hover:bg-[#ebebeb] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            <span className="text-xs font-semibold">GENESYS AI</span>
          </button>
        </div>
      </div>
    </div>
  );
}
