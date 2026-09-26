"use client"
import { useEffect, useState } from "react"
import { AnimatedText } from "./animated-text"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let rafId: number
    let currentProgress = 0

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 400
      const targetProgress = Math.min(scrollY / maxScroll, 1)

      const smoothUpdate = () => {
        currentProgress += (targetProgress - currentProgress) * 0.1

        if (Math.abs(targetProgress - currentProgress) > 0.001) {
          setScrollProgress(currentProgress)
          rafId = requestAnimationFrame(smoothUpdate)
        } else {
          setScrollProgress(targetProgress)
        }
      }

      cancelAnimationFrame(rafId)
      smoothUpdate()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const easeOutQuad = (t: number) => t * (2 - t)
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const scale = 1 - easeOutQuad(scrollProgress) * 0.15
  const borderRadius = easeOutCubic(scrollProgress) * 48
  const heightVh = 100 - easeOutQuad(scrollProgress) * 37.5

  return (
    <section id="beranda" className="pt-32 pb-12 px-6 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 top-0">
        <div
          className="w-full will-change-transform overflow-hidden"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            height: `${heightVh}vh`,
          }}
        >
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/af7687fd-f2ad-4f2a-96f0-b56fa7d3769c-08wERpo5U1sktxs1vcRsJW9ueslNZv.mp4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <div
            className={`transition-all duration-1000 delay-[800ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/90 font-medium mb-4">Portfolio</p>
            <h1 className="font-serif text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[7.5rem] font-normal leading-[0.9] mb-4 w-full px-4 max-w-6xl mx-auto text-balance">
              <AnimatedText text="BAGGAZ LANGIT ROMDONI" delay={0.3} />
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light tracking-wide">Game & Software Developer</p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <a href="#proyek" className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-zinc-100 transition-colors">
                Lihat Proyek
              </a>
              <a href="#kontak" className="bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-white/20 transition-colors">
                Hubungi Saya
              </a>
              <a href="/CV_BaggazLangitRomdoni.pdf" download="CV_BaggazLangitRomdoni.pdf" className="bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-white/20 transition-colors">
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className={`flex justify-center mt-6 transition-all duration-1000 delay-[1100ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-white/50 text-xs tracking-widest">SMK Cyber Media • Jakarta • Game Development</p>
        </div>
      </div>
    </section>
  )
}
