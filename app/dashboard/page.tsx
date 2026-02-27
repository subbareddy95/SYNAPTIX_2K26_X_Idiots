"use client"

import { useState } from "react"
import useSWR from "swr"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CandidateProfile } from "@/components/dashboard/candidate-profile"
import { MatchResultCard } from "@/components/dashboard/match-result-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { sampleCandidates } from "@/lib/seed-data"
import type { MatchResult, Candidate } from "@/lib/matching-engine"
import { LayoutDashboard, User } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function DashboardPage() {
  const [selectedCandidate, setSelectedCandidate] = useState("c1")

  const { data, isLoading } = useSWR<{ results: MatchResult[]; candidate: Candidate }>(
    `/api/match?type=projects&id=${selectedCandidate}`,
    fetcher
  )

  const currentCandidate = sampleCandidates.find((c) => c.id === selectedCandidate)!

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b border-border/40 bg-muted/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
                  Candidate Dashboard
                </h1>
                <Badge variant="outline" className="text-xs text-primary border-primary/20 bg-primary/5">
                  AI Matching
                </Badge>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                View your skill profile and explore transparent project matches
              </p>
            </div>
            <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
              <SelectTrigger className="w-[260px] bg-card">
                <SelectValue placeholder="Select candidate" />
              </SelectTrigger>
              <SelectContent>
                {sampleCandidates.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="matches" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Project Matches
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Skill Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="matches">
              <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                {/* Match Results */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                      Your Top Matches
                    </h2>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {data?.results.length || 0} projects
                    </span>
                  </div>
                  {isLoading ? (
                    <div className="flex flex-col gap-4">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-44 w-full rounded-2xl" />
                      ))}
                    </div>
                  ) : (
                    data?.results.map((result, i) => (
                      <div
                        key={result.projectId}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <MatchResultCard result={result} mode="candidate" />
                      </div>
                    ))
                  )}
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block">
                  <div className="sticky top-24">
                    <CandidateProfile candidate={currentCandidate} />
                  </div>
                </aside>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <div className="mx-auto max-w-2xl animate-fade-in-up">
                <CandidateProfile candidate={currentCandidate} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
