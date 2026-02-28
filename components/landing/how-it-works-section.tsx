import { UserCircle, Brain, BarChart3, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Create Skill Profile",
    description:
      "Build your comprehensive skill profile with competencies, experience levels, and project history. Our system captures the true depth of your abilities.",
    icon: UserCircle,
  },
  {
    number: "02",
    title: "AI Weighted Scoring",
    description:
      "Our explainable AI analyzes your profile against project requirements using weighted competency scoring with fairness-aware algorithms.",
    icon: Brain,
  },
  {
    number: "03",
    title: "Transparent Match Results",
    description:
      "See exactly why you matched -- every score is broken down into skill weight, experience, project fit, and fairness adjustment. No black boxes.",
    icon: BarChart3,
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative border-t border-border/40 bg-muted/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Three steps to your perfect match
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Our transparent matching process ensures you understand every aspect of your score.
          </p>
        </div>

        <div className="relative mt-20 grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute top-12 left-[16.66%] hidden h-px w-[66.66%] bg-border md:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md group-hover:shadow-primary/5">
                <step.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
