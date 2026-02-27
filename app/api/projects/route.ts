import { NextResponse } from "next/server"
import { sampleProjects } from "@/lib/seed-data"

export async function GET() {
  return NextResponse.json({ projects: sampleProjects })
}
