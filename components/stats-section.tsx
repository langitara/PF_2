"use client"
import { useEffect, useState } from "react"
import { Gamepad2, Code2, Monitor, Database, Wrench } from "lucide-react"

const techStack = [
  { icon: Gamepad2, label: "Game Dev", items: "Godot • GDScript" },
  { icon: Code2, label: "Bahasa", items: "C# • C++ • Python • Java" },
  { icon: Monitor, label: "Desktop App", items: "C# Windows Forms" },
  { icon: Database, label: "Database & Sistem", items: "MySQL • Linux" },
  { icon: Wrench, label: "Tools", items: "Git • GitHub • VS 2022 • VS Code" },
]

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    const section = document.getElementById("tech-stack")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="tech-stack" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">Tech Stack & Tooling</p>
          <h2 className="text-4xl md:text-5xl font-normal font-serif mb-4">Teknologi yang saya pakai</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Teknologi dan tools untuk pengembangan gim dan aplikasi desktop.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {techStack.map((stack, i) => (
            <div
              key={i}
              className={`text-center p-6 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <stack.icon className="w-8 h-8 mx-auto mb-3 text-foreground" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-foreground mb-1">{stack.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{stack.items}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
