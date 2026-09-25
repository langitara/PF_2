"use client"

import { Gamepad2, Monitor, Database } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const services = [
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Godot Engine & GDScript — gameplay mechanics, node structure, signals, dan collision detection untuk gim 2D/3D interaktif.",
  },
  {
    icon: Monitor,
    title: "Aplikasi Desktop",
    description: "C# Windows Forms — membangun aplikasi desktop interaktif, validasi input, alur UI yang mudah dipakai, terhubung MySQL.",
  },
  {
    icon: Database,
    title: "Database & Sistem",
    description: "MySQL CRUD, integrasi basis data, dan operasi dasar Linux untuk performa dan arsitektur sistem yang efisien.",
  },
]

function AnimatedIcon({ Icon }: { Icon: any }) {
  const [isVisible, setIsVisible] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (iconRef.current) observer.observe(iconRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={iconRef} className="relative">
      <Icon
        className={`text-foreground h-16 w-16 ${isVisible ? "animate-draw-icon" : ""}`}
        strokeWidth={1}
        style={{
          strokeDasharray: isVisible ? undefined : 1000,
          strokeDashoffset: isVisible ? undefined : 1000,
        }}
      />
    </div>
  )
}

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="tentang" className="py-32 px-6 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-0">
        <span className="font-bold text-center text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] leading-none tracking-tighter text-zinc-100 whitespace-nowrap">
          TENTANG
        </span>
      </div>

      <style jsx>{`
        @keyframes drawPath {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        :global(.animate-draw-icon) :global(path),
        :global(.animate-draw-icon) :global(line),
        :global(.animate-draw-icon) :global(polyline),
        :global(.animate-draw-icon) :global(circle),
        :global(.animate-draw-icon) :global(rect) {
          animation: drawPath 2s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={sectionRef} className="relative px-6 lg:px-8 py-16 lg:py-10 mb-32 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/7aecbceb-cbd3-4cbd-901c-dd0125d41525.png"
              className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isVisible ? "scale-100" : "scale-110"}`}
              src="/videos/tentang-video.mp4"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-1 lg:order-2">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80 font-medium mb-4">Tentang Saya</p>
              <h2 className="font-sans md:text-4xl lg:text-5xl font-medium text-white text-balance mb-8 text-5xl">
                Game & Software Developer
              </h2>
              <div className="space-y-6 text-white/90 leading-relaxed">
                <p>
                  Pengembang perangkat lunak berlatar belakang Game Development dengan fondasi logika, OOP, dan algoritma yang kuat.
                </p>
                <p>
                  Berfokus pada pembangunan gim interaktif 2D/3D serta pengembangan aplikasi desktop yang efisien. Tertarik pada arsitektur sistem, integrasi basis data, dan optimasi performa program.
                </p>
              </div>
              <div className="mt-10"></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Keahlian Utama</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tiga pilar utama dalam pengembangan gim dan aplikasi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group p-8 rounded-3xl hover:bg-zinc-50 transition-colors duration-300 text-center">
              <div className="mb-6 flex justify-center">
                <AnimatedIcon Icon={service.icon} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
