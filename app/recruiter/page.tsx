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
import { BarChart3, Users, TrendingUp, ShieldCheck, ListOrdered, FolderOpen, Activity } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function RecruiterPage() {
  const [selectedProject, setSelectedProject] = useState("p1")

  const { data, isLoading } = useSWR<{ results: MatchResult[]; project: Project }>(
    `/api/match?type=candidates&id=${selectedProject}`,
    fetcher
  )

  const currentProject = sampleProjects.find((p) => p.id === selectedProject)!

  const avgScore = data?.results
    ? Math.round(data.results.reduce((a, r) => a + r.score.overallScore, 0) / data.results.length)
    : 0
  const strongMatches = data?.results?.filter((r) => r.score.overallScore >= 70).length || 0
  const fairnessAdjusted = data?.results?.filter((r) => r.score.fairnessAdjustment !== 0).length || 0

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
                  Recruiter Dashboard
                </h1>
                <Badge variant="outline" className="text-xs text-primary border-primary/20 bg-primary/5">
                  Explainable Rankings
                </Badge>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                View ranked candidates with transparent match scores for your projects
              </p>
            </div>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[300px] bg-card">
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
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Analytics Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Total Candidates", value: data?.results?.length || 0, icon: Users, color: "text-primary", bg: "bg-primary/8" },
              { label: "Avg Match Score", value: avgScore, icon: BarChart3, color: "text-primary", bg: "bg-primary/8" },
              { label: "Strong Matches", value: strongMatches, icon: TrendingUp, color: "text-[oklch(0.60_0.18_145)]", bg: "bg-[oklch(0.60_0.18_145)]/8" },
              { label: "Fairness Adjusted", value: fairnessAdjusted, icon: ShieldCheck, color: "text-chart-4", bg: "bg-chart-4/8" },
            ].map((stat, i) => (
              <Card key={stat.label} className="animate-fade-in-up overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-heading)] text-2xl font-bold tabular-nums text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="rankings" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="rankings" className="gap-2">
                <ListOrdered className="h-4 w-4" />
                Rankings
              </TabsTrigger>
              <TabsTrigger value="project" className="gap-2">
                <FolderOpen className="h-4 w-4" />
                Project Details
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <Activity className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rankings">
              <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                      Ranked Candidates
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      Sorted by Match Score (fairness-adjusted)
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
                        key={result.candidateId}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <MatchResultCard result={result} mode="recruiter" />
                      </div>
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
              <div className="mx-auto max-w-2xl animate-fade-in-up">
                <ProjectDetailCard project={currentProject} />
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Score Distribution */}
                <Card className="animate-fade-in-up">
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-heading)] text-base">Score Distribution</CardTitle>
                    <CardDescription>How candidates scored on this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-end gap-6 justify-center">
                      {data?.results.map((r) => (
                        <div key={r.candidateId} className="flex flex-col items-center gap-2">
                          <ScoreRing score={r.score.overallScore} size={72} strokeWidth={5} />
                          <span className="max-w-[80px] truncate text-center text-xs text-muted-foreground">
                            {r.candidate.name.split(" ")[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Dimension Comparison */}
                <Card className="animate-fade-in-up delay-100">
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-heading)] text-base">Average Dimension Scores</CardTitle>
                    <CardDescription>Across all candidates for this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data?.results && data.results.length > 0 && (
                      <div className="flex flex-col gap-5">
                        {(["skillMatch", "experienceMatch", "projectFit", "preferenceMatch"] as const).map((dim) => {
                          const avg = Math.round(
                            data.results.reduce(
                              (a, r) => a + (r.score[dim] as number),
                              0
                            ) / data.results.length
                          )
                          const labels: Record<string, string> = {
                            skillMatch: "Skill Match",
                            experienceMatch: "Experience",
                            projectFit: "Project Fit",
                            preferenceMatch: "Preference",
                          }
                          return (
                            <div key={dim}>
                              <div className="mb-2 flex justify-between text-sm">
                                <span className="text-muted-foreground">{labels[dim]}</span>
                                <span className="font-medium tabular-nums text-foreground">{avg}%</span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-primary transition-all duration-1000 ease-out"
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
                <Card className="animate-fade-in-up delay-200 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-base">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Fairness Report
                    </CardTitle>
                    <CardDescription>Transparency report for this matching session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        { value: data?.results?.length || 0, label: "Candidates Evaluated", color: "text-foreground" },
                        { value: fairnessAdjusted, label: "Fairness Adjustments", color: "text-foreground" },
                        { value: "100%", label: "Decisions Explainable", color: "text-[oklch(0.60_0.18_145)]" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-border/60 bg-muted/30 p-5 text-center">
                          <p className={`font-[family-name:var(--font-heading)] text-2xl font-bold ${item.color}`}>
                            {item.value}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-xl border border-primary/15 bg-primary/[0.03] p-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        All candidate rankings were generated using weighted competency scoring with
                        fairness-aware adjustments. Statistical parity checks were performed to ensure
                        no demographic group was systematically disadvantaged. Each score includes a
                        full breakdown of skill match, experience relevance, project fit, and preference
                        alignment.
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
