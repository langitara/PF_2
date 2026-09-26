import Link from "next/link"
import { Mail, Github, Instagram, Linkedin, MapPin } from "lucide-react"

const footerLinks = {
  navigasi: [
    { label: "Beranda", href: "#beranda" },
    { label: "Tentang", href: "#tentang" },
    { label: "Pendidikan", href: "#pendidikan" },
    { label: "Tech Stack", href: "#tech-stack" },
  ],
  proyek: [
    { label: "Aplikasi Desktop", href: "#proyek" },
    { label: "Game 2D Godot", href: "#proyek" },
    { label: "Keahlian", href: "#keahlian" },
  ],
  kontak: [
    { label: "langitbaggaz@gmail.com", href: "mailto:langitbaggaz@gmail.com" },
    { label: "github.com/langitara", href: "https://github.com/langitara" },
    { label: "linkedin.com/in/baggaz-langit", href: "https://www.linkedin.com/in/baggaz-langit-5b2837422/" },
    { label: "instagram.com/langitr01", href: "https://www.instagram.com/langitr01/" },
    { label: "Jakarta, Indonesia", href: "#kontak" },
  ],
}

export function Footer() {
  return (
    <div className="relative">

      <footer id="footer" className="relative z-20 border-t border-border py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-base font-bold tracking-tight text-foreground">BAGGAZ</span>
                <span className="text-xs text-muted-foreground">Langit Romdoni</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6">Game & Software Developer — SMK Cyber Media Jakarta.</p>
              <div className="flex gap-4">
                <Link href="mailto:langitbaggaz@gmail.com" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Mail className="w-4 h-4" />
                </Link>
                <Link href="https://github.com/langitara" target="_blank" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Github className="w-4 h-4" />
                </Link>
                <Link href="https://www.linkedin.com/in/baggaz-langit-5b2837422/" target="_blank" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link href="https://www.instagram.com/langitr01/" target="_blank" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link href="#kontak" className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  <MapPin className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-3">
                {footerLinks.navigasi.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Proyek</h4>
              <ul className="space-y-3">
                {footerLinks.proyek.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Kontak</h4>
              <ul className="space-y-3">
                {footerLinks.kontak.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Lainnya</h4>
              <ul className="space-y-3">
                <li><Link href="/CV_BaggazLangitRomdoni.pdf" download="CV_BaggazLangitRomdoni.pdf" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Download CV</Link></li>
                <li><span className="text-sm text-muted-foreground">Jakarta, Indonesia</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2026 Baggaz Langit Romdoni. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">SMK Cyber Media — Game Development</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
