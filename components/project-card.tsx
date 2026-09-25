"use client"

import Image from "next/image"
import { Gamepad2, Server, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProjectCardProps {
  title: string
  category: string
  categoryIcon: "game" | "system" | "web"
  techStack: string
  sorotan: string[]
  image: string
  href: string
  buttonLabel: string
  className?: string
}

const iconMap = {
  game: Gamepad2,
  system: Server,
  web: Globe,
}

export function ProjectCard({ title, category, categoryIcon, techStack, sorotan, image, href, buttonLabel, className }: ProjectCardProps) {
  const Icon = iconMap[categoryIcon]
  return (
    <div
      className={cn("w-full h-full flex flex-col overflow-hidden rounded-3xl bg-white", className)}
      style={{
        boxShadow:
          "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" unoptimized={image.endsWith(".png")} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon className="h-5 w-5 text-white/90" />
            <span className="text-sm font-medium text-white/90">{category}</span>
          </div>
          <h3 className="text-balance text-xl md:text-2xl font-bold leading-tight text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-start gap-2 text-sm text-slate-600">
          <span className="text-muted-foreground whitespace-nowrap">Tech Stack:</span>
          <span className="font-medium text-slate-800">{techStack}</span>
        </div>

        <div className="mb-5">
          <div className="mb-2 text-sm font-semibold text-slate-900">Sorotan</div>
          <div className="flex flex-wrap gap-2">
            {sorotan.slice(0, 3).map((s, i) => (
              <span key={i} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
                {s}
              </span>
            ))}
            {sorotan.length > 3 && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                +{sorotan.length - 3} lainnya
              </span>
            )}
          </div>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  )
}
