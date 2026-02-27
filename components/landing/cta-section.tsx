import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center md:p-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready for fair, transparent matching?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground leading-relaxed">
            Join thousands of candidates and recruiters who trust SkillSync for
            equitable, data-driven opportunity allocation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/dashboard">
                Start Matching
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link href="/match-explorer">Explore Algorithm</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
