"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  className?: string
  label?: string
  animate?: boolean
}

export function ScoreRing({
  score,
  size = 80,
  strokeWidth = 6,
  className,
  label,
  animate = true,
}: ScoreRingProps) {
  const [rendered, setRendered] = useState(!animate)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - ((rendered ? score : 0) / 100) * circumference

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setRendered(true), 100)
      return () => clearTimeout(timer)
    }
  }, [animate, score])

  const getColor = (s: number) => {
    if (s >= 85) return "text-[oklch(0.60_0.18_145)]"
    if (s >= 70) return "text-primary"
    if (s >= 55) return "text-[oklch(0.72_0.17_65)]"
    return "text-destructive"
  }

  const getTrackColor = (s: number) => {
    if (s >= 85) return "text-[oklch(0.60_0.18_145)]/12"
    if (s >= 70) return "text-primary/12"
    if (s >= 55) return "text-[oklch(0.72_0.17_65)]/12"
    return "text-destructive/12"
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
          className={cn(
            "stroke-current",
            getColor(score)
          )}
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("font-[family-name:var(--font-heading)] text-lg font-bold tabular-nums", getColor(score))}>
          {score}
        </span>
      </div>
      {label && (
        <span className="mt-1.5 text-[11px] font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  )
}
