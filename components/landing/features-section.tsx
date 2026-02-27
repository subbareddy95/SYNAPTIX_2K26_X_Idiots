import { Scale, Target, Shield, Eye } from "lucide-react"

const features = [
  {
    title: "Weighted Competency Scoring",
    description:
      "Each skill is weighted based on project requirements -- not all skills are treated equal. We use multi-factor analysis to calculate relevance.",
    icon: Scale,
  },
  {
    title: "Project Requirement Mapping",
    description:
      "Our system maps your competencies directly to project needs, identifying exact gaps and strengths for precise matching.",
    icon: Target,
  },
  {
    title: "Fairness-Aware Ranking",
    description:
      "Built-in fairness adjustments ensure bias-free rankings. Every candidate is evaluated equitably, regardless of background.",
    icon: Shield,
  },
  {
    title: "Explainable Match Score",
    description:
      "See exactly how your score was calculated -- broken down by skill, experience, project fit, and fairness adjustments. Complete transparency.",
    icon: Eye,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for fairness and transparency
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground leading-relaxed">
            Every decision our platform makes is explainable, auditable, and fair.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-5 rounded-2xl border border-border/60 bg-card p-7 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
