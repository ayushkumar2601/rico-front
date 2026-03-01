"use client"

import { useEffect, useRef } from "react"

interface SeverityPieChartProps {
  distribution: {
    Critical?: number
    High?: number
    Medium?: number
    Low?: number
    Info?: number
  }
}

export function SeverityPieChart({ distribution }: SeverityPieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 30

    const colors: Record<string, string> = {
      Critical: "#dc2626",
      High: "#ef4444",
      Medium: "#f97316",
      Low: "#eab308",
      Info: "#3b82f6"
    }

    const data = Object.entries(distribution).filter(([_, value]) => value > 0)
    const total = data.reduce((sum, [_, value]) => sum + value, 0)

    if (total === 0) {
      ctx.fillStyle = "#27272a"
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.fillStyle = "#fafafa"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("No Issues", centerX, centerY)
      return
    }

    let currentAngle = -Math.PI / 2

    data.forEach(([severity, value]) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = colors[severity] || "#3b82f6"
      ctx.fill()

      currentAngle += sliceAngle
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = "#09090b"
    ctx.fill()

    // Draw total
    ctx.fillStyle = "#fafafa"
    ctx.font = "bold 24px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(total.toString(), centerX, centerY - 5)
    
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#a1a1aa"
    ctx.fillText("Total", centerX, centerY + 15)

  }, [distribution])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <canvas ref={canvasRef} width={200} height={200} />
      </div>
      <div className="space-y-1 text-xs">
        {Object.entries(distribution).filter(([_, value]) => value > 0).map(([severity, value]) => (
          <div key={severity} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${
                severity === "Critical" ? "bg-red-600" :
                severity === "High" ? "bg-red-500" :
                severity === "Medium" ? "bg-orange-500" :
                severity === "Low" ? "bg-yellow-500" :
                "bg-blue-500"
              }`} />
              <span>{severity}</span>
            </div>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
