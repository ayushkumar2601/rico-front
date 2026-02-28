"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface TerminalLine {
  text: string
  type: "info" | "success" | "warning" | "dim" | "primary"
  delay: number
}

const terminalSequence: TerminalLine[] = [
  { text: "$ rico scan https://api.target.com", type: "dim", delay: 100 },
  { text: "", type: "info", delay: 400 },
  { text: "⚡ RICO v1.0 // INITIALIZING", type: "primary", delay: 600 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", type: "dim", delay: 200 },
  { text: "", type: "info", delay: 300 },
  { text: "[01] ENDPOINT DISCOVERY", type: "info", delay: 500 },
  { text: "    → Mapping API surface...", type: "dim", delay: 400 },
  { text: "    ✓ 47 endpoints discovered", type: "success", delay: 600 },
  { text: "", type: "info", delay: 300 },
  { text: "[02] COGNITIVE ANALYSIS", type: "info", delay: 500 },
  { text: "    → Classifying endpoints...", type: "dim", delay: 400 },
  { text: "    → Analyzing data flows...", type: "dim", delay: 400 },
  { text: "    ✓ Classification complete", type: "success", delay: 600 },
  { text: "", type: "info", delay: 300 },
  { text: "[03] VULNERABILITY SCAN", type: "info", delay: 500 },
  { text: "    → Testing authentication...", type: "dim", delay: 400 },
  { text: "    → Checking IDOR vectors...", type: "dim", delay: 400 },
  { text: "    ⚠ 3 critical findings", type: "warning", delay: 700 },
  { text: "", type: "info", delay: 300 },
  { text: "[04] REPORT GENERATION", type: "info", delay: 500 },
  { text: "    ✓ Security report ready", type: "success", delay: 600 },
  { text: "", type: "info", delay: 400 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", type: "dim", delay: 200 },
  { text: "SCAN COMPLETE // 3 VULNERABILITIES DETECTED", type: "primary", delay: 1000 },
]

export function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [scanComplete, setScanComplete] = useState(false)

  useEffect(() => {
    if (currentIndex >= terminalSequence.length) {
      // Mark scan as complete
      setScanComplete(true)
      
      // Loop the animation
      const resetTimer = setTimeout(() => {
        setVisibleLines([])
        setCurrentIndex(0)
        setScanComplete(false)
      }, 3000)
      return () => clearTimeout(resetTimer)
    }

    const currentLine = terminalSequence[currentIndex]
    const timer = setTimeout(() => {
      setVisibleLines((prev) => [...prev, currentLine])
      setCurrentIndex((prev) => prev + 1)
    }, currentLine.delay)

    return () => clearTimeout(timer)
  }, [currentIndex])

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorTimer)
  }, [])

  const getLineColor = (type: string) => {
    switch (type) {
      case "primary":
        return "text-[#c8ff16]"
      case "success":
        return "text-[#c8ff16]"
      case "warning":
        return "text-[#F59E0B]"
      case "dim":
        return "text-[#6B7280]"
      default:
        return "text-[#E5E7EB]"
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#1E1E1E] shadow-2xl">
      {/* Terminal title bar - macOS style */}
      <div className="flex items-center justify-between border-b border-[#2D2D2D] bg-[#2A2A2A] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57] transition-opacity hover:opacity-80"></div>
          <div className="h-3 w-3 rounded-full bg-[#FEBC2E] transition-opacity hover:opacity-80"></div>
          <div className="h-3 w-3 rounded-full bg-[#28C840] transition-opacity hover:opacity-80"></div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-[#8B8B8B]">
          rico-terminal
        </div>
        <div className="w-16"></div>
      </div>

      {/* Terminal content */}
      <div className="relative p-6 font-mono text-[13px] leading-relaxed">
        {/* Nyan Cat - show only while scanning */}
        {!scanComplete && currentIndex > 0 && (
          <div className="mb-4 flex justify-center">
            <Image 
              src="/nyan-cat.gif" 
              alt="Scanning..." 
              width={200} 
              height={100}
              unoptimized
              className="opacity-90"
            />
          </div>
        )}
        
        <div className="space-y-1">
          {visibleLines.map((line, index) => (
            <div key={index} className={getLineColor(line.type)}>
              {line.text || "\u00A0"}
            </div>
          ))}
          {currentIndex < terminalSequence.length && showCursor && (
            <span className="inline-block h-4 w-2 animate-pulse bg-[#c8ff16]" />
          )}
        </div>
      </div>
    </div>
  )
}
