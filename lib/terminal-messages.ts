/**
 * Terminal message sequences for each Rico action.
 *
 * These simulate Rico's AI-powered workflow steps as they would appear
 * in a real terminal. Each message has a `delay` (ms) controlling how
 * long to wait before the *next* line appears, simulating processing.
 *
 * BACKEND INTEGRATION:
 * In production, replace these static sequences with a streaming API
 * response (e.g., Server-Sent Events or WebSocket) from the Rico
 * backend. Each SSE event would map to a terminal line, providing
 * real-time progress from the actual scanning engine.
 */

export type TerminalLine = {
  text: string
  /** Delay in ms before the next line appears */
  delay: number
  /** Optional type for coloring: info (default), success, warning, error, dim */
  type?: "info" | "success" | "warning" | "error" | "dim"
}

export function getTerminalMessages(
  action: "scan" | "attack" | "report" | "call",
  url: string
): TerminalLine[] {
  const base = url.replace(/\/+$/, "")

  switch (action) {
    case "scan":
      return [
        { text: `$ rico scan ${base}`, delay: 400, type: "dim" },
        { text: "", delay: 200 },
        { text: "Rico v1.2.0 - AI-Driven API Security Scanner", delay: 300, type: "dim" },
        { text: `Target: ${base}`, delay: 250, type: "dim" },
        { text: "", delay: 150 },
        { text: "[*] Initializing scan engine...", delay: 350 },
        { text: "[*] Loading AI classification model...", delay: 400 },
        { text: "[+] Model loaded: rico-classifier-v3", delay: 300, type: "success" },
        { text: "", delay: 150 },
        { text: "[*] Phase 1: Endpoint Discovery", delay: 300 },
        { text: "    Crawling sitemap and common API paths...", delay: 450, type: "dim" },
        { text: "    Testing /api/v1/* namespace...", delay: 350, type: "dim" },
        { text: "[+] Found: GET  /api/v1/users", delay: 150, type: "success" },
        { text: "[+] Found: GET  /api/v1/users/{id}", delay: 120, type: "success" },
        { text: "[+] Found: POST /api/v1/users", delay: 120, type: "success" },
        { text: "[+] Found: POST /api/v1/login", delay: 100, type: "success" },
        { text: "[+] Found: GET  /api/v1/products", delay: 130, type: "success" },
        { text: "[+] Found: GET  /api/v1/orders", delay: 110, type: "success" },
        { text: "[+] Found: PUT  /api/v1/orders/{id}", delay: 120, type: "success" },
        { text: "[+] Found: GET  /api/v1/admin/config", delay: 140, type: "success" },
        { text: "", delay: 150 },
        { text: "[*] Phase 2: AI Classification", delay: 300 },
        { text: "    Classifying endpoint purposes with NLP...", delay: 400, type: "dim" },
        { text: "    Detecting authentication requirements...", delay: 350, type: "dim" },
        { text: "    Extracting parameter schemas...", delay: 300, type: "dim" },
        { text: "[+] Classification complete for 8 endpoints", delay: 250, type: "success" },
        { text: "", delay: 150 },
        { text: "[+] Scan complete. 8 endpoints discovered.", delay: 300, type: "success" },
      ]

    case "attack":
      return [
        { text: `$ rico attack ${base}`, delay: 400, type: "dim" },
        { text: "", delay: 200 },
        { text: "Rico v1.2.0 - AI-Driven API Security Scanner", delay: 300, type: "dim" },
        { text: `Target: ${base}`, delay: 250, type: "dim" },
        { text: "", delay: 150 },
        { text: "[*] Initializing attack engine...", delay: 350 },
        { text: "[*] Loading exploit intelligence model...", delay: 400 },
        { text: "[+] Model loaded: rico-exploit-planner-v2", delay: 300, type: "success" },
        { text: "", delay: 150 },
        { text: "[*] Phase 1: AI Attack Planning", delay: 300 },
        { text: "    Analyzing endpoint signatures...", delay: 400, type: "dim" },
        { text: "    Generating targeted attack vectors...", delay: 450, type: "dim" },
        { text: "[+] Generated 14 attack plans across 8 endpoints", delay: 250, type: "success" },
        { text: "", delay: 150 },
        { text: "[*] Phase 2: Executing Attacks", delay: 300 },
        { text: "    Running BOLA/IDOR tests on /users/{id}...", delay: 500, type: "dim" },
        { text: "[!] VULN: BOLA/IDOR detected on /api/v1/users/{id} (High)", delay: 200, type: "warning" },
        { text: "    Running brute-force detection on /login...", delay: 450, type: "dim" },
        { text: "[!] VULN: No rate limiting on /api/v1/login (Medium)", delay: 200, type: "warning" },
        { text: "    Running authorization tests on /admin/config...", delay: 400, type: "dim" },
        { text: "[!!] VULN: Broken Function-Level Auth on /api/v1/admin/config (Critical)", delay: 200, type: "error" },
        { text: "    Running mass assignment tests on /orders/{id}...", delay: 400, type: "dim" },
        { text: "[!] VULN: Mass Assignment on /api/v1/orders/{id} (Medium)", delay: 200, type: "warning" },
        { text: "    Running SQL injection tests on /users...", delay: 500, type: "dim" },
        { text: "[!] VULN: SQL Injection on /api/v1/users?sort= (High)", delay: 200, type: "warning" },
        { text: "", delay: 150 },
        { text: "[*] Phase 3: AI Severity Classification", delay: 300 },
        { text: "    Scoring findings with CVSS model...", delay: 350, type: "dim" },
        { text: "[+] Classification complete", delay: 200, type: "success" },
        { text: "", delay: 150 },
        { text: "[+] Attack complete. 5 vulnerabilities found (1 Critical, 2 High, 2 Medium).", delay: 300, type: "success" },
      ]

    case "report":
      return [
        { text: `$ rico report ${base}`, delay: 400, type: "dim" },
        { text: "", delay: 200 },
        { text: "Rico v1.2.0 - AI-Driven API Security Scanner", delay: 300, type: "dim" },
        { text: `Target: ${base}`, delay: 250, type: "dim" },
        { text: "", delay: 150 },
        { text: "[*] Initializing report engine...", delay: 350 },
        { text: "[*] Loading previous scan & attack data...", delay: 400 },
        { text: "[+] Loaded 8 endpoints and 5 findings", delay: 300, type: "success" },
        { text: "", delay: 150 },
        { text: "[*] Phase 1: Aggregating Results", delay: 300 },
        { text: "    Correlating findings with endpoints...", delay: 350, type: "dim" },
        { text: "    Computing severity distribution...", delay: 300, type: "dim" },
        { text: "[+] Summary: 1 Critical, 2 High, 2 Medium, 0 Low", delay: 250, type: "success" },
        { text: "", delay: 150 },
        { text: "[*] Phase 2: AI Recommendation Generation", delay: 300 },
        { text: "    Analyzing vulnerability patterns...", delay: 400, type: "dim" },
        { text: "    Generating remediation guidance...", delay: 450, type: "dim" },
        { text: "    Prioritizing by risk score...", delay: 300, type: "dim" },
        { text: "[+] Generated 7 actionable recommendations", delay: 250, type: "success" },
        { text: "", delay: 150 },
        { text: "[+] Report generation complete.", delay: 300, type: "success" },
      ]

    case "call":
      return [
        { text: `$ rico call ${base}/api/v1/users`, delay: 400, type: "dim" },
        { text: "", delay: 200 },
        { text: "Rico v1.2.0 - AI-Driven API Security Scanner", delay: 300, type: "dim" },
        { text: `Target: ${base}/api/v1/users`, delay: 250, type: "dim" },
        { text: "", delay: 150 },
        { text: "[*] Preparing API request...", delay: 300 },
        { text: "    Method: GET", delay: 150, type: "dim" },
        { text: "    Headers: Accept: application/json", delay: 150, type: "dim" },
        { text: "", delay: 150 },
        { text: "[*] Sending request...", delay: 400 },
        { text: "[+] Response received: 200 OK", delay: 300, type: "success" },
        { text: "    Content-Type: application/json", delay: 150, type: "dim" },
        { text: "    Response size: 342 bytes", delay: 150, type: "dim" },
        { text: "", delay: 150 },
        { text: "[*] AI Analysis of Response", delay: 300 },
        { text: "    Checking for sensitive data exposure...", delay: 350, type: "dim" },
        { text: "    Analyzing response headers...", delay: 300, type: "dim" },
        { text: "[+] Analysis complete. Response data parsed.", delay: 250, type: "success" },
      ]
  }
}
