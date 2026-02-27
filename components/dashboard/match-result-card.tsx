"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScoreRing } from "@/components/score-ring"
import type { MatchResult } from "@/lib/matching-engine"
import { Building2, MapPin, Clock, Users, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { useState } from "react"

interface MatchResultCardProps {
  result: MatchResult
  mode: "candidate" | "recruiter"
}

export function MatchResultCard({ result, mode }: MatchResultCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { score, explanation, project, candidate } = result

  const getScoreColor = (s: number) => {
    if (s >= 85) return "text-[oklch(0.65_0.17_145)]"
    if (s >= 70) return "text-primary"
    if (s >= 55) return "text-[oklch(0.75_0.16_65)]"
    return "text-destructive"
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        {/* Main Row */}
        <div className="flex items-center gap-4 p-5">
          <div className="shrink-0">
            <ScoreRing score={score.overallScore} size={64} strokeWidth={5} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground">
                  {mode === "candidate" ? project.title : candidate.name}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {mode === "candidate" ? (
                    <>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {project.company}
                      </span>
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Team of {project.teamSize}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{candidate.education.institution}</span>
                      <span>{candidate.education.degree} in {candidate.education.field}</span>
                    </>
                  )}
                </div>
              </div>
              <Badge
                variant="outline"
                className="shrink-0 text-xs"
              >
                #{result.rank}
              </Badge>
            </div>

            {/* Score pills */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-[10px]">
                Skill: {score.skillMatch}%
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                Exp: {score.experienceMatch}%
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                Fit: {score.projectFit}%
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                Pref: {score.preferenceMatch}%
              </Badge>
              {score.fairnessAdjustment !== 0 && (
                <Badge variant="outline" className="text-[10px]">
                  Fair: {score.fairnessAdjustment > 0 ? "+" : ""}{score.fairnessAdjustment}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Recommendation strip */}
        <div className={`flex items-center gap-2 border-t border-border/60 px-5 py-2.5 text-xs ${getScoreColor(score.overallScore)} bg-secondary/30`}>
          <Info className="h-3.5 w-3.5" />
          {explanation.recommendation}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-1 border-t border-border/60 py-2 text-xs text-muted-foreground hover:bg-secondary/30 transition-colors"
        >
          {expanded ? (
            <>Hide Details <ChevronUp className="h-3 w-3" /></>
          ) : (
            <>View Score Breakdown <ChevronDown className="h-3 w-3" /></>
          )}
        </button>

        {/* Expanded detail */}
        {expanded && (
          <div className="border-t border-border/60 bg-secondary/20 p-5">
            {/* Score Breakdown */}
            <h4 className="mb-3 text-sm font-semibold text-foreground">Score Breakdown</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Skill Match", value: score.skillMatch, weight: "40%" },
                { label: "Experience Match", value: score.experienceMatch, weight: "20%" },
                { label: "Project Fit", value: score.projectFit, weight: "20%" },
                { label: "Preference Match", value: score.preferenceMatch, weight: "10%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label} ({item.weight})</span>
                    <span className="font-medium text-foreground">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5" />
                </div>
              ))}
            </div>

            {/* Skill Details */}
            <h4 className="mb-3 mt-6 text-sm font-semibold text-foreground">Skill-by-Skill Analysis</h4>
            <div className="flex flex-col gap-2">
              {explanation.skillDetails.map((detail) => (
                <div
                  key={detail.skillName}
                  className="flex items-center justify-between rounded-lg border border-border/40 bg-card p-3"
                >
                  <div className="flex items-center gap-2">
                    {detail.status === "exceeds" || detail.status === "meets" ? (
                      <CheckCircle2 className="h-4 w-4 text-[oklch(0.65_0.17_145)]" />
                    ) : detail.status === "partial" ? (
                      <AlertCircle className="h-4 w-4 text-[oklch(0.75_0.16_65)]" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm font-medium text-foreground">{detail.skillName}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">{detail.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{detail.candidateLevel}/{detail.requiredLevel}</span>
                    <span className="font-medium text-foreground">{detail.score}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Gaps */}
            {explanation.strengths.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-2 text-sm font-semibold text-[oklch(0.65_0.17_145)]">Strengths</h4>
                <ul className="flex flex-col gap-1.5">
                  {explanation.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-[oklch(0.65_0.17_145)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {explanation.gaps.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-semibold text-[oklch(0.75_0.16_65)]">Areas for Improvement</h4>
                <ul className="flex flex-col gap-1.5">
                  {explanation.gaps.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-[oklch(0.75_0.16_65)]" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fairness Note */}
            <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-primary">Fairness Note:</span>{" "}
                {explanation.fairnessNote}
              </p>
            </div>

            {mode === "candidate" && project.stipend && (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Stipend</span>
                <span className="text-sm font-semibold text-foreground">{project.stipend}</span>
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <Button size="sm" className="flex-1">
                {mode === "candidate" ? "Apply Now" : "View Full Profile"}
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                {mode === "candidate" ? "Save for Later" : "Send Message"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
