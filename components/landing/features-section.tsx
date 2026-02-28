import { Scale, Target, Shield, Eye } from "lucide-react"

const features = [
  {
    title: "Weighted Competency Scoring",
    description:
      "Each skill is weighted based on project requirements. We use multi-dimensional analysis across proficiency, experience depth, and certifications.",
    icon: Scale,
    accent: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Project Requirement Mapping",
    description:
      "Our system maps your competencies directly to project needs, identifying exact gaps and strengths for precise matching.",
    icon: Target,
    accent: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
  },
  {
    title: "Fairness-Aware Ranking",
    description:
      "Built-in statistical parity checks and fairness adjustments ensure bias-free rankings. Every candidate is evaluated equitably.",
    icon: Shield,
    accent: "from-chart-3/10 to-chart-3/5",
    iconColor: "text-chart-3",
  },
  {
    title: "Explainable Match Score",
    description:
      "See exactly how your score was calculated -- broken down by skill, experience, project fit, and fairness adjustments. Complete transparency.",
    icon: Eye,
    accent: "from-chart-4/10 to-chart-4/5",
    iconColor: "text-chart-4",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Core Features
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for fairness and transparency
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Every decision our platform makes is explainable, auditable, and fair.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Subtle gradient bg on hover */}
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-muted/80 transition-colors duration-300 group-hover:bg-card">
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
