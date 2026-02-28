# RICO Frontend-Backend Integration Diagram

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                 │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    RICO Frontend                            │   │
│  │              (Next.js + React + TypeScript)                 │   │
│  │                http://localhost:3000                        │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────┐     │   │
│  │  │  Pages                                            │     │   │
│  │  │  ┌─────────────────────────────────────────┐    │     │   │
│  │  │  │  /scan (Production Scanner)              │    │     │   │
│  │  │  │  - Upload OpenAPI spec                   │    │     │   │
│  │  │  │  - Enter base URL                        │    │     │   │
│  │  │  │  - Start scan                            │    │     │   │
│  │  │  │  - View results                          │    │     │   │
│  │  │  └─────────────────────────────────────────┘    │     │   │
│  │  │  ┌─────────────────────────────────────────┐    │     │   │
│  │  │  │  /try (Demo Scanner)                     │    │     │   │
│  │  │  │  - Simulated data                        │    │     │   │
│  │  │  └─────────────────────────────────────────┘    │     │   │
│  │  └──────────────────────────────────────────────────┘     │   │
│  │                          │                                  │   │
│  │  ┌──────────────────────▼──────────────────────────┐     │   │
│  │  │  Components                                      │     │   │
│  │  │  ┌─────────────────────────────────────────┐   │     │   │
│  │  │  │  RealScanner                             │   │     │   │
│  │  │  │  - File upload                           │   │     │   │
│  │  │  │  - Form validation                       │   │     │   │
│  │  │  │  - Status display                        │   │     │   │
│  │  │  │  - Polling logic                         │   │     │   │
│  │  │  │  - Results display                       │   │     │   │
│  │  │  └─────────────────────────────────────────┘   │     │   │
│  │  └──────────────────────────────────────────────────┘     │   │
│  │                          │                                  │   │
│  │  ┌──────────────────────▼──────────────────────────┐     │   │
│  │  │  API Layer (lib/api.ts)                          │     │   │
│  │  │  ┌─────────────────────────────────────────┐   │     │   │
│  │  │  │  startScan(request)                      │   │     │   │
│  │  │  │  - Uploads file                          │   │     │   │
│  │  │  │  - Returns scan_id                       │   │     │   │
│  │  │  └─────────────────────────────────────────┘   │     │   │
│  │  │  ┌─────────────────────────────────────────┐   │     │   │
│  │  │  │  getScanStatus(scanId)                   │   │     │   │
│  │  │  │  - Polls every 3 seconds                 │   │     │   │
│  │  │  │  - Returns status + results              │   │     │   │
│  │  │  └─────────────────────────────────────────┘   │     │   │
│  │  │  ┌─────────────────────────────────────────┐   │     │   │
│  │  │  │  checkHealth()                           │   │     │   │
│  │  │  │  - Verifies backend availability         │   │     │   │
│  │  │  └─────────────────────────────────────────┘   │     │   │
│  │  └──────────────────────────────────────────────────┘     │   │
│  │                          │                                  │   │
│  │  ┌──────────────────────▼──────────────────────────┐     │   │
│  │  │  Environment Config (.env.local)                 │     │   │
│  │  │  NEXT_PUBLIC_API_URL=                            │     │   │
│  │  │    https://rico-term.onrender.com                │     │   │
│  │  └──────────────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │ HTTPS Requests
                           │ (fetch API)
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                    INTERNET / CLOUD                               │
└──────────────────────────┬───────────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                  RICO Backend API                                 │
│                  (FastAPI + Python)                               │
│            https://rico-term.onrender.com                         │
│                  (Deployed on Render)                             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  REST API Endpoints                                     │     │
│  │  ┌─────────────────────────────────────────────────┐  │     │
│  │  │  POST /scan                                      │  │     │
│  │  │  - Accepts: spec_file, base_url                 │  │     │
│  │  │  - Returns: scan_id, status, message            │  │     │
│  │  │  - Starts background scan task                  │  │     │
│  │  └─────────────────────────────────────────────────┘  │     │
│  │  ┌─────────────────────────────────────────────────┐  │     │
│  │  │  GET /scan/{scan_id}                            │  │     │
│  │  │  - Returns: status, result, error               │  │     │
│  │  │  - Status: queued → running → completed/failed  │  │     │
│  │  └─────────────────────────────────────────────────┘  │     │
│  │  ┌─────────────────────────────────────────────────┐  │     │
│  │  │  GET /health                                     │  │     │
│  │  │  - Returns: status, version, timestamp          │  │     │
│  │  └─────────────────────────────────────────────────┘  │     │
│  │  ┌─────────────────────────────────────────────────┐  │     │
│  │  │  GET /docs                                       │  │     │
│  │  │  - Swagger UI documentation                     │  │     │
│  │  └─────────────────────────────────────────────────┘  │     │
│  └────────────────────────────────────────────────────────┘     │
│                          │                                        │
│  ┌────────────────────────▼────────────────────────────────┐    │
│  │  Background Task Execution                              │    │
│  │  ┌─────────────────────────────────────────────────┐   │    │
│  │  │  Scan Service (rico/services/scan_service.py)   │   │    │
│  │  │  - Parses OpenAPI spec                          │   │    │
│  │  │  - Discovers endpoints                          │   │    │
│  │  │  - Runs attack modules                          │   │    │
│  │  │  - Generates report                             │   │    │
│  │  │  - Stores results in SCAN_STORAGE               │   │    │
│  │  └─────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          │                                        │
│  ┌────────────────────────▼────────────────────────────────┐    │
│  │  Attack Modules                                          │    │
│  │  ┌─────────────────────────────────────────────────┐   │    │
│  │  │  IDOR Testing (rico/attacks/idor.py)            │   │    │
│  │  │  - Tests object-level authorization             │   │    │
│  │  └─────────────────────────────────────────────────┘   │    │
│  │  ┌─────────────────────────────────────────────────┐   │    │
│  │  │  SQL Injection (rico/attacks/sqli.py)           │   │    │
│  │  │  - Tests for SQL injection vulnerabilities      │   │    │
│  │  └─────────────────────────────────────────────────┘   │    │
│  │  ┌─────────────────────────────────────────────────┐   │    │
│  │  │  Missing Auth (rico/attacks/missing_auth.py)    │   │    │
│  │  │  - Tests authentication enforcement             │   │    │
│  │  └─────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          │                                        │
│  ┌────────────────────────▼────────────────────────────────┐    │
│  │  In-Memory Storage                                       │    │
│  │  SCAN_STORAGE = {                                        │    │
│  │    "scan_id": {                                          │    │
│  │      "status": "completed",                              │    │
│  │      "result": { ... },                                  │    │
│  │      "created_at": "...",                                │    │
│  │      "completed_at": "..."                               │    │
│  │    }                                                     │    │
│  │  }                                                       │    │
│  │  - Max 100 scans (memory limit)                         │    │
│  │  - Max 5 concurrent scans (concurrency limit)           │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────┘
```

## Request/Response Flow

### 1. Scan Initiation

```
User Action: Upload file + Enter URL + Click "Start Scan"
     │
     ▼
Frontend: Validate inputs
     │
     ▼
Frontend: Create FormData
     │
     ▼
API Layer: startScan(request)
     │
     ▼
HTTP: POST https://rico-term.onrender.com/scan
      FormData: { spec_file, base_url }
     │
     ▼
Backend: Receive request
     │
     ▼
Backend: Save spec file to temp
     │
     ▼
Backend: Generate scan_id (UUID)
     │
     ▼
Backend: Start background task
     │
     ▼
Backend: Return response
     │
     ▼
HTTP: 200 OK
      { scan_id, status: "started", message }
     │
     ▼
Frontend: Store scan_id
     │
     ▼
Frontend: Start polling
```

### 2. Status Polling (Every 3 seconds)

```
Timer: Every 3 seconds
     │
     ▼
API Layer: getScanStatus(scan_id)
     │
     ▼
HTTP: GET https://rico-term.onrender.com/scan/{scan_id}
     │
     ▼
Backend: Lookup scan_id in SCAN_STORAGE
     │
     ▼
Backend: Return current status
     │
     ▼
HTTP: 200 OK
      { scan_id, status, result?, error? }
     │
     ▼
Frontend: Update UI based on status
     │
     ├─ status: "queued" → Show "Waiting..."
     ├─ status: "running" → Show "Scanning..."
     ├─ status: "completed" → Show results + Stop polling
     └─ status: "failed" → Show error + Stop polling
```

### 3. Background Scan Execution

```
Backend: Background task starts
     │
     ▼
Scan Service: Parse OpenAPI spec
     │
     ▼
Scan Service: Extract endpoints
     │
     ▼
Scan Service: For each endpoint:
     │
     ├─ Run IDOR test
     ├─ Run SQL injection test
     └─ Run missing auth test
     │
     ▼
Scan Service: Aggregate results
     │
     ▼
Scan Service: Calculate risk score
     │
     ▼
Scan Service: Build report
     │
     ▼
Scan Service: Store in SCAN_STORAGE
     │
     ▼
SCAN_STORAGE: Update status to "completed"
```

## Data Flow

### Request Data

```typescript
// Frontend → Backend
{
  spec_file: File,           // OpenAPI spec (.yaml, .yml, .json)
  base_url: string,          // Target API URL
  token?: string,            // Optional auth token
  use_ai?: boolean,          // Enable AI features
  use_agentic_ai?: boolean   // Enable agentic AI
}
```

### Response Data

```typescript
// Backend → Frontend (Initial)
{
  scan_id: string,           // UUID
  status: "started",
  message: string
}

// Backend → Frontend (Polling)
{
  scan_id: string,
  status: "queued" | "running" | "completed" | "failed",
  result?: {
    risk_score: number,
    risk_level: string,
    total_vulnerabilities: number,
    vulnerabilities: Array<{
      type: string,
      endpoint: string,
      severity: string,
      description: string,
      ...
    }>,
    endpoints_tested: number,
    duration: number,
    ...
  },
  error?: string
}
```

## Error Handling Flow

```
Error Occurs
     │
     ├─ Network Error
     │  └─ Display: "Unable to connect to backend"
     │
     ├─ Backend 500
     │  └─ Display: "Server error occurred"
     │
     ├─ Invalid File
     │  └─ Display: "Please upload valid OpenAPI spec"
     │
     ├─ Invalid URL
     │  └─ Display: "Please enter valid URL"
     │
     └─ Timeout
        └─ Display: "Request timed out"
```

## Memory Management

```
Frontend:
  - Polling interval stored in ref
  - Cleared on:
    * Component unmount
    * Scan completion
    * Scan failure
    * New scan start

Backend:
  - SCAN_STORAGE limited to 100 scans
  - Oldest scans removed when limit exceeded
  - Max 5 concurrent scans (semaphore)
  - Temp files cleaned up after scan
```

## Security Considerations

```
Frontend:
  ✓ No sensitive data in localStorage
  ✓ Environment variables for config
  ✓ Input validation before submission
  ✓ HTTPS only in production

Backend:
  ✓ CORS configured for all origins
  ✓ File upload validation
  ✓ Temp file cleanup
  ✓ Rate limiting (5 concurrent scans)
  ✓ Memory limits (100 scans max)
```

## Performance Optimizations

```
Frontend:
  ✓ Polling interval: 3 seconds (not too frequent)
  ✓ Cleanup on unmount (no memory leaks)
  ✓ Lazy loading of results
  ✓ Tabbed interface (render on demand)

Backend:
  ✓ Background task execution (non-blocking)
  ✓ Concurrency limits (5 max)
  ✓ Memory limits (100 scans max)
  ✓ Automatic cleanup of old scans
  ✓ Temp file cleanup
```

---

**Integration Status**: ✅ Complete and Verified  
**Last Updated**: 2026-02-28
