"use client"

import { useRef, useEffect, useState } from "react"
import { ProjectCard } from "./project-card"

const projects = [
  {
    title: "Destroy Trash — Game 2D Godot",
    category: "Game Development",
    categoryIcon: "game" as const,
    techStack: "Godot • GDScript",
    sorotan: ["Gameplay Mechanics", "Node Structure & Signals", "Physics Simulation"],
    image: "/images/game-destroytrash.jpg",
    href: "https://arcade.cybermedia.sch.id/play/destroy-trash",
    buttonLabel: "Mainkan Game",
  },
  {
    title: "Kasir Apps — Aplikasi Desktop",
    category: "Desktop Application",
    categoryIcon: "system" as const,
    techStack: "C# • Windows Forms • MySQL",
    sorotan: ["CRUD Penjualan", "Manajemen Stok", "Laporan Transaksi"],
    image: "/images/kasir-apps.png",
    href: "https://github.com/langitara/kasirrrrrr",
    buttonLabel: "Lihat di GitHub",
  },
  {
    title: "Portfolio Website",
    category: "Web Development",
    categoryIcon: "web" as const,
    techStack: "Next.js • TypeScript • Tailwind",
    sorotan: ["Responsive Design", "Optimasi Performa", "UI Modern"],
    image: "/images/webporto.png",
    href: "https://github.com/langitara/PF_2",
    buttonLabel: "Lihat di GitHub",
  },
]

export function PricingSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const positionRef = useRef(0)
  const animationRef = useRef<number | undefined>(undefined)

  const duplicated = [...projects, ...projects, ...projects]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let lastTime = performance.now()
    const speed = () => (isHovered ? 0.3 : 1)
    const animate = (t: number) => {
      const dt = t - lastTime
      lastTime = t
      positionRef.current += speed() * (dt / 16)
      const total = el.scrollWidth / 3
      if (positionRef.current >= total) positionRef.current = 0
      el.style.transform = `translateX(-${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered])

  return (
    <section id="proyek" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Proyek</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Kumpulan proyek terpilih — gim, aplikasi desktop, dan web.
        </p>
      </div>

      <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div ref={scrollRef} className="flex gap-6" style={{ width: "fit-content" }}>
          {duplicated.map((p, i) => (
            <div key={i} className="flex-shrink-0 w-[88vw] sm:w-[60vw] lg:w-[420px]">
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
