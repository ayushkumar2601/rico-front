"use client"

import { useEffect, useRef } from "react"

interface RiskGaugeChartProps {
  score: number
}

export function RiskGaugeChart({ score }: RiskGaugeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI)
    ctx.strokeStyle = "#27272a"
    ctx.lineWidth = 20
    ctx.stroke()

    // Draw score arc
    const scoreAngle = Math.PI + (score / 100) * Math.PI
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, scoreAngle)
    
    // Color based on score
    if (score < 40) {
      ctx.strokeStyle = "#22c55e" // green
    } else if (score < 70) {
      ctx.strokeStyle = "#f97316" // orange
    } else {
      ctx.strokeStyle = "#ef4444" // red
    }
    
    ctx.lineWidth = 20
    ctx.lineCap = "round"
    ctx.stroke()

    // Draw score text
    ctx.fillStyle = "#fafafa"
    ctx.font = "bold 48px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(score.toString(), centerX, centerY - 10)

    ctx.font = "16px sans-serif"
    ctx.fillStyle = "#a1a1aa"
    ctx.fillText("Risk Score", centerX, centerY + 30)

  }, [score])

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} width={300} height={200} />
    </div>
  )
}
