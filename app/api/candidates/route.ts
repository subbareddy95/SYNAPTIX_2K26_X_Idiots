import { NextResponse } from "next/server"
import { sampleCandidates } from "@/lib/seed-data"

export async function GET() {
  return NextResponse.json({ candidates: sampleCandidates })
}
