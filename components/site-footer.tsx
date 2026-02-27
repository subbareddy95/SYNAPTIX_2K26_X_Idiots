import Link from "next/link"
import { Zap } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">SkillSync</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Fair and transparent skill-based internship matching powered by explainable AI.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Candidate Dashboard</Link></li>
              <li><Link href="/recruiter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recruiter Dashboard</Link></li>
              <li><Link href="/match-explorer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Match Explorer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="flex flex-col gap-2">
              <li><span className="text-sm text-muted-foreground">Algorithm Documentation</span></li>
              <li><span className="text-sm text-muted-foreground">Fairness Report</span></li>
              <li><span className="text-sm text-muted-foreground">API Reference</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
            <ul className="flex flex-col gap-2">
              <li><span className="text-sm text-muted-foreground">About Us</span></li>
              <li><span className="text-sm text-muted-foreground">Privacy Policy</span></li>
              <li><span className="text-sm text-muted-foreground">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          2026 SkillSync. Built with fairness-aware algorithms and explainable AI.
        </div>
      </div>
    </footer>
  )
}
