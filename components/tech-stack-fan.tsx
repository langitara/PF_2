"use client"

import { useState, useEffect, useRef } from "react"
import { Gamepad2, Code2, Monitor, Database, Wrench } from "lucide-react"

const stacks = [
  {
    icon: Gamepad2,
    title: "Game Development",
    tags: ["Godot", "GDScript"],
    logos: ["/logos/Godot_logo.svg"],
    desc: "Gameplay mechanics, node structure, signals, collision detection.",
    sub: "Godot Engine · GDScript",
  },
  {
    icon: Code2,
    title: "Bahasa Pemrograman",
    tags: ["C#", "C++", "Python", "Java"],
    logos: ["/logos/Csharp_Logo.png", "/logos/ISO_C++_Logo.svg", "/logos/Python-logo.png", "/logos/Java.svg"],
    desc: "Logika pemrograman, algoritma, dan pengembangan aplikasi multi-bahasa.",
    sub: "C# · C++ · Python · Java",
  },
  {
    icon: Monitor,
    title: "Desktop Application",
    tags: ["C# Windows Forms"],
    logos: ["/logos/Csharp_Logo.png", "/logos/Visual_Studio_Icon_2022.svg", "/logos/Visual_Studio_Code_0.10.1_icon.png"],
    desc: "Membangun aplikasi desktop interaktif dengan antarmuka yang mudah dipakai.",
    sub: "C# Windows Forms",
  },
  {
    icon: Database,
    title: "Database & Systems",
    tags: ["MySQL", "CRUD", "Linux"],
    logos: ["/logos/MySQL-Logo.wine.svg", "/logos/Linux-Logo.wine.svg"],
    desc: "Integrasi database dan operasi dasar terminal pada sistem Linux.",
    sub: "MySQL · CRUD · Linux",
  },
  {
    icon: Wrench,
    title: "Tools & Version Control",
    tags: ["Git", "GitHub", "VS 2022", "VS Code"],
    logos: ["/logos/Git-logo.svg", "/logos/github-inverted.svg", "/logos/Visual_Studio_Icon_2022.svg", "/logos/Visual_Studio_Code_0.10.1_icon.png"],
    desc: "Manajemen kode, kolaborasi proyek, dan alur kerja pengembangan modern.",
    sub: "Git · GitHub · VS 2022 · VS Code",
  },
]

export function TechStackFan() {
  const [active, setActive] = useState(3)
  const [isMobile, setIsMobile] = useState(false)
  const startX = useRef<number | null>(null)
  const dragging = useRef(false)
  const [dragOffset, setDragOffset] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)")
    const on = () => setIsMobile(m.matches)
    on()
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    startX.current = e.clientX
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || startX.current === null) return
    setDragOffset(e.clientX - startX.current)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return
    dragging.current = false
    const d = dragOffset
    setDragOffset(0)
    startX.current = null
    if (d < -60) setActive((a) => Math.min(a + 1, stacks.length - 1))
    else if (d > 60) setActive((a) => Math.max(a - 1, 0))
  }

  useEffect(() => {
    if (!isMobile || !scrollRef.current) return
    const el = scrollRef.current
    const cardWidth = 288 + 16
    el.scrollTo({ left: active * cardWidth - (el.clientWidth - 288) / 2, behavior: "smooth" })
  }, [active, isMobile])

  if (isMobile) {
    return (
      <div className="w-full">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 pb-4 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {stacks.map((s, i) => {
            const isActive = i === active
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 w-[288px] snap-center text-left rounded-2xl p-6 border flex flex-col transition-all duration-300 cursor-pointer ${
                  isActive ? "bg-card border-border shadow-lg scale-[1.02]" : "bg-card/70 border-border/60"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isActive ? "bg-foreground text-background" : "bg-muted text-foreground"}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="flex gap-1.5 mb-3">
                  {s.logos.map((src) => (
                    <div key={src} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm border border-border/20">
                      <img src={src} alt="" className="max-w-full max-h-full object-contain" loading="eager" />
                    </div>
                  ))}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.tags.map((t) => (
                    <span key={t} className={`text-xs px-2.5 py-1 rounded-full font-medium ${isActive ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>{t}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <p className="text-xs text-muted-foreground/60 mt-3">{s.sub}</p>
              </button>
            )
          })}
        </div>
        <div className="flex justify-center gap-1.5 mt-4">
          {stacks.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-foreground" : "w-1.5 bg-border"}`} />
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground/60 mt-3">Geser untuk melihat lainnya →</p>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
      <div
        className="relative flex justify-center items-end select-none touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ width: 1100, height: 400, touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {stacks.map((s, i) => {
          const isActive = i === active
          const offset = i - active
          const rotate = offset * 3.2 + dragOffset * 0.02
          const translateX = offset * 168 + dragOffset * 0.35
          const translateY = Math.abs(offset) * 10
          const z = 20 - Math.abs(offset)
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`absolute left-1/2 top-6 w-[300px] h-[360px] rounded-[20px] p-6 text-left border flex flex-col transition-all ease-out cursor-pointer ${
                isActive ? "bg-card border-border shadow-xl" : "bg-card border-border/70 shadow-md hover:shadow-lg hover:border-border"
              }`}
              style={{
                transform: `translateX(-50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`,
                zIndex: z,
                transitionDuration: dragging.current ? "0ms" : "400ms",
              }}
            >
              <div className={`w-10 h-10 flex items-center justify-center mb-3 ${isActive ? "bg-foreground text-background rounded-xl" : "bg-muted text-foreground rounded-xl"}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="flex gap-1.5 mb-3">
                {s.logos.map((src) => (
                  <div key={src} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm border border-border/20">
                    <img src={src} alt="" className="max-w-full max-h-full object-contain" loading="eager" />
                  </div>
                ))}
              </div>
              <h3 className="font-semibold text-foreground leading-tight mb-2">{s.title}</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.tags.map((t) => (
                  <span key={t} className={`text-[10px] px-2 py-1 rounded-full border font-medium ${isActive ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border"}`}>{t}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{s.desc}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-auto pt-4">{s.sub}</p>
              {isActive && <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-foreground" />}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <button onClick={() => setActive((a) => Math.max(a - 1, 0))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-sm">‹</button>
        <div className="flex gap-1.5">
          {stacks.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-foreground" : "w-1.5 bg-border"}`} />
          ))}
        </div>
        <button onClick={() => setActive((a) => Math.min(a + 1, stacks.length - 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-sm">›</button>
      </div>
      <p className="text-xs text-muted-foreground/60 mt-3">Seret kartu untuk menggeser →</p>
    </div>
  )
}
