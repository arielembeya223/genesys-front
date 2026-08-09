import React from "react";

const notifications = [
  { id: 1, type: "like", user: "Sofia Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&auto=format", action: "liked your post", target: "Senior Thesis Architecture Diagram", time: "2m", read: false },
  { id: 2, type: "follow", user: "James Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format", action: "started following you", target: "", time: "1h", read: false },
  { id: 3, type: "comment", user: "MIT AI Lab Society", avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=40&h=40&fit=crop&auto=format", action: "commented on your post", target: "\"Great work on the distributed systems research!\"", time: "3h", read: false },
  { id: 4, type: "mention", user: "Nina Wolf", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format", action: "mentioned you in a post", target: "@alex.moreau", time: "5h", read: true },
  { id: 5, type: "event", user: "Sorbonne Université", avatar: "https://images.unsplash.com/photo-1562774053-701939374585?w=40&h=40&fit=crop&auto=format", action: "posted a new event", target: "MIT AI Summit 2026 — Register now", time: "1d", read: true },
  { id: 6, type: "like", user: "Marc Dubois", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format", action: "saved your post", target: "", time: "1d", read: true },
  { id: 7, type: "follow", user: "DeepMind", avatar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=40&h=40&fit=crop&auto=format", action: "started following you", target: "", time: "2d", read: true },
];

const typeIcons: Record<string, React.ReactElement> = {
  like: <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
  follow: <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>,
  comment: <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  mention: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" /></svg>,
  event: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
};

export default function Notifications() {
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 md:pb-8">
      <div className="max-w-[600px] mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-[#0a0a0a]" style={{ fontFamily: "Instrument Serif, serif" }}>Notifications</h1>
          <button className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">Mark all read</button>
        </div>

        {unread.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-semibold text-[#0a0a0a] mb-3">New · {unread.length}</div>
            <div className="space-y-2">
              {unread.map((n) => (
                <div key={n.id} className="bg-white border border-[#ebebeb] rounded-2xl p-4 flex items-start gap-3 hover:border-[#d4d4d4] transition-all">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5f5f5]">
                      <img src={n.avatar} alt={n.user} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-[#ebebeb]">
                      {typeIcons[n.type]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[#0a0a0a] leading-relaxed">
                      <span className="font-semibold">{n.user}</span>
                      {" "}{n.action}
                      {n.target && <span className="text-[#6b6b6b]"> — {n.target}</span>}
                    </div>
                    <div className="text-[10px] text-[#9e9e9e] mt-1">{n.time}</div>
                  </div>
                  <div className="w-2 h-2 bg-[#0a0a0a] rounded-full flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="text-xs font-semibold text-[#9e9e9e] mb-3">Earlier</div>
          <div className="space-y-2">
            {read.map((n) => (
              <div key={n.id} className="bg-white border border-[#ebebeb] rounded-2xl p-4 flex items-start gap-3 hover:border-[#d4d4d4] transition-all opacity-80">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f5f5f5]">
                    <img src={n.avatar} alt={n.user} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-[#ebebeb]">
                    {typeIcons[n.type]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#0a0a0a] leading-relaxed">
                    <span className="font-semibold">{n.user}</span>
                    {" "}{n.action}
                    {n.target && <span className="text-[#6b6b6b]"> — {n.target}</span>}
                  </div>
                  <div className="text-[10px] text-[#9e9e9e] mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
