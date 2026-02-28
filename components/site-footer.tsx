import Link from "next/link"
import { Zap, Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/20">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                SkillSync
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Fair and transparent skill-based internship matching powered by
              explainable AI and fairness-aware algorithms.
            </p>
            <a
              href="https://github.com/subbareddy95/SYNAPTIX_2K26_X_Idiots"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub Repository
            </a>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Platform</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Candidate Dashboard</Link></li>
              <li><Link href="/recruiter" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Recruiter Dashboard</Link></li>
              <li><Link href="/match-explorer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Match Explorer</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/match-explorer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Algorithm Docs</Link></li>
              <li><Link href="/match-explorer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Fairness Report</Link></li>
              <li><span className="text-sm text-muted-foreground">API Reference</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><span className="text-sm text-muted-foreground">Privacy Policy</span></li>
              <li><span className="text-sm text-muted-foreground">Terms of Service</span></li>
              <li><span className="text-sm text-muted-foreground">Contact</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 SkillSync. Built with fairness-aware algorithms and explainable AI.
          </p>
          <p className="text-xs text-muted-foreground">
            SYNAPTIX 2K26 - X Idiots
          </p>
        </div>
      </div>
    </footer>
  )
}
