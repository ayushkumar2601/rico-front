# RICO Scan Results Dashboard

## Overview
Modern, developer-grade security dashboard for displaying API scan results. Designed for hackathon judges, developers, and security teams.

## Features

### ✨ Visual Design
- Dark theme with brand colors (green/black)
- Animated charts and transitions
- Responsive grid layout
- Print-friendly PDF export
- Confetti animation for clean scans

### 📊 Charts (Canvas-based)
1. **Risk Gauge Chart** - Speedometer-style risk score visualization
2. **Severity Pie Chart** - Distribution of vulnerability severities
3. **Endpoints Bar Chart** - Tested vs vulnerable endpoints
4. **Vulnerability Types Chart** - Top 5 vulnerability categories

### 🎯 Dashboard Sections

#### 1. Header
- Target URL and Scan ID
- Security Grade (A-F based on score)
- Gradient background with brand colors

#### 2. Summary Cards
- Risk Score (with glow effect on high risk)
- Total Vulnerabilities
- Endpoints Tested
- Scan Duration
- Security Grade
- OWASP Coverage %

#### 3. Top Critical Issues
- Top 5 highest CVSS vulnerabilities
- Large, attention-grabbing cards
- Quick "View Fix" buttons

#### 4. Interactive Vulnerability Table
- Search functionality
- Filter by severity
- Expandable rows with:
  - Description
  - Proof of concept
  - Suggested fix with code examples
  - OWASP guide links

#### 5. Fix Suggestions Panel
- Grouped by vulnerability type
- Remediation guidance
- Secure code examples
- OWASP documentation links

#### 6. Raw Data Export
- Copy JSON to clipboard
- Download JSON
- Download CSV
- Print to PDF

## Usage

```tsx
import { ScanResultsDashboard } from "@/components/scan-results-dashboard"

<ScanResultsDashboard 
  result={scanResult} 
  scanId="scan-123" 
  targetUrl="https://api.example.com"
/>
```

## Data Structure

The dashboard expects a `ScanResult` object with:

```typescript
{
  risk_score: number
  risk_level: string
  total_vulnerabilities: number
  endpoints_tested: number
  total_endpoints: number
  duration: number
  severity_distribution: {
    Critical?: number
    High?: number
    Medium?: number
    Low?: number
    Info?: number
  }
  vulnerabilities: Array<{
    type: string
    severity: string
    endpoint: string
    method: string
    cvss_score: number
    confidence: number
    description: string
  }>
  top_issue?: string
}
```

## Security Grade Logic

- 90-100 → A (Green)
- 75-89 → B (Blue)
- 60-74 → C (Yellow)
- 40-59 → D (Orange)
- <40 → F (Red)

Score = 100 - risk_score

## Print Mode

The dashboard includes print-optimized CSS:
- White background
- Black text
- No animations
- Static charts
- All tables visible

Use `window.print()` or the PDF export button.

## Animations

- Cards fade in on load
- Charts animate on render
- Smooth row expansion
- Confetti on zero vulnerabilities

## Customization

### Colors
Severity colors are defined in the component:
- Critical/High: `#ef4444` (red)
- Medium: `#f97316` (orange)
- Low: `#eab308` (yellow)
- Info: `#3b82f6` (blue)

### Charts
All charts are canvas-based for performance and can be customized in:
- `components/charts/risk-gauge-chart.tsx`
- `components/charts/severity-pie-chart.tsx`
- `components/charts/endpoints-bar-chart.tsx`
- `components/charts/vulnerability-types-chart.tsx`

## Dependencies

- Tailwind CSS (styling)
- Lucide React (icons)
- Radix UI (components)
- Canvas API (charts)

No external chart libraries required!
