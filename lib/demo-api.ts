/**
 * Demo data generator for the Try Online page.
 * In production, these functions would call the real Rico backend API.
 * Each function returns structured JSON mimicking Rico's actual output.
 */

export type ScanEndpoint = {
  path: string
  method: string
  classification: string
  auth_required: boolean
  parameters: string[]
}

export type ScanResult = {
  target: string
  endpoints: ScanEndpoint[]
  total_endpoints: number
  scan_time: string
}

export type AttackFinding = {
  endpoint: string
  vulnerability: string
  severity: "Critical" | "High" | "Medium" | "Low"
  description: string
  evidence: string
}

export type AttackResult = {
  target: string
  findings: AttackFinding[]
  total_findings: number
  attack_time: string
}

export type ReportResult = {
  target: string
  summary: {
    total_endpoints: number
    total_findings: number
    critical: number
    high: number
    medium: number
    low: number
  }
  recommendations: string[]
}

export type CallResult = {
  target: string
  status: number
  status_text: string
  headers: Record<string, string>
  body: Record<string, unknown>
  response_time: string
}

export type DemoResult =
  | { type: "scan"; data: ScanResult }
  | { type: "attack"; data: AttackResult }
  | { type: "report"; data: ReportResult }
  | { type: "call"; data: CallResult }

/**
 * Simulates a network delay to mimic a real API call.
 * Replace this with an actual fetch() to the Rico backend.
 */
async function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function runDemoAction(
  url: string,
  action: "scan" | "attack" | "report" | "call"
): Promise<DemoResult> {
  // Simulate network latency (1.5-3s)
  await simulateDelay(1500 + Math.random() * 1500)

  const parsedUrl = url.replace(/\/+$/, "")

  switch (action) {
    case "scan":
      return {
        type: "scan",
        data: {
          target: parsedUrl,
          endpoints: [
            {
              path: "/api/v1/users",
              method: "GET",
              classification: "user-data",
              auth_required: true,
              parameters: ["page", "limit", "sort"],
            },
            {
              path: "/api/v1/users/{id}",
              method: "GET",
              classification: "user-data",
              auth_required: true,
              parameters: ["id"],
            },
            {
              path: "/api/v1/users",
              method: "POST",
              classification: "user-management",
              auth_required: true,
              parameters: ["name", "email", "role"],
            },
            {
              path: "/api/v1/login",
              method: "POST",
              classification: "authentication",
              auth_required: false,
              parameters: ["username", "password"],
            },
            {
              path: "/api/v1/products",
              method: "GET",
              classification: "product-data",
              auth_required: false,
              parameters: ["category", "page", "limit"],
            },
            {
              path: "/api/v1/orders",
              method: "GET",
              classification: "order-data",
              auth_required: true,
              parameters: ["status", "from_date", "to_date"],
            },
            {
              path: "/api/v1/orders/{id}",
              method: "PUT",
              classification: "order-management",
              auth_required: true,
              parameters: ["id", "status"],
            },
            {
              path: "/api/v1/admin/config",
              method: "GET",
              classification: "admin-config",
              auth_required: true,
              parameters: [],
            },
          ],
          total_endpoints: 8,
          scan_time: `${(1.8 + Math.random() * 2).toFixed(1)}s`,
        },
      }

    case "attack":
      return {
        type: "attack",
        data: {
          target: parsedUrl,
          findings: [
            {
              endpoint: "/api/v1/users/{id}",
              vulnerability: "BOLA / IDOR",
              severity: "High",
              description:
                "Accessing user data with different user IDs returns data without proper authorization checks. An attacker can enumerate user records.",
              evidence:
                "GET /api/v1/users/2 returned user data while authenticated as user 1. No 403 or ownership validation detected.",
            },
            {
              endpoint: "/api/v1/login",
              vulnerability: "Brute Force Susceptible",
              severity: "Medium",
              description:
                "No rate limiting detected on the login endpoint. An attacker can attempt unlimited credential combinations.",
              evidence:
                "Sent 200 requests in 15 seconds without receiving any 429 Too Many Requests response.",
            },
            {
              endpoint: "/api/v1/admin/config",
              vulnerability: "Broken Function-Level Authorization",
              severity: "Critical",
              description:
                "Admin configuration endpoint is accessible with standard user tokens. Sensitive configuration data is exposed.",
              evidence:
                "GET /api/v1/admin/config with a regular user Bearer token returned 200 OK with server configuration details.",
            },
            {
              endpoint: "/api/v1/orders/{id}",
              vulnerability: "Mass Assignment",
              severity: "Medium",
              description:
                "PUT endpoint accepts additional fields beyond documented parameters, allowing modification of protected order attributes.",
              evidence:
                'PUT /api/v1/orders/5 with body {"status":"shipped","price":0} returned 200 OK and updated the price field.',
            },
            {
              endpoint: "/api/v1/users",
              vulnerability: "SQL Injection",
              severity: "High",
              description:
                'The sort parameter is vulnerable to SQL injection. Malicious payloads can extract database information.',
              evidence:
                "GET /api/v1/users?sort=name;DROP TABLE--  returned a 500 error with a SQL syntax error in the response body.",
            },
          ],
          total_findings: 5,
          attack_time: `${(8 + Math.random() * 6).toFixed(1)}s`,
        },
      }

    case "report":
      return {
        type: "report",
        data: {
          target: parsedUrl,
          summary: {
            total_endpoints: 8,
            total_findings: 5,
            critical: 1,
            high: 2,
            medium: 2,
            low: 0,
          },
          recommendations: [
            "Implement object-level authorization checks on /api/v1/users/{id} to prevent BOLA/IDOR attacks.",
            "Add rate limiting (e.g., 5 attempts per minute) to /api/v1/login to mitigate brute-force attacks.",
            "Restrict /api/v1/admin/config access to admin-role tokens only using function-level authorization.",
            "Whitelist acceptable fields on /api/v1/orders/{id} PUT requests to prevent mass assignment.",
            "Use parameterized queries on /api/v1/users to eliminate SQL injection vulnerabilities.",
            "Consider implementing a Web Application Firewall (WAF) for an additional layer of protection.",
            "Enable API request logging and monitoring for anomaly detection.",
          ],
        },
      }

    case "call":
      return {
        type: "call",
        data: {
          target: `${parsedUrl}/api/v1/users`,
          status: 200,
          status_text: "OK",
          headers: {
            "content-type": "application/json",
            "x-request-id": "req_" + Math.random().toString(36).slice(2, 10),
            "x-rate-limit-remaining": "98",
            "cache-control": "no-store",
          },
          body: {
            users: [
              { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
              { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
              { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user" },
            ],
            total: 3,
            page: 1,
          },
          response_time: `${(120 + Math.random() * 300).toFixed(0)}ms`,
        },
      }
  }
}
