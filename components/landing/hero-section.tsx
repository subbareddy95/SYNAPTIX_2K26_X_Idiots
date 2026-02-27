import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Users, Building2, TrendingUp } from "lucide-react"

const stats = [
  { value: "10K+", label: "Candidates Matched", icon: Users },
  { value: "500+", label: "Partner Companies", icon: Building2 },
  { value: "94%", label: "Satisfaction Rate", icon: TrendingUp },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/0.08,transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 lg:px-8 lg:pt-28 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Powered by Explainable AI
          </Badge>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Fair & Transparent Skill-Based Internship Matching
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            We rank candidates using weighted competency scoring and explainable AI
            -- not keyword matching. Every score is transparent, every ranking is fair.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/dashboard">
                Get Matched
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link href="/recruiter">Post a Project</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-card p-5 text-center shadow-sm"
            >
              <stat.icon className="mb-1 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
