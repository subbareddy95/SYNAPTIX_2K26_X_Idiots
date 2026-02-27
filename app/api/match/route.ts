import { NextResponse } from "next/server"
import { rankCandidatesForProject, findProjectsForCandidate } from "@/lib/matching-engine"
import { sampleCandidates, sampleProjects } from "@/lib/seed-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") // "candidates" or "projects"
  const id = searchParams.get("id")

  if (type === "candidates" && id) {
    // Rank candidates for a specific project
    const project = sampleProjects.find((p) => p.id === id)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    const results = rankCandidatesForProject(sampleCandidates, project)
    return NextResponse.json({ results, project })
  }

  if (type === "projects" && id) {
    // Find matching projects for a candidate
    const candidate = sampleCandidates.find((c) => c.id === id)
    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
    }
    const results = findProjectsForCandidate(candidate, sampleProjects)
    return NextResponse.json({ results, candidate })
  }

  return NextResponse.json({ error: "Invalid params. Use ?type=candidates&id=p1 or ?type=projects&id=c1" }, { status: 400 })
}
