"use client"

import { cn } from "@/lib/utils"

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  className?: string
  label?: string
}

export function ScoreRing({
  score,
  size = 80,
  strokeWidth = 6,
  className,
  label,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference

  const getColor = (s: number) => {
    if (s >= 85) return "text-[oklch(0.65_0.17_145)]"
    if (s >= 70) return "text-primary"
    if (s >= 55) return "text-[oklch(0.75_0.16_65)]"
    return "text-destructive"
  }

  const getTrackColor = (s: number) => {
    if (s >= 85) return "text-[oklch(0.65_0.17_145)]/15"
    if (s >= 70) return "text-primary/15"
    if (s >= 55) return "text-[oklch(0.75_0.16_65)]/15"
    return "text-destructive/15"
  }

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={cn("stroke-current", getTrackColor(score))}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("stroke-current transition-all duration-700", getColor(score))}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-lg font-bold", getColor(score))}>{score}</span>
      </div>
      {label && (
        <span className="mt-1.5 text-xs text-muted-foreground">{label}</span>
      )}
    </div>
  )
}
