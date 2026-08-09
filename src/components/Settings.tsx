import { useState } from "react";
import React from "react";
import type { Page } from "../types";

interface SettingsProps {
  onNavigate: (page: Page) => void;
}

type SettingsSection =
  | "account"
  | "privacy"
  | "notifications"
  | "security"
  | "appearance"
  | "language"
  | "blocked"
  | "academic"
  | "studentcard"
  | "mystudent"
  | "ai"
  | "data";

const sections: { id: SettingsSection; label: string; icon: React.ReactElement }[] = [
  { id: "account", label: "Account", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
  { id: "privacy", label: "Privacy", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg> },
  { id: "notifications", label: "Notifications", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg> },
  { id: "security", label: "Security", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { id: "appearance", label: "Appearance", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg> },
  { id: "language", label: "Language", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg> },
  { id: "blocked", label: "Blocked Users", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg> },
  { id: "academic", label: "Academic Information", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg> },
  { id: "studentcard", label: "Student Card", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></svg> },
  { id: "mystudent", label: "My Student", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
  { id: "ai", label: "AI Preferences", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> },
  { id: "data", label: "Data Management", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
];

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-5 rounded-full transition-all duration-200 flex items-center
        ${on ? "bg-[#0a0a0a]" : "bg-[#d4d4d4]"}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 mx-0.5
        ${on ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function SettingRow({ label, sub, control }: { label: string; sub?: string; control?: React.ReactElement }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-[#f5f5f5] last:border-0">
      <div>
        <div className="text-sm font-medium text-[#0a0a0a]">{label}</div>
        {sub && <div className="text-xs text-[#9e9e9e] mt-0.5">{sub}</div>}
      </div>
      {control ?? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>}
    </div>
  );
}

export default function Settings({ onNavigate }: SettingsProps) {
  const [active, setActive] = useState<SettingsSection>("account");

  const renderContent = () => {
    switch (active) {
      case "account":
        return (
          <div className="space-y-4">
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#f5f5f5]">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#f5f5f5]">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0a0a0a]">Alex Moreau</div>
                  <div className="text-xs text-[#9e9e9e]">@alex.moreau</div>
                </div>
                <button className="ml-auto text-xs font-semibold text-[#0a0a0a] border border-[#ebebeb] px-3 py-1.5 rounded-xl hover:bg-[#f5f5f5] transition-all">Edit</button>
              </div>
              <SettingRow label="Username" sub="@alex.moreau" />
              <SettingRow label="Email" sub="alex.moreau@student.mit.edu" />
              <SettingRow label="Phone" sub="Not set" />
              <SettingRow label="Change Password" />
              <SettingRow label="Connected Accounts" sub="Google, Apple" />
            </div>
            <button className="w-full py-3 border border-[#ebebeb] rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
              Delete Account
            </button>
          </div>
        );

      case "privacy":
        return (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 space-y-0">
            <SettingRow label="Private Account" sub="Only followers can see your posts" control={<Toggle defaultOn={false} />} />
            <SettingRow label="Show Online Status" sub="Let others see when you're active" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Allow Message Requests" sub="From people you don't follow" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Show Activity Status" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Allow Story Reposts" control={<Toggle defaultOn={false} />} />
            <SettingRow label="Show in Search" sub="Let others find you in search" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Tag Permissions" sub="Who can tag you in posts" />
            <SettingRow label="Comment Controls" sub="Manage who can comment" />
          </div>
        );

      case "notifications":
        return (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
            <div className="text-xs font-semibold text-[#9e9e9e] mb-3">Social</div>
            <SettingRow label="Likes" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Comments" control={<Toggle defaultOn={true} />} />
            <SettingRow label="New Followers" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Mentions" control={<Toggle defaultOn={true} />} />
            <div className="text-xs font-semibold text-[#9e9e9e] mb-3 mt-4">Academic</div>
            <SettingRow label="Assignment Reminders" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Exam Reminders" control={<Toggle defaultOn={true} />} />
            <SettingRow label="University Publications" control={<Toggle defaultOn={false} />} />
            <div className="text-xs font-semibold text-[#9e9e9e] mb-3 mt-4">Messages</div>
            <SettingRow label="Direct Messages" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Group Messages" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Message Requests" control={<Toggle defaultOn={false} />} />
          </div>
        );

      case "mystudent":
        return (
          <div className="space-y-4">
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
              <div className="text-sm font-semibold text-[#0a0a0a] mb-1">My Student Settings</div>
              <div className="text-xs text-[#9e9e9e] mb-4">Manage your academic dashboard preferences and privacy.</div>
              <SettingRow label="Student Card Visibility" sub="Your card is private by default" control={<Toggle defaultOn={false} />} />
              <SettingRow label="Show Academic Year" sub="Display academic year on profile" control={<Toggle defaultOn={false} />} />
              <SettingRow label="Show Course List" sub="Allow followers to see your courses" control={<Toggle defaultOn={false} />} />
              <SettingRow label="Deadline Reminders" sub="Get push notifications for deadlines" control={<Toggle defaultOn={true} />} />
              <SettingRow label="Exam Reminders" sub="Receive reminders before exams" control={<Toggle defaultOn={true} />} />
              <SettingRow label="Calendar Sync" sub="Sync with Google Calendar / Apple Calendar" control={<Toggle defaultOn={false} />} />
            </div>
            <button
              onClick={() => onNavigate("mystudent")}
              className="w-full py-3 bg-[#0a0a0a] text-white text-sm font-semibold rounded-2xl hover:bg-[#1a1a1a] transition-colors"
            >
              Open My Student Dashboard
            </button>
          </div>
        );

      case "ai":
        return (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
            <SettingRow label="AI Language" sub="English" />
            <SettingRow label="Response Style" sub="Detailed academic" />
            <SettingRow label="Default Summary Length" sub="15 pages (adjustable)" />
            <SettingRow label="Save Conversations" control={<Toggle defaultOn={true} />} />
            <SettingRow label="Use for Study Reminders" control={<Toggle defaultOn={true} />} />
            <SettingRow label="AI Suggestions in Feed" control={<Toggle defaultOn={false} />} />
            <SettingRow label="Data used for AI Training" sub="Anonymous & aggregated only" control={<Toggle defaultOn={false} />} />
          </div>
        );

      case "appearance":
        return (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
            <div className="text-xs font-semibold text-[#9e9e9e] mb-3">Theme</div>
            <div className="flex gap-3 mb-5">
              {["Light", "Dark", "Auto"].map((t) => (
                <button
                  key={t}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all
                    ${t === "Light" ? "bg-[#0a0a0a] text-white border-transparent" : "border-[#ebebeb] text-[#6b6b6b] hover:border-[#d4d4d4]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <SettingRow label="Font Size" sub="Medium" />
            <SettingRow label="Reduce Motion" control={<Toggle defaultOn={false} />} />
            <SettingRow label="Compact Feed" sub="Show more posts on screen" control={<Toggle defaultOn={false} />} />
          </div>
        );

      default:
        return (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-8 text-center">
            <div className="text-sm font-semibold text-[#0a0a0a] mb-1 capitalize">{active}</div>
            <div className="text-xs text-[#9e9e9e]">This settings section is available in the full version.</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 md:pb-8">
      <div className="max-w-[900px] mx-auto px-4 pt-6">
        <h1 className="text-xl font-semibold text-[#0a0a0a] mb-6" style={{ fontFamily: "Instrument Serif, serif" }}>Settings</h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden md:block w-[220px] flex-shrink-0">
            <div className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all border-b border-[#f5f5f5] last:border-0
                    ${active === s.id ? "bg-[#0a0a0a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"}`}
                >
                  {s.icon}
                  <span className="font-medium text-xs">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile section selector */}
          <div className="md:hidden w-full mb-4">
            <select
              value={active}
              onChange={(e) => setActive(e.target.value as SettingsSection)}
              className="w-full px-4 py-3 bg-white border border-[#ebebeb] rounded-2xl text-sm text-[#0a0a0a] focus:outline-none appearance-none"
            >
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
