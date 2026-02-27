"use client"

import { useState } from "react"
import useSWR from "swr"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MatchResultCard } from "@/components/dashboard/match-result-card"
import { ProjectDetailCard } from "@/components/dashboard/project-detail-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ScoreRing } from "@/components/score-ring"
import { sampleProjects } from "@/lib/seed-data"
import type { MatchResult, Project } from "@/lib/matching-engine"
import { BarChart3, Users, TrendingUp, ShieldCheck } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function RecruiterPage() {
  const [selectedProject, setSelectedProject] = useState("p1")

  const { data, isLoading } = useSWR<{ results: MatchResult[]; project: Project }>(
    `/api/match?type=candidates&id=${selectedProject}`,
    fetcher
  )

  const currentProject = sampleProjects.find((p) => p.id === selectedProject)!

  // Analytics data
  const avgScore = data?.results
    ? Math.round(data.results.reduce((a, r) => a + r.score.overallScore, 0) / data.results.length)
    : 0
  const strongMatches = data?.results?.filter((r) => r.score.overallScore >= 70).length || 0
  const fairnessAdjusted = data?.results?.filter((r) => r.score.fairnessAdjustment !== 0).length || 0

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Recruiter Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                View ranked candidates with explainable match scores for your projects
              </p>
            </div>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {sampleProjects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title} - {p.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Analytics Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{data?.results?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Total Candidates</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{avgScore}</p>
                  <p className="text-xs text-muted-foreground">Avg Match Score</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.65_0.17_145)]/10">
                  <TrendingUp className="h-5 w-5 text-[oklch(0.65_0.17_145)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{strongMatches}</p>
                  <p className="text-xs text-muted-foreground">Strong Matches</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{fairnessAdjusted}</p>
                  <p className="text-xs text-muted-foreground">Fairness Adjusted</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="rankings" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="rankings">Candidate Rankings</TabsTrigger>
              <TabsTrigger value="project">Project Details</TabsTrigger>
              <TabsTrigger value="analytics">Score Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="rankings">
              <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Ranked Candidates
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      Sorted by Match Score (fairness-adjusted)
                    </span>
                  </div>
                  {isLoading ? (
                    <div className="flex flex-col gap-4">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-40 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    data?.results.map((result) => (
                      <MatchResultCard key={result.candidateId} result={result} mode="recruiter" />
                    ))
                  )}
                </div>

                <aside className="hidden lg:block">
                  <div className="sticky top-24">
                    <ProjectDetailCard project={currentProject} />
                  </div>
                </aside>
              </div>
            </TabsContent>

            <TabsContent value="project">
              <div className="mx-auto max-w-2xl">
                <ProjectDetailCard project={currentProject} />
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Score Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Score Distribution</CardTitle>
                    <CardDescription>How candidates scored on this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-end gap-6 justify-center">
                      {data?.results.map((r) => (
                        <div key={r.candidateId} className="flex flex-col items-center gap-2">
                          <ScoreRing score={r.score.overallScore} size={72} strokeWidth={5} />
                          <span className="text-xs text-muted-foreground text-center max-w-[80px] truncate">
                            {r.candidate.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Dimension Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Average Dimension Scores</CardTitle>
                    <CardDescription>Across all candidates for this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data?.results && data.results.length > 0 && (
                      <div className="flex flex-col gap-4">
                        {["skillMatch", "experienceMatch", "projectFit", "preferenceMatch"].map((dim) => {
                          const avg = Math.round(
                            data.results.reduce(
                              (a, r) => a + r.score[dim as keyof typeof r.score] as number,
                              0
                            ) / data.results.length
                          )
                          const labels: Record<string, string> = {
                            skillMatch: "Skill Match",
                            experienceMatch: "Experience Match",
                            projectFit: "Project Fit",
                            preferenceMatch: "Preference Match",
                          }
                          return (
                            <div key={dim}>
                              <div className="mb-1 flex justify-between text-sm">
                                <span className="text-muted-foreground">{labels[dim]}</span>
                                <span className="font-medium text-foreground">{avg}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-secondary">
                                <div
                                  className="h-2 rounded-full bg-primary transition-all"
                                  style={{ width: `${avg}%` }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Fairness Report */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Fairness Report
                    </CardTitle>
                    <CardDescription>Transparency report for this matching session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">{data?.results?.length || 0}</p>
                        <p className="text-xs text-muted-foreground">Candidates Evaluated</p>
                      </div>
                      <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">{fairnessAdjusted}</p>
                        <p className="text-xs text-muted-foreground">Fairness Adjustments Applied</p>
                      </div>
                      <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 text-center">
                        <p className="text-2xl font-bold text-[oklch(0.65_0.17_145)]">100%</p>
                        <p className="text-xs text-muted-foreground">Decisions Explainable</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        All candidate rankings were generated using weighted competency scoring with
                        fairness-aware adjustments. Statistical parity checks were performed to ensure
                        no demographic group was systematically disadvantaged. Each score includes a
                        full breakdown of skill match, experience relevance, project fit, and preference
                        alignment, with adjustments for statistical outliers.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
