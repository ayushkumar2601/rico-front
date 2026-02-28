/**
 * RICO Backend API Client
 * 
 * Central API layer for all backend communication.
 * Uses environment-based configuration for deployment flexibility.
 */

// Get API base URL from environment
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  console.error("NEXT_PUBLIC_API_URL is not defined in environment variables");
}

/**
 * Scan request parameters
 */
export interface ScanRequest {
  spec_file: File;
  base_url: string;
  token?: string;
  max_endpoints?: number;
  use_ai?: boolean;
  use_agentic_ai?: boolean;
}

/**
 * Scan response from /scan endpoint
 */
export interface ScanResponse {
  scan_id: string;
  status: string;
  message: string;
}

/**
 * Scan status response from /scan/{scan_id} endpoint
 */
export interface ScanStatusResponse {
  scan_id: string;
  status: "queued" | "running" | "completed" | "failed";
  result?: ScanResult;
  error?: string;
}

/**
 * Scan result structure
 */
export interface ScanResult {
  scan_id: string;
  target_url: string;
  risk_score: number;
  risk_level: string;
  total_vulnerabilities: number;
  vulnerabilities: Vulnerability[];
  total_endpoints: number;
  endpoints_tested: number;
  duration: number;
  status: string;
  security_score: number;
  top_issue: string;
  severity_distribution: {
    Critical: number;
    High: number;
    Medium: number;
    Low: number;
    Info: number;
  };
  timestamp: string;
}

/**
 * Vulnerability structure
 */
export interface Vulnerability {
  type: string;
  endpoint: string;
  method: string;
  severity: "Critical" | "High" | "Medium" | "Low" | "Info";
  confidence: number;
  description: string;
  cvss_score: number;
  status: string;
}

/**
 * API Error class
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

/**
 * Start a new security scan
 * 
 * @param request - Scan request parameters
 * @returns Scan response with scan_id
 * @throws APIError if request fails
 */
export async function startScan(request: ScanRequest): Promise<ScanResponse> {
  if (!API_BASE) {
    throw new APIError("API URL not configured. Please set NEXT_PUBLIC_API_URL environment variable.");
  }

  const formData = new FormData();
  formData.append("spec_file", request.spec_file);
  formData.append("base_url", request.base_url);
  
  if (request.token) {
    formData.append("token", request.token);
  }
  
  if (request.max_endpoints !== undefined) {
    formData.append("max_endpoints", request.max_endpoints.toString());
  }
  
  if (request.use_ai !== undefined) {
    formData.append("use_ai", request.use_ai.toString());
  }
  
  if (request.use_agentic_ai !== undefined) {
    formData.append("use_agentic_ai", request.use_agentic_ai.toString());
  }

  try {
    const response = await fetch(`${API_BASE}/scan`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to start scan";
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      throw new APIError(errorMessage, response.status, errorText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new APIError(
        "Unable to connect to RICO backend. Please check your network connection.",
        0,
        error.message
      );
    }
    
    throw new APIError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0
    );
  }
}

/**
 * Get scan status and results
 * 
 * @param scanId - Scan ID from startScan response
 * @returns Scan status response
 * @throws APIError if request fails
 */
export async function getScanStatus(scanId: string): Promise<ScanStatusResponse> {
  if (!API_BASE) {
    throw new APIError("API URL not configured. Please set NEXT_PUBLIC_API_URL environment variable.");
  }

  try {
    const response = await fetch(`${API_BASE}/scan/${scanId}`);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to get scan status";
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      throw new APIError(errorMessage, response.status, errorText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new APIError(
        "Unable to connect to RICO backend. Please check your network connection.",
        0,
        error.message
      );
    }
    
    throw new APIError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0
    );
  }
}

/**
 * Check backend health
 * 
 * @returns Health status
 */
export async function checkHealth(): Promise<{ status: string; version: string; timestamp: string }> {
  if (!API_BASE) {
    throw new APIError("API URL not configured");
  }

  try {
    const response = await fetch(`${API_BASE}/health`);
    
    if (!response.ok) {
      throw new APIError("Health check failed", response.status);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    throw new APIError(
      error instanceof Error ? error.message : "Health check failed",
      0
    );
  }
}

/**
 * Get API base URL (for debugging)
 */
export function getAPIBaseURL(): string | undefined {
  return API_BASE;
}

/**
 * Run demo scan
 * 
 * Initiates a one-click demo scan without requiring file upload or base URL input.
 * Uses a bundled demo OpenAPI spec and preconfigured demo API.
 * 
 * @returns Scan response with scan_id
 * @throws APIError if request fails
 */
export async function runDemoScan(): Promise<ScanResponse> {
  if (!API_BASE) {
    throw new APIError("API URL not configured. Please set NEXT_PUBLIC_API_URL environment variable.");
  }

  try {
    const response = await fetch(`${API_BASE}/demo-scan`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to start demo scan";
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      throw new APIError(errorMessage, response.status, errorText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new APIError(
        "Unable to connect to RICO backend. Please check your network connection.",
        0,
        error.message
      );
    }
    
    throw new APIError(
      error instanceof Error ? error.message : "Unknown error occurred",
      0
    );
  }
}


/**
 * Get scan logs
 */
export async function getScanLogs(scanId: string): Promise<{
  scan_id: string;
  logs: Array<{
    timestamp: string;
    message: string;
    type: string;
  }>;
  total_logs: number;
}> {
  const response = await fetch(`${API_BASE}/scan/${scanId}/logs`);
  
  if (!response.ok) {
    throw new APIError("Failed to fetch scan logs", response.status);
  }
  
  return await response.json();
}
