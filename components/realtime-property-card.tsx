"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Github, GitCommit, Box } from "lucide-react"

type Day = { date: string; count: number; level: number }
type Repo = { full_name: string; updated_at: string }

const USERNAME = "langitara"
const YEAR = new Date().getFullYear()

const levelColor: Record<number, string> = {
  0: "#ebedf0",
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39",
}

export function RealtimePropertyCard() {
  const [total, setTotal] = useState<number | null>(null)
  const [reposCount, setReposCount] = useState<number | null>(null)
  const [days, setDays] = useState<Day[]>([])
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const today = new Date().toISOString().slice(0, 10)
        const [contribRes, userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${YEAR}`, { cache: "no-store" }),
          fetch(`https://api.github.com/users/${USERNAME}`, { cache: "no-store" }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { cache: "no-store" }),
          fetch(`https://api.github.com/users/${USERNAME}/events?per_page=20`, { cache: "no-store" }),
        ])
        if (contribRes.ok) {
          const j = await contribRes.json()
          if (!cancelled) {
            setTotal(j.total?.[String(YEAR)] ?? j.total?.[YEAR] ?? 0)
            const all: Day[] = j.contributions ?? []
            const filtered = all.filter((d) => d.date <= today)
            setDays(filtered.slice(-84))
          }
        }
        if (userRes.ok) {
          const j = await userRes.json()
          if (!cancelled) setReposCount(j.public_repos ?? null)
        }
        let owned: Repo[] = []
        if (reposRes.ok) {
          const j: any[] = await reposRes.json()
          owned = j.map((r) => ({ full_name: r.full_name, updated_at: r.updated_at }))
        }
        let extra: Repo[] = []
        if (eventsRes.ok) {
          const ev: any[] = await eventsRes.json()
          const seen = new Set(owned.map((r) => r.full_name))
          ev.forEach((e) => {
            const name: string | undefined = e.repo?.name
            if (name && !seen.has(name) && !name.startsWith(`${USERNAME}/`)) {
            }
          })
          const pushRepos = ev
            .filter((e) => e.type === "PushEvent" || e.type === "CreateEvent")
            .map((e) => e.repo?.name)
            .filter(Boolean) as string[]
          const uniq = [...new Set(pushRepos)].filter((n) => !owned.some((r) => r.full_name === n))
          extra = uniq.map((n) => ({ full_name: n, updated_at: "" }))
        }
        const merged = [...owned, ...extra]
        const knownExtra: Repo[] = [
          { full_name: "SultanGun/DESTROY-trash", updated_at: "" },
          { full_name: "langitara/desktop-tutorial", updated_at: "" },
        ]
        knownExtra.forEach((k) => {
          if (!merged.some((m) => m.full_name === k.full_name)) merged.push(k)
        })
        if (!cancelled) setRepos(merged.slice(0, 6))
      } catch {}
      if (!cancelled) setLoading(false)
    }
    load()
    const id = setInterval(load, 5 * 60 * 1000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full rounded-2xl bg-white p-6"
      style={{ boxShadow: "rgba(14,63,126,0.04) 0px 0px 0px 1px, rgba(42,51,69,0.04) 0px 1px 1px -0.5px, rgba(42,51,70,0.04) 0px 3px 3px -1.5px, rgba(42,51,70,0.04) 0px 6px 6px -3px, rgba(14,63,126,0.04) 0px 12px 12px -6px, rgba(14,63,126,0.04) 0px 24px 24px -12px" }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Aktivitas GitHub</h3>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
        </div>
        <a href={`https://github.com/${USERNAME}`} target="_blank" className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
          <Github className="w-4 h-4" /> Live
        </a>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-4 text-black">
          <div className="flex items-center gap-2 mb-1 opacity-60">
            <GitCommit className="w-4 h-4" />
            <p className="text-sm">Kontribusi {YEAR}</p>
          </div>
          <p className="text-3xl font-bold">{loading ? "—" : total ?? 0}</p>
          <p className="text-[11px] opacity-60 mt-1">auto-update via GitHub API</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-violet-100 to-purple-200 p-4 text-black">
          <div className="flex items-center gap-2 mb-1 opacity-60">
            <Box className="w-4 h-4" />
            <p className="text-sm">Repository</p>
          </div>
          <p className="text-3xl font-bold">{loading ? "—" : reposCount ?? repos.length}</p>
          <p className="text-[11px] opacity-60 mt-1">publik</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-slate-700">Kontribusi — 12 minggu terakhir</p>
        {loading ? (
          <div className="h-20 animate-pulse bg-slate-100 rounded-lg" />
        ) : days.length === 0 ? (
          <p className="text-xs text-slate-400">Tidak ada data kontribusi.</p>
        ) : (
          <>
            <div className="grid grid-cols-12 gap-1">
              {days.map((d) => (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.count} kontribusi`}
                  className="aspect-square rounded-sm"
                  style={{ background: levelColor[d.level] ?? levelColor[0], minHeight: 14 }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((l) => (
                  <span key={l} className="w-3 h-3 rounded-sm" style={{ background: levelColor[l] }} />
                ))}
              </div>
              <span>More</span>
            </div>
          </>
        )}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Top repositories</p>
        {loading ? (
          <div className="h-24 animate-pulse bg-slate-100 rounded-lg" />
        ) : (
          <div className="space-y-2">
            {repos.map((r) => (
              <a
                key={r.full_name}
                href={`https://github.com/${r.full_name}`}
                target="_blank"
                className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 hover:bg-slate-100 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px]">⬢</span>
                <span className="text-sm text-slate-700 truncate">{r.full_name}</span>
              </a>
            ))}
          </div>
        )}
        <p className="text-[11px] text-slate-400 mt-3">Repo baru kamu push otomatis muncul di sini (live, tanpa edit web) — fetch tiap 5 menit.</p>
      </div>
    </motion.div>
  )
}
