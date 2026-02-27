"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScoreRing } from "@/components/score-ring"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sampleCandidates, sampleProjects } from "@/lib/seed-data"
import { matchCandidateToProject } from "@/lib/matching-engine"
import type { MatchResult } from "@/lib/matching-engine"
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Scale,
  Brain,
  Target,
  ArrowRight,
  Info,
} from "lucide-react"

export default function MatchExplorerPage() {
  const [candidateId, setCandidateId] = useState("c1")
  const [projectId, setProjectId] = useState("p1")

  const candidate = sampleCandidates.find((c) => c.id === candidateId)!
  const project = sampleProjects.find((p) => p.id === projectId)!

  const result: MatchResult = useMemo(() => {
    const allRaw = sampleCandidates.map(() => 50)
    return matchCandidateToProject(candidate, project, allRaw)
  }, [candidate, project])

  const { score, explanation } = result

  const getScoreColor = (s: number) => {
    if (s >= 85) return "text-[oklch(0.65_0.17_145)]"
    if (s >= 70) return "text-primary"
    if (s >= 55) return "text-[oklch(0.75_0.16_65)]"
    return "text-destructive"
  }

  const getScoreBg = (s: number) => {
    if (s >= 85) return "bg-[oklch(0.65_0.17_145)]/10"
    if (s >= 70) return "bg-primary/10"
    if (s >= 55) return "bg-[oklch(0.75_0.16_65)]/10"
    return "bg-destructive/10"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Match Explorer</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore the matching algorithm in detail. Select any candidate-project pair to see exactly how scores are computed.
            </p>
          </div>

          {/* Selectors */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-foreground">Candidate</label>
              <Select value={candidateId} onValueChange={setCandidateId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sampleCandidates.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} - {c.education.field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ArrowRight className="mx-2 hidden h-5 w-5 text-muted-foreground sm:block" />
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-foreground">Project</label>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sampleProjects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title} at {p.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Overall Score */}
          <Card className="mb-8">
            <CardContent className="py-8">
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                <ScoreRing score={score.overallScore} size={120} strokeWidth={8} />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">
                    Match Score: {score.overallScore}/100
                  </h2>
                  <p className={`mt-1 text-sm font-medium ${getScoreColor(score.overallScore)}`}>
                    {explanation.recommendation}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    This score is computed from 5 dimensions: Skill Match (40%), Experience Match (20%),
                    Project Fit (20%), Preference Match (10%), and Fairness Adjustment (10%).
                    Each dimension is independently calculated and transparently reported.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
              <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
              <TabsTrigger value="algorithm">Algorithm Details</TabsTrigger>
              <TabsTrigger value="fairness">Fairness Report</TabsTrigger>
            </TabsList>

            {/* Score Breakdown */}
            <TabsContent value="breakdown">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Skill Match", value: score.skillMatch, weight: "40%", icon: Brain, desc: "Weighted competency scoring across all project requirements" },
                  { label: "Experience Match", value: score.experienceMatch, weight: "20%", icon: Target, desc: "Relevance of prior work experience to this role" },
                  { label: "Project Fit", value: score.projectFit, weight: "20%", icon: Scale, desc: "Alignment of past projects with this project's needs" },
                  { label: "Preference Match", value: score.preferenceMatch, weight: "10%", icon: CheckCircle2, desc: "How well the role matches candidate preferences" },
                ].map((item) => (
                  <Card key={item.label}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getScoreBg(item.value)}`}>
                          <item.icon className={`h-5 w-5 ${getScoreColor(item.value)}`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">Weight: {item.weight}</p>
                        </div>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className={`text-3xl font-bold ${getScoreColor(item.value)}`}>{item.value}</span>
                        <span className="mb-1 text-sm text-muted-foreground">/100</span>
                      </div>
                      <Progress value={item.value} className="mt-3 h-2" />
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Fairness Adjustment Card */}
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        Fairness Adjustment: {score.fairnessAdjustment > 0 ? "+" : ""}{score.fairnessAdjustment}
                      </p>
                      <p className="text-xs text-muted-foreground">Weight: 10% of final score</p>
                    </div>
                    <Badge variant={score.fairnessAdjustment === 0 ? "secondary" : "outline"}>
                      {score.fairnessAdjustment === 0 ? "No Adjustment" : "Applied"}
                    </Badge>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {explanation.fairnessNote}
                  </p>
                </CardContent>
              </Card>

              {/* Strengths & Gaps */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-[oklch(0.65_0.17_145)]">
                      <CheckCircle2 className="h-4 w-4" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-3">
                      {explanation.strengths.length > 0 ? explanation.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.65_0.17_145)]" />
                          {s}
                        </li>
                      )) : (
                        <li className="text-sm text-muted-foreground">No notable strengths identified for this match.</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-[oklch(0.75_0.16_65)]">
                      <AlertCircle className="h-4 w-4" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-3">
                      {explanation.gaps.length > 0 ? explanation.gaps.map((g, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.75_0.16_65)]" />
                          {g}
                        </li>
                      )) : (
                        <li className="text-sm text-muted-foreground">No significant gaps identified for this match.</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skill Analysis */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Skill-by-Skill Breakdown</CardTitle>
                  <CardDescription>
                    Each skill is scored based on the candidate's proficiency relative to the project's requirement,
                    weighted by the skill's importance to the project.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {explanation.skillDetails.map((detail) => (
                      <div
                        key={detail.skillName}
                        className="rounded-xl border border-border/60 bg-secondary/20 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {detail.status === "exceeds" ? (
                              <CheckCircle2 className="h-5 w-5 text-[oklch(0.65_0.17_145)]" />
                            ) : detail.status === "meets" ? (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            ) : detail.status === "partial" ? (
                              <AlertCircle className="h-5 w-5 text-[oklch(0.75_0.16_65)]" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-destructive" />
                            )}
                            <div>
                              <span className="font-semibold text-foreground">{detail.skillName}</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="outline" className="text-[10px] capitalize">{detail.status}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  Weight: {(detail.weight * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xl font-bold ${getScoreColor(detail.score)}`}>
                              {detail.score}
                            </span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-4">
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Candidate Level</p>
                            <div className="flex items-center gap-2">
                              <Progress value={detail.candidateLevel} className="h-2 flex-1" />
                              <span className="text-xs font-medium text-foreground">{detail.candidateLevel}</span>
                            </div>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Required Level</p>
                            <div className="flex items-center gap-2">
                              <Progress value={detail.requiredLevel} className="h-2 flex-1" />
                              <span className="text-xs font-medium text-foreground">{detail.requiredLevel}</span>
                            </div>
                          </div>
                        </div>

                        <p className="mt-2 text-xs text-muted-foreground">
                          {detail.status === "exceeds" && `Candidate exceeds the requirement by ${detail.candidateLevel - detail.requiredLevel} points. Bonus applied for surpassing expectations.`}
                          {detail.status === "meets" && `Candidate meets the minimum requirement. Score reflects solid competency.`}
                          {detail.status === "partial" && `Candidate has ${detail.candidateLevel} proficiency but ${detail.requiredLevel} is required. Partial credit awarded.`}
                          {detail.status === "missing" && `This skill was not found in the candidate's profile. Zero credit for this requirement.`}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Algorithm Details */}
            <TabsContent value="algorithm">
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Matching Algorithm Overview</CardTitle>
                    <CardDescription>How SkillSync computes transparent, explainable match scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      {[
                        {
                          step: "1",
                          title: "Weighted Competency Scoring",
                          formula: "SkillScore = f(candidateLevel / requiredLevel) + experienceBonus + certificationBonus",
                          detail: "Each skill is scored individually by comparing the candidate's proficiency to the project's requirement. Skills are weighted by both their importance to the project (skill weight) and their category weight. Experience years and certifications provide additional bonuses."
                        },
                        {
                          step: "2",
                          title: "Experience Relevance Calculation",
                          formula: "ExpScore = (relevantMonths / totalMonths) * 60 + min(1, totalMonths/24) * 40",
                          detail: "We calculate what fraction of the candidate's work experience involved skills relevant to this project. Combined with total experience depth (normalized to 2 years), this produces the experience match score."
                        },
                        {
                          step: "3",
                          title: "Project History Fit Analysis",
                          formula: "FitScore = avg(matchingSkills / requiredSkills * 100) * 1.2",
                          detail: "Each of the candidate's previous projects is compared against the project's required skills. The average fit ratio across all projects determines the project fit score, with a slight boost for candidates who have project experience."
                        },
                        {
                          step: "4",
                          title: "Preference Alignment",
                          formula: "PrefScore = 50 + remoteMatch(20) + industryMatch(15) + roleMatch(15)",
                          detail: "Starting from a baseline of 50, points are added for matching remote preferences, industry alignment, and role title similarity between the candidate's preferences and the project."
                        },
                        {
                          step: "5",
                          title: "Fairness-Aware Adjustment",
                          formula: "Adjustment = statisticalParityCheck + skillDiversityBonus",
                          detail: "Statistical parity checks normalize extreme outliers (beyond 2 standard deviations) to prevent unfair advantages. A skill diversity bonus rewards cross-functional competency. The adjustment is bounded to [-10, +10]."
                        },
                        {
                          step: "6",
                          title: "Final Score Composition",
                          formula: "FinalScore = Skill(0.40) + Exp(0.20) + Fit(0.20) + Pref(0.10) + Fairness(0.10)",
                          detail: "The final score is a weighted sum of all dimensions, ensuring that skill competency carries the most weight while still accounting for experience, project fit, preferences, and fairness."
                        },
                      ].map((item) => (
                        <div key={item.step} className="rounded-xl border border-border/60 bg-secondary/20 p-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                              {item.step}
                            </div>
                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                          </div>
                          <div className="mt-3 rounded-lg bg-foreground/5 px-4 py-2.5">
                            <code className="text-xs text-primary font-mono">{item.formula}</code>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fairness Report */}
            <TabsContent value="fairness">
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Fairness-Aware Matching Report
                    </CardTitle>
                    <CardDescription>
                      How SkillSync ensures equitable, bias-free candidate evaluation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="rounded-xl border border-border/60 bg-secondary/20 p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                          <Scale className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground">Statistical Parity</h4>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          Scores are checked against the pool mean and standard deviation.
                          Extreme outliers (beyond 2 sigma) receive normalization adjustments
                          to prevent systematic bias.
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-secondary/20 p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground">Skill-Based Only</h4>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          All scoring is based exclusively on demonstrable competencies,
                          experience, and project history. No demographic, institutional,
                          or name-based factors influence the score.
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-secondary/20 p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                          <Info className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground">Full Explainability</h4>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          Every score component is traceable. Candidates and recruiters can
                          see exactly which skills, weights, and adjustments contributed to
                          the final ranking.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <h4 className="font-semibold text-foreground mb-2">This Match's Fairness Assessment</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {explanation.fairnessNote}
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">
                            {score.fairnessAdjustment > 0 ? "+" : ""}{score.fairnessAdjustment}
                          </p>
                          <p className="text-xs text-muted-foreground">Adjustment Applied</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-[oklch(0.65_0.17_145)]">5</p>
                          <p className="text-xs text-muted-foreground">Dimensions Evaluated</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-[oklch(0.65_0.17_145)]">100%</p>
                          <p className="text-xs text-muted-foreground">Explainable</p>
                        </div>
                      </div>
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
