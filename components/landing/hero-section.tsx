"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Users, Building2, TrendingUp, Shield } from "lucide-react"

const stats = [
  { value: "10K+", label: "Candidates Matched", icon: Users },
  { value: "500+", label: "Partner Companies", icon: Building2 },
  { value: "94%", label: "Satisfaction Rate", icon: TrendingUp },
  { value: "100%", label: "Explainable Decisions", icon: Shield },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 lg:px-8 lg:pt-32 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <Badge
              variant="outline"
              className="mb-8 gap-2 border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Explainable AI
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-heading)] text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Fair & Transparent
            <span className="relative mx-2 inline-block text-primary">
              Skill-Based
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C47.6667 2.16667 141 -2.2 199 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/40" />
              </svg>
            </span>
            Internship Matching
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            We rank candidates using weighted competency scoring and explainable AI
            -- not keyword matching. Every score is transparent, every ranking is fair.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="gap-2 px-8 shadow-md shadow-primary/20 transition-shadow hover:shadow-lg hover:shadow-primary/30" asChild>
              <Link href="/dashboard">
                Get Matched
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 px-8" asChild>
              <Link href="/match-explorer">
                Explore Algorithm
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-24 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`animate-fade-in-up delay-${(i + 3) * 100} group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/80 p-6 text-center shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 transition-colors group-hover:bg-primary/12">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
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
