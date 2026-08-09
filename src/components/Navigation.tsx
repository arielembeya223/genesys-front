import type { Page } from "../types";

interface NavProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: "home" as Page, label: "Home", icon: HomeIcon },
  { id: "search" as Page, label: "Search", icon: SearchIcon },
  { id: "create" as Page, label: "Create", icon: CreateIcon },
  { id: "messages" as Page, label: "Messages", icon: MessagesIcon },
  { id: "notifications" as Page, label: "Notifications", icon: BellIcon },
  { id: "profile" as Page, label: "Profile", icon: ProfileIcon },
  { id: "mystudent" as Page, label: "My Student", icon: StudentIcon },
  { id: "genesysai" as Page, label: "GENESYS AI", icon: AIIcon },
  { id: "settings" as Page, label: "Settings", icon: SettingsIcon },
];

const mobileItems = [
  { id: "home" as Page, label: "Home", icon: HomeIcon },
  { id: "search" as Page, label: "Search", icon: SearchIcon },
  { id: "create" as Page, label: "Create", icon: CreateIcon },
  { id: "messages" as Page, label: "Messages", icon: MessagesIcon },
  { id: "profile" as Page, label: "Profile", icon: ProfileIcon },
];

export default function Navigation({ current, onNavigate }: NavProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[240px] bg-white border-r border-[#ebebeb] z-50 py-6 px-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 px-3 mb-8"
        >
          <div className="w-8 h-8 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold" style={{ fontFamily: "Instrument Serif, serif" }}>G</span>
          </div>
          <span className="text-[#0a0a0a] font-semibold text-lg tracking-tight" style={{ fontFamily: "Instrument Serif, serif" }}>
            GENESYS
          </span>
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = current === id;
            const isAI = id === "genesysai";
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left
                  ${isActive
                    ? "bg-[#0a0a0a] text-white"
                    : "text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
                  }
                  ${isAI ? "mt-2 border border-[#ebebeb]" : ""}
                `}
              >
                <Icon size={18} active={isActive} />
                <span>{label}</span>
                {id === "messages" && (
                  <span className="ml-auto bg-[#0a0a0a] text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                )}
                {isAI && !isActive && (
                  <span className="ml-auto text-[10px] font-mono text-[#9e9e9e]">AI</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile footer */}
        <button
          onClick={() => onNavigate("profile")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f5f5] transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-[#d4d4d4] overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=56&h=56&fit=crop&auto=format"
              alt="Your profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-semibold text-[#0a0a0a] truncate">Alex Moreau</div>
            <div className="text-[10px] text-[#9e9e9e] truncate">@alex.moreau</div>
          </div>
        </button>
      </aside>

      {/* Compact sidebar for medium screens */}
      <aside className="hidden md:flex lg:hidden flex-col fixed left-0 top-0 h-full w-[64px] bg-white border-r border-[#ebebeb] z-50 py-6 items-center gap-1">
        <button onClick={() => onNavigate("home")} className="mb-6">
          <div className="w-8 h-8 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold" style={{ fontFamily: "Instrument Serif, serif" }}>G</span>
          </div>
        </button>
        {navItems.map(({ id, icon: Icon }) => {
          const isActive = current === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={navItems.find(n => n.id === id)?.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                ${isActive ? "bg-[#0a0a0a] text-white" : "text-[#9e9e9e] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"}
              `}
            >
              <Icon size={18} active={isActive} />
            </button>
          );
        })}
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#ebebeb] z-50 flex items-center justify-around px-2 py-2 safe-area-pb">
        {mobileItems.map(({ id, icon: Icon }) => {
          const isActive = current === id;
          const isCreate = id === "create";
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all
                ${isCreate ? "bg-[#0a0a0a] text-white rounded-2xl px-4 py-2" : ""}
                ${!isCreate && isActive ? "text-[#0a0a0a]" : !isCreate ? "text-[#9e9e9e]" : ""}
              `}
            >
              <Icon size={isCreate ? 20 : 22} active={isActive} />
            </button>
          );
        })}
      </nav>
    </>
  );
}

/* Icon Components */
function HomeIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CreateIcon({ size, active: _active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function MessagesIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function BellIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function ProfileIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function StudentIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function AIIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SettingsIcon({ size, active }: { size: number; active: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
