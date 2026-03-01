"use client"

import { useEffect, useRef } from "react"

interface EndpointsBarChartProps {
  tested: number
  total: number
  vulnerable: number
}

export function EndpointsBarChart({ tested, total, vulnerable }: EndpointsBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const padding = 40
    const barHeight = 24 // Reduced from 40 to 24
    const spacing = 70 // Increased spacing between bars

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const maxValue = Math.max(total, tested, vulnerable)
    const scale = (canvas.width - padding * 2 - 60) / maxValue // Reserve space for value labels

    const bars = [
      { label: "Total Endpoints", value: total, color: "#3b82f6" }, // Blue
      { label: "Tested", value: tested, color: "#c8ff16" }, // Brand green/lime
      { label: "Vulnerable", value: vulnerable, color: "#ef4444" } // Red
    ]

    bars.forEach((bar, index) => {
      const y = padding + index * spacing
      const width = Math.max(bar.value * scale, 2) // Minimum width of 2px

      // Draw label above bar
      ctx.fillStyle = "#a1a1aa"
      ctx.font = "13px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "bottom"
      ctx.fillText(bar.label, padding, y - 8)

      // Draw bar with rounded corners
      ctx.fillStyle = bar.color
      ctx.beginPath()
      ctx.roundRect(padding, y, width, barHeight, 4)
      ctx.fill()

      // Draw value at the end of bar
      ctx.fillStyle = "#fafafa"
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(bar.value.toString(), padding + width + 10, y + barHeight / 2)
    })

  }, [tested, total, vulnerable])

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} width={600} height={260} />
    </div>
  )
}
