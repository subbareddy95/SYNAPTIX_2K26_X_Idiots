"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, Zap, Github } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Candidates" },
  { href: "/recruiter", label: "Recruiters" },
  { href: "/match-explorer", label: "Explorer" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-foreground">
            SkillSync
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" asChild>
            <a
              href="https://github.com/subbareddy95/SYNAPTIX_2K26_X_Idiots"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button size="sm" className="shadow-sm shadow-primary/20" asChild>
            <Link href="/recruiter">Post a Project</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-border/50 glass md:hidden">
          <nav className="flex flex-col gap-1 p-4" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border/50 pt-3">
              <a
                href="https://github.com/subbareddy95/SYNAPTIX_2K26_X_Idiots"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub Repository
              </a>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/recruiter">Post a Project</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
