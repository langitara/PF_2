"use client"

import { Mail, Github, Instagram, MapPin, Linkedin, ArrowUpRight } from "lucide-react"

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "langitbaggaz@gmail.com",
    href: "mailto:langitbaggaz@gmail.com",
    sub: "Hubungi via email",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/langitara",
    href: "https://github.com/langitara",
    sub: "Lihat kode & proyek",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/baggaz-langit",
    href: "https://www.linkedin.com/in/baggaz-langit-5b2837422/",
    sub: "Koneksi profesional",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@langitr01",
    href: "https://www.instagram.com/langitr01/",
    sub: "Follow update",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Jakarta, Indonesia",
    href: "#",
    sub: "Berbasis di Jakarta",
  },
]

export function TestimonialsSection() {
  return (
    <section id="kontak" className="py-32 px-6 bg-zinc-50/50 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">Kontak</p>
          <h2 className="text-4xl md:text-5xl font-normal leading-tight font-serif mb-4">Hubungi Saya</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tertarik berkolaborasi atau diskusi proyek? Hubungi melalui platform di bawah ini.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-white border border-border rounded-2xl p-6 hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <c.icon className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{c.label}</p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                {c.value} <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <a href="mailto:langitbaggaz@gmail.com" className="inline-flex items-center justify-center gap-2 bg-foreground text-background rounded-full px-8 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors">
            Kirim Email <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="https://github.com/langitara" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border bg-white rounded-full px-8 py-3 text-sm font-medium hover:bg-zinc-50 transition-colors">
            GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/baggaz-langit-5b2837422/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border bg-white rounded-full px-8 py-3 text-sm font-medium hover:bg-zinc-50 transition-colors">
            LinkedIn <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
