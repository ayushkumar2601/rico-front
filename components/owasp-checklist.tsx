"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface OWASPChecklistProps {
  vulnerabilities: Array<{
    type: string
    severity: string
  }>
}

export function OWASPChecklist({ vulnerabilities }: OWASPChecklistProps) {
  const owaspTop10 = [
    { id: "A01", name: "Broken Access Control", keywords: ["access control", "authorization", "idor", "privilege"] },
    { id: "A02", name: "Cryptographic Failures", keywords: ["crypto", "encryption", "tls", "ssl", "hash"] },
    { id: "A03", name: "Injection", keywords: ["sql injection", "nosql", "command injection", "ldap"] },
    { id: "A04", name: "Insecure Design", keywords: ["design", "threat model", "security pattern"] },
    { id: "A05", name: "Security Misconfiguration", keywords: ["misconfiguration", "default", "config", "cors"] },
    { id: "A06", name: "Vulnerable Components", keywords: ["outdated", "vulnerable", "dependency", "component"] },
    { id: "A07", name: "Authentication Failures", keywords: ["authentication", "session", "credential", "brute force"] },
    { id: "A08", name: "Data Integrity Failures", keywords: ["integrity", "deserialization", "ci/cd", "update"] },
    { id: "A09", name: "Logging Failures", keywords: ["logging", "monitoring", "incident", "audit"] },
    { id: "A10", name: "SSRF", keywords: ["ssrf", "server-side request forgery", "url validation"] }
  ]

  const getStatus = (item: typeof owaspTop10[0]) => {
    const found = vulnerabilities.some(vuln => 
      item.keywords.some(keyword => 
        vuln.type.toLowerCase().includes(keyword.toLowerCase())
      )
    )
    
    if (found) {
      const severity = vulnerabilities.find(vuln =>
        item.keywords.some(keyword => 
          vuln.type.toLowerCase().includes(keyword.toLowerCase())
        )
      )?.severity
      
      return { 
        status: "vulnerable", 
        severity: severity || "Unknown",
        icon: XCircle,
        color: "text-red-500"
      }
    }
    
    return { 
      status: "secure", 
      severity: null,
      icon: CheckCircle2,
      color: "text-green-500"
    }
  }

  const vulnerableCount = owaspTop10.filter(item => getStatus(item).status === "vulnerable").length
  const coverage = Math.round((10 - vulnerableCount) / 10 * 100)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              OWASP Top 10 Coverage
            </CardTitle>
            <CardDescription>
              Security assessment against OWASP Top 10 2021
            </CardDescription>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{coverage}%</div>
            <div className="text-xs text-muted-foreground">Coverage</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {owaspTop10.map((item) => {
            const { status, severity, icon: Icon, color } = getStatus(item)
            
            return (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon className={`h-5 w-5 ${color}`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.id}: {item.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {status === "vulnerable" && severity && (
                    <Badge variant={
                      severity === "Critical" ? "destructive" :
                      severity === "High" ? "destructive" :
                      severity === "Medium" ? "default" : "secondary"
                    }>
                      {severity}
                    </Badge>
                  )}
                  <Badge variant={status === "vulnerable" ? "destructive" : "secondary"}>
                    {status === "vulnerable" ? "Vulnerable" : "Secure"}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
