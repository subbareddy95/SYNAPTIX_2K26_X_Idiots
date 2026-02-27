import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-primary/[0.03] p-12 text-center md:p-20">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="relative">
            <h2 className="font-[family-name:var(--font-heading)] text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ready for fair, transparent matching?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Join thousands of candidates and recruiters who trust SkillSync for
              equitable, data-driven opportunity allocation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 px-8 shadow-md shadow-primary/20" asChild>
                <Link href="/dashboard">
                  Start Matching
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8" asChild>
                <Link href="/match-explorer">Explore Algorithm</Link>
              </Button>
            </div>

            {/* GitHub link */}
            <div className="mt-8">
              <a
                href="https://github.com/subbareddy95/SYNAPTIX_2K26_X_Idiots"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
