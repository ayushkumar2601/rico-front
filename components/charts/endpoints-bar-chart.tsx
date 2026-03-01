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
    const barHeight = 40
    const spacing = 60

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const maxValue = Math.max(total, tested, vulnerable)
    const scale = (canvas.width - padding * 2) / maxValue

    const bars = [
      { label: "Total Endpoints", value: total, color: "#3b82f6" },
      { label: "Tested", value: tested, color: "#22c55e" },
      { label: "Vulnerable", value: vulnerable, color: "#ef4444" }
    ]

    bars.forEach((bar, index) => {
      const y = padding + index * spacing
      const width = bar.value * scale

      // Draw bar
      ctx.fillStyle = bar.color
      ctx.fillRect(padding, y, width, barHeight)

      // Draw label
      ctx.fillStyle = "#fafafa"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(bar.label, padding, y - 15)

      // Draw value
      ctx.font = "bold 16px sans-serif"
      ctx.fillText(bar.value.toString(), padding + width + 10, y + barHeight / 2)
    })

  }, [tested, total, vulnerable])

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} width={600} height={240} />
    </div>
  )
}
