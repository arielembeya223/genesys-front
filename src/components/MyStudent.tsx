import { useState } from "react";

type MsTab = "dashboard" | "card" | "timetable" | "calendar" | "exams" | "courses";

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  professor: string;
  classroom: string;
  days: string[];
  startTime: string;
  endTime: string;
  examDate: string;
  color: string;
}

const courses: Course[] = [
  { id: 1, name: "Distributed Systems", code: "CS6.824", credits: 12, professor: "Prof. Morris", classroom: "32-G882", days: ["Mon", "Wed"], startTime: "09:00", endTime: "10:30", examDate: "Jan 15, 2027", color: "#0a0a0a" },
  { id: 2, name: "Machine Learning", code: "CS6.867", credits: 12, professor: "Prof. Jaakkola", classroom: "32-123", days: ["Tue", "Thu"], startTime: "11:00", endTime: "12:30", examDate: "Jan 18, 2027", color: "#2e2e2e" },
  { id: 3, name: "Advanced Algorithms", code: "CS6.046", credits: 12, professor: "Prof. Devadas", classroom: "54-100", days: ["Mon", "Fri"], startTime: "14:00", endTime: "15:30", examDate: "Jan 22, 2027", color: "#6b6b6b" },
  { id: 4, name: "Research Seminar", code: "CS6.900", credits: 6, professor: "Prof. Williams", classroom: "32-D463", days: ["Wed"], startTime: "16:00", endTime: "17:30", examDate: "Continuous", color: "#9e9e9e" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const upcomingDeadlines = [
  { title: "CS6.824 Lab 3 — Raft Consensus", due: "Nov 14, 2026", type: "Assignment", urgent: true },
  { title: "CS6.867 Problem Set 5", due: "Nov 18, 2026", type: "Problem Set", urgent: true },
  { title: "CS6.046 Final Project Proposal", due: "Nov 25, 2026", type: "Project", urgent: false },
  { title: "CS6.900 Research Summary", due: "Dec 2, 2026", type: "Report", urgent: false },
];

function StudentCard() {
  return (
    <div className="max-w-[360px] mx-auto">
      <div className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "1.586" }}>
        {/* Card header */}
        <div className="bg-[#0a0a0a] px-5 py-3 flex items-center justify-between">
          <div>
            <div className="text-[8px] text-[#9e9e9e] tracking-[0.15em] uppercase">Student Identity Card</div>
            <div className="text-white text-xs font-semibold" style={{ fontFamily: "Instrument Serif, serif" }}>
              Massachusetts Institute of Technology
            </div>
          </div>
          {/* Logo placeholder */}
          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
            <span className="text-white text-xs font-bold" style={{ fontFamily: "Instrument Serif, serif" }}>M</span>
          </div>
        </div>

        {/* Card body */}
        <div className="flex items-stretch p-4 gap-4 h-full">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-[70px] h-[80px] bg-[#f5f5f5] rounded-lg overflow-hidden border border-[#ebebeb] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=120&fit=crop&auto=format"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[7px] text-center text-[#9e9e9e] mt-1">PHOTO</div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[#0a0a0a]" style={{ fontFamily: "Instrument Serif, serif" }}>
              Alex Moreau
            </div>
            <div className="text-[10px] text-[#6b6b6b] mt-0.5">MSc Computer Science & AI</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-[9px] text-[#9e9e9e]">Student ID</span>
                <span className="text-[9px] font-mono font-semibold text-[#0a0a0a]">MIT-2024-98421</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-[#9e9e9e]">Valid until</span>
                <span className="text-[9px] font-mono font-semibold text-[#0a0a0a]">June 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-[#9e9e9e]">Year</span>
                <span className="text-[9px] font-semibold text-[#0a0a0a]">2nd Year</span>
              </div>
            </div>
            {/* Barcode */}
            <div className="mt-2">
              <div className="flex gap-px h-6 items-end">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="flex-1 bg-[#0a0a0a] rounded-sm" style={{ height: `${Math.random() > 0.5 ? "100%" : `${40 + Math.random() * 60}%`}` }} />
                ))}
              </div>
              <div className="text-[7px] font-mono text-[#9e9e9e] mt-0.5 text-center">MIT-2024-98421-CS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 p-3 bg-[#f5f5f5] rounded-xl border border-[#ebebeb]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
        <span className="text-xs text-[#9e9e9e]">This card is private by default. Only you can see it.</span>
      </div>

      <button className="mt-3 w-full py-2.5 border border-[#ebebeb] rounded-xl text-xs font-semibold text-[#0a0a0a] hover:bg-[#f5f5f5] transition-all flex items-center justify-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
        Upload physical card image
      </button>
    </div>
  );
}

function Timetable() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Day headers */}
        <div className="grid grid-cols-6 gap-1 mb-1">
          <div className="text-[10px] text-[#9e9e9e] text-right pr-2"></div>
          {days.map((d) => (
            <div key={d} className="text-[10px] font-semibold text-[#0a0a0a] text-center py-2 bg-[#f5f5f5] rounded-lg">{d}</div>
          ))}
        </div>

        {/* Time slots */}
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-6 gap-1 mb-1">
            <div className="text-[10px] text-[#9e9e9e] text-right pr-2 pt-1 font-mono">{hour}</div>
            {days.map((day) => {
              const course = courses.find(
                (c) => c.days.includes(day) && c.startTime === hour
              );
              if (course) {
                const span = parseInt(course.endTime) - parseInt(course.startTime);
                return (
                  <div
                    key={day}
                    className="rounded-lg p-2 text-white"
                    style={{ background: course.color, minHeight: "52px" }}
                  >
                    <div className="text-[9px] font-bold truncate">{course.name}</div>
                    <div className="text-[8px] opacity-70">{course.code}</div>
                    <div className="text-[8px] opacity-70">{course.classroom}</div>
                  </div>
                );
              }
              return (
                <div key={day} className="rounded-lg bg-[#f5f5f5] min-h-[52px]" />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyStudent() {
  const [activeTab, setActiveTab] = useState<MsTab>("dashboard");

  const tabs: { id: MsTab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "card", label: "Student Card" },
    { id: "timetable", label: "Timetable" },
    { id: "courses", label: "Courses" },
    { id: "exams", label: "Exams" },
    { id: "calendar", label: "Calendar" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[#ebebeb] px-4 py-5 sticky top-0 z-30">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-xl font-semibold text-[#0a0a0a]" style={{ fontFamily: "Instrument Serif, serif" }}>My Student</h1>
              <div className="text-xs text-[#9e9e9e]">Academic Year 2025–2026 · MIT</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#0a0a0a] text-white text-xs font-semibold rounded-xl hover:bg-[#1a1a1a] transition-colors flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Add Course
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${activeTab === tab.id ? "bg-[#0a0a0a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f5f5]"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 pt-5">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-5">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Courses", value: "4", sub: "this semester" },
                { label: "Total Credits", value: "42", sub: "of 120 required" },
                { label: "Exams", value: "4", sub: "upcoming" },
                { label: "Deadlines", value: "4", sub: "this month" },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-[#ebebeb] rounded-2xl p-4">
                  <div className="text-2xl font-bold text-[#0a0a0a]" style={{ fontFamily: "Instrument Serif, serif" }}>{s.value}</div>
                  <div className="text-xs font-semibold text-[#0a0a0a] mt-0.5">{s.label}</div>
                  <div className="text-[10px] text-[#9e9e9e]">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Upcoming deadlines */}
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[#0a0a0a]">Upcoming Deadlines</h2>
                <button className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a]">View all</button>
              </div>
              <div className="space-y-3">
                {upcomingDeadlines.map((d) => (
                  <div key={d.title} className="flex items-center gap-3 py-2 border-b border-[#f5f5f5] last:border-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${d.urgent ? "bg-[#0a0a0a]" : "bg-[#d4d4d4]"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[#0a0a0a] truncate">{d.title}</div>
                      <div className="text-[10px] text-[#9e9e9e]">{d.type}</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#6b6b6b] flex-shrink-0">{d.due}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses list */}
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[#0a0a0a]">My Courses</h2>
                <button onClick={() => setActiveTab("courses")} className="text-xs text-[#6b6b6b] hover:text-[#0a0a0a]">Manage</button>
              </div>
              <div className="space-y-3">
                {courses.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c.color }} />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-[#0a0a0a]">{c.name}</div>
                      <div className="text-[10px] text-[#9e9e9e]">{c.code} · {c.professor}</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#9e9e9e]">{c.credits} cr.</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "card" && <StudentCard />}

        {activeTab === "timetable" && (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-[#0a0a0a] mb-4">Weekly Timetable</h2>
            <Timetable />
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="bg-white border border-[#ebebeb] rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-12 rounded-full" style={{ background: c.color }} />
                    <div>
                      <div className="text-sm font-semibold text-[#0a0a0a]">{c.name}</div>
                      <div className="text-xs text-[#9e9e9e]">{c.code}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1.5 border border-[#ebebeb] rounded-lg text-[#6b6b6b] hover:bg-[#f5f5f5] transition-all">Edit</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Credits", value: `${c.credits} ECTS` },
                    { label: "Professor", value: c.professor },
                    { label: "Room", value: c.classroom },
                    { label: "Schedule", value: `${c.days.join(", ")} · ${c.startTime}–${c.endTime}` },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-[10px] text-[#9e9e9e] mb-0.5">{item.label}</div>
                      <div className="text-xs font-medium text-[#0a0a0a]">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f5f5f5]">
                  <div className="text-[10px] text-[#9e9e9e]">Exam:</div>
                  <div className="text-[10px] font-semibold text-[#0a0a0a]">{c.examDate}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "exams" && (
          <div className="space-y-3">
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[#0a0a0a] mb-4">Exam Schedule — January 2027</h2>
              {courses.map((c, idx) => (
                <div key={c.id} className={`flex items-center gap-4 py-3 ${idx < courses.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}>
                  <div className="text-center w-12">
                    <div className="text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "Instrument Serif, serif" }}>
                      {c.examDate === "Continuous" ? "—" : c.examDate.split(", ")[0].split(" ")[1]}
                    </div>
                    <div className="text-[9px] text-[#9e9e9e]">
                      {c.examDate === "Continuous" ? "" : c.examDate.split(", ")[0].split(" ")[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#0a0a0a]">{c.name}</div>
                    <div className="text-xs text-[#9e9e9e]">{c.code} · {c.examDate}</div>
                  </div>
                  <div className="text-xs font-semibold text-[#0a0a0a] border border-[#ebebeb] px-2 py-1 rounded-lg">
                    {c.examDate === "Continuous" ? "Continuous" : "Written"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#0a0a0a]">November 2026</h2>
              <div className="flex gap-2">
                <button className="w-7 h-7 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center text-[#9e9e9e] hover:text-[#0a0a0a] transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button className="w-7 h-7 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center text-[#9e9e9e] hover:text-[#0a0a0a] transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div key={d} className="text-[10px] text-[#9e9e9e] font-semibold text-center py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* November 2026 starts on Sunday (offset 6) */}
              {Array.from({ length: 6 }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 9;
                const hasEvent = [14, 18, 25].includes(day);
                return (
                  <div
                    key={day}
                    className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs cursor-pointer transition-all
                      ${isToday ? "bg-[#0a0a0a] text-white font-bold" : "hover:bg-[#f5f5f5] text-[#0a0a0a]"}`}
                  >
                    {day}
                    {hasEvent && (
                      <div className={`w-1 h-1 rounded-full mt-0.5 ${isToday ? "bg-white/50" : "bg-[#0a0a0a]"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
