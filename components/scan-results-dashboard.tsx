"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Download,
  Copy,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ExternalLink,
  Clock,
  Target,
  TrendingUp,
  FileText,
  Code,
  Zap
} from "lucide-react"
import { type ScanResult } from "@/lib/api"
import { RiskGaugeChart } from "./charts/risk-gauge-chart"
import { SeverityPieChart } from "./charts/severity-pie-chart"
import { EndpointsBarChart } from "./charts/endpoints-bar-chart"
import { VulnerabilityTypesChart } from "./charts/vulnerability-types-chart"
import { OWASPChecklist } from "./owasp-checklist"

interface ScanResultsDashboardProps {
  result: ScanResult
  scanId: string
  targetUrl?: string
}

export function ScanResultsDashboard({ result, scanId, targetUrl }: ScanResultsDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [showConfetti, setShowConfetti] = useState(false)

  // Calculate security grade
  const getSecurityGrade = (score: number): { grade: string; color: string } => {
    if (score >= 90) return { grade: "A", color: "text-green-500" }
    if (score >= 75) return { grade: "B", color: "text-blue-500" }
    if (score >= 60) return { grade: "C", color: "text-yellow-500" }
    if (score >= 40) return { grade: "D", color: "text-orange-500" }
    return { grade: "F", color: "text-red-500" }
  }

  const securityScore = Math.max(0, 100 - result.risk_score)
  const { grade, color } = getSecurityGrade(securityScore)

  // Calculate OWASP coverage
  const owaspKeywords = [
    ["access control", "authorization", "idor", "privilege"],
    ["crypto", "encryption", "tls", "ssl", "hash"],
    ["sql injection", "nosql", "command injection", "ldap"],
    ["design", "threat model", "security pattern"],
    ["misconfiguration", "default", "config", "cors"],
    ["outdated", "vulnerable", "dependency", "component"],
    ["authentication", "session", "credential", "brute force"],
    ["integrity", "deserialization", "ci/cd", "update"],
    ["logging", "monitoring", "incident", "audit"],
    ["ssrf", "server-side request forgery", "url validation"]
  ]
  
  const owaspCovered = owaspKeywords.filter(keywords =>
    !result.vulnerabilities.some(vuln =>
      keywords.some(keyword => vuln.type.toLowerCase().includes(keyword.toLowerCase()))
    )
  ).length
  
  const owaspCoverage = Math.round((owaspCovered / 10) * 100)

  // Show confetti on good results
  useEffect(() => {
    if (result.total_vulnerabilities === 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [result.total_vulnerabilities])

  // Filter vulnerabilities
  const filteredVulnerabilities = result.vulnerabilities.filter(vuln => {
    const matchesSearch = vuln.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vuln.endpoint.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = severityFilter === "all" || vuln.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  // Get top 5 critical issues
  const topCriticalIssues = [...result.vulnerabilities]
    .sort((a, b) => b.cvss_score - a.cvss_score)
    .slice(0, 5)

  // Toggle row expansion
  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  // Copy JSON
  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
  }

  // Download JSON
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rico-scan-${scanId}.json`
    a.click()
  }

  // Download CSV
  const downloadCSV = () => {
    const headers = ["Severity", "Type", "Endpoint", "Method", "CVSS", "Confidence", "Description"]
    const rows = result.vulnerabilities.map(v => [
      v.severity,
      v.type,
      v.endpoint,
      v.method,
      v.cvss_score,
      v.confidence,
      v.description
    ])
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rico-scan-${scanId}.csv`
    a.click()
  }

  // Get severity badge variant
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive"
      case "High": return "destructive"
      case "Medium": return "default"
      case "Low": return "secondary"
      default: return "outline"
    }
  }

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500/10 border-red-500/50"
      case "High": return "bg-red-500/10 border-red-500/50"
      case "Medium": return "bg-orange-500/10 border-orange-500/50"
      case "Low": return "bg-yellow-500/10 border-yellow-500/50"
      default: return "bg-blue-500/10 border-blue-500/50"
    }
  }

  // Group vulnerabilities by type
  const vulnByType = result.vulnerabilities.reduce((acc, vuln) => {
    if (!acc[vuln.type]) acc[vuln.type] = []
    acc[vuln.type].push(vuln)
    return acc
  }, {} as Record<string, typeof result.vulnerabilities>)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                RICO Security Scan Report
              </CardTitle>
              <CardDescription className="text-base space-y-1">
                {targetUrl && (
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span className="font-mono">{targetUrl}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-mono text-xs">Scan ID: {scanId}</span>
                </div>
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Security Grade</div>
              <div className={`text-6xl font-black ${color}`}>{grade}</div>
              <div className="text-xs text-muted-foreground mt-1">Score: {securityScore}/100</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskGaugeChart score={result.risk_score} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SeverityPieChart distribution={result.severity_distribution} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Vulnerability Types</CardTitle>
          </CardHeader>
          <CardContent>
            <VulnerabilityTypesChart vulnerabilities={result.vulnerabilities} />
          </CardContent>
        </Card>
      </div>

      {/* Endpoints Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Endpoints Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <EndpointsBarChart 
            tested={result.endpoints_tested} 
            total={result.total_endpoints}
            vulnerable={result.vulnerabilities.length}
          />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className={`${result.risk_score > 70 ? 'border-red-500/50 shadow-red-500/20 shadow-lg' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{result.risk_score}</div>
            <Badge variant={result.risk_score > 70 ? "destructive" : "secondary"} className="mt-2">
              {result.risk_level}
            </Badge>
          </CardContent>
        </Card>

        <Card className={`${result.total_vulnerabilities > 0 ? 'border-orange-500/50 shadow-orange-500/20 shadow-lg' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{result.total_vulnerabilities}</div>
            <p className="text-xs text-muted-foreground mt-2">issues found</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Endpoints Tested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{result.endpoints_tested}</div>
            <p className="text-xs text-muted-foreground mt-2">of {result.total_endpoints} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Scan Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{result.duration.toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground mt-2">execution time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Security Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${color}`}>{grade}</div>
            <p className="text-xs text-muted-foreground mt-2">{securityScore}/100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">OWASP Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{owaspCoverage}%</div>
            <p className="text-xs text-muted-foreground mt-2">Top 10 checks</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Critical Issues */}
      {topCriticalIssues.length > 0 && (
        <Card className="border-red-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              Top Critical Issues
            </CardTitle>
            <CardDescription>Highest CVSS score vulnerabilities requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCriticalIssues.map((vuln, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-lg border ${getSeverityColor(vuln.severity)} transition-all hover:shadow-lg`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getSeverityVariant(vuln.severity)}>{vuln.severity}</Badge>
                      <span className="font-mono text-sm font-bold">{vuln.type}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {vuln.method} {vuln.endpoint}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{vuln.cvss_score}</div>
                    <div className="text-xs text-muted-foreground">CVSS</div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="mt-2 bg-primary text-black hover:bg-primary/90 font-medium"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  View Fix
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Interactive Vulnerability Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Details</CardTitle>
          <CardDescription>Interactive table with search, filter, and detailed information</CardDescription>
          
          {/* Search and Filter */}
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vulnerabilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredVulnerabilities.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">No vulnerabilities found!</p>
              <p className="text-sm text-muted-foreground">Your API appears secure.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredVulnerabilities.map((vuln, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleRow(idx)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Badge variant={getSeverityVariant(vuln.severity)} className="w-20 justify-center">
                          {vuln.severity}
                        </Badge>
                        <div className="flex-1">
                          <div className="font-medium">{vuln.type}</div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {vuln.method} {vuln.endpoint}
                          </div>
                        </div>
                        <div className="text-sm font-mono">CVSS: {vuln.cvss_score}</div>
                        <div className="text-sm text-muted-foreground">{vuln.confidence}%</div>
                      </div>
                      {expandedRows.has(idx) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  
                  {expandedRows.has(idx) && (
                    <div className="border-t bg-muted/30 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{vuln.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Proof of Concept</h4>
                        <div className="bg-background rounded-md p-3 font-mono text-xs">
                          <div className="text-muted-foreground">// Example exploit</div>
                          <div>curl -X {vuln.method} "{vuln.endpoint}"</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Suggested Fix</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Implement proper input validation and use parameterized queries.
                        </p>
                        <div className="bg-background rounded-md p-3 font-mono text-xs">
                          <div className="text-green-500">// Secure implementation</div>
                          <div>const query = db.prepare("SELECT * FROM users WHERE id = ?");</div>
                          <div>query.run(userId);</div>
                        </div>
                      </div>
                      
                      <div>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`https://owasp.org/www-community/vulnerabilities/${vuln.type.replace(/\s+/g, '_')}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            OWASP Guide
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* OWASP Top 10 Checklist */}
      <OWASPChecklist vulnerabilities={result.vulnerabilities} />

      {/* Fix Suggestions Panel */}
      {Object.keys(vulnByType).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Fix Suggestions by Type
            </CardTitle>
            <CardDescription>Grouped remediation guidance for common vulnerability patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(vulnByType).map(([type, vulns]) => (
              <div key={type} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{type}</h3>
                  <Badge variant="secondary">{vulns.length} instances</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <strong>Fix:</strong> Use parameterized queries and input validation
                  </p>
                  <div className="bg-muted rounded-md p-3 font-mono text-xs">
                    <div className="text-green-500">// Example secure code</div>
                    <div>const stmt = db.prepare("SELECT * FROM users WHERE id = ?");</div>
                    <div>stmt.get(userId);</div>
                  </div>
                  <Button size="sm" variant="link" className="p-0 h-auto" asChild>
                    <a href={`https://owasp.org/www-community/vulnerabilities/${type.replace(/\s+/g, '_')}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Read OWASP {type} Guide
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Raw Data Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Raw Data</CardTitle>
              <CardDescription>Export scan results in various formats</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={copyJSON}>
                <Copy className="h-4 w-4 mr-1" />
                Copy JSON
              </Button>
              <Button size="sm" variant="outline" onClick={downloadJSON}>
                <Download className="h-4 w-4 mr-1" />
                JSON
              </Button>
              <Button size="sm" variant="outline" onClick={downloadCSV}>
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.print()}>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium mb-2 hover:text-primary">
              View JSON Data
            </summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-muted p-4 text-xs max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </CardContent>
      </Card>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
