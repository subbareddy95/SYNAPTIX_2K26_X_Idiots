"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Candidate } from "@/lib/matching-engine"
import { GraduationCap, Briefcase, FolderOpen } from "lucide-react"

interface CandidateProfileProps {
  candidate: Candidate
}

export function CandidateProfile({ candidate }: CandidateProfileProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                {candidate.avatar || candidate.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-foreground">{candidate.name}</h2>
              <p className="text-sm text-muted-foreground">{candidate.email}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {candidate.preferences.desiredRoles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Skills & Competencies</CardTitle>
          <CardDescription>Proficiency levels across all competencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {candidate.skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {skill.category}
                    </Badge>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{skill.level}/100</span>
                </div>
                <Progress value={skill.level} className="h-2" />
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{skill.yearsOfExperience} yrs exp</span>
                  {skill.certifications && skill.certifications.length > 0 && (
                    <span className="text-primary">{skill.certifications.join(", ")}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="h-4 w-4 text-primary" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium text-foreground">
            {candidate.education.degree} in {candidate.education.field}
          </p>
          <p className="text-sm text-muted-foreground">{candidate.education.institution}</p>
          <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
            {candidate.education.gpa && <span>GPA: {candidate.education.gpa}</span>}
            <span>Class of {candidate.education.graduationYear}</span>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Briefcase className="h-4 w-4 text-primary" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {candidate.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-primary/20 pl-4">
                <p className="font-medium text-foreground">{exp.title}</p>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.durationMonths} months</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {exp.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FolderOpen className="h-4 w-4 text-primary" />
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {candidate.projects.map((proj, i) => (
              <div key={i} className="rounded-lg border border-border/60 p-4">
                <p className="font-medium text-foreground">{proj.name}</p>
                <p className="text-sm text-muted-foreground">{proj.description}</p>
                <p className="mt-1 text-xs text-primary">{proj.role}</p>
                {proj.outcome && (
                  <p className="mt-1 text-xs text-muted-foreground">Outcome: {proj.outcome}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {proj.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
