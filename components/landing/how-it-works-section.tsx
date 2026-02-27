import { UserCircle, Brain, BarChart3 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Create Skill Profile",
    description:
      "Build your comprehensive skill profile with competencies, experience levels, and project history. Our system captures the depth of your abilities.",
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
    <section className="border-t border-border/60 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Three steps to your perfect match
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground leading-relaxed">
            Our transparent matching process ensures you understand every aspect of your score.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary/60">
                  Step {step.number}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
