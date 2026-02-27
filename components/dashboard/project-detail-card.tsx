"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/matching-engine"
import { Building2, MapPin, Clock, Users, Calendar, DollarSign } from "lucide-react"

interface ProjectDetailCardProps {
  project: Project
}

export function ProjectDetailCard({ project }: ProjectDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {project.company}
            </CardDescription>
          </div>
          <Badge className="capitalize">{project.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {project.duration}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Team of {project.teamSize}
          </div>
          {project.location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {project.location}
            </div>
          )}
          {project.remote && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Remote Available
            </div>
          )}
          {project.deadline && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </div>
          )}
          {project.stipend && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              {project.stipend}
            </div>
          )}
        </div>

        <div className="mt-5">
          <h4 className="mb-2 text-sm font-semibold text-foreground">Requirements</h4>
          <div className="flex flex-col gap-2">
            {project.requirements.map((req) => (
              <div
                key={req.skillName}
                className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/30 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{req.skillName}</span>
                  {req.isRequired && (
                    <Badge variant="destructive" className="text-[10px]">Required</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Min: {req.minimumLevel}</span>
                  <span>Weight: {(req.weight * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
