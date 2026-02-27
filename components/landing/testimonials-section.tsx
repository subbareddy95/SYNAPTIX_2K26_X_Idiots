import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "SkillSync matched me to the perfect project. The score breakdown showed me exactly why I was a fit -- it gave me confidence during my interview.",
    name: "Sarah Chen",
    role: "Software Engineering Intern at Google",
    initials: "SC",
  },
  {
    quote:
      "As a recruiter, the explainable rankings transformed our hiring. We can justify every decision with data, and our diversity metrics improved significantly.",
    name: "Marcus Johnson",
    role: "Engineering Manager at Stripe",
    initials: "MJ",
  },
  {
    quote:
      "The fairness-aware scoring felt genuine. For the first time, I felt evaluated on my actual skills, not keywords in my resume.",
    name: "Priya Patel",
    role: "Data Science Intern at Meta",
    initials: "PP",
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-t border-border/40 bg-muted/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Loved by candidates and recruiters
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Stars */}
              <div className="mb-5 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary/80 text-primary/80" />
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${t.quote}"`}
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-border/40 pt-6">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback className="bg-primary/8 text-xs font-semibold text-primary">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
