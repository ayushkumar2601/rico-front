# RICO Frontend-Backend Integration

## Overview

The RICO frontend is now fully integrated with the deployed FastAPI backend at `https://rico-term.onrender.com`.

## Architecture

### Environment Configuration

- **Production Backend**: `https://rico-term.onrender.com`
- **Local Backend**: `http://localhost:10000` (for development)
- **Configuration File**: `.env.local`

### API Layer (`lib/api.ts`)

Central API client that handles all backend communication:

- `startScan(request)` - Initiates a new security scan
- `getScanStatus(scanId)` - Polls scan status and retrieves results
- `checkHealth()` - Verifies backend availability

All API calls use the `NEXT_PUBLIC_API_URL` environment variable.

### Components

#### RealScanner (`components/real-scanner.tsx`)

Production-ready scanner component with:

- File upload (OpenAPI spec: .yaml, .yml, .json)
- Base URL input with validation
- Real-time status updates via polling
- Comprehensive results display
- Error handling for network failures

#### Scanner Workflow

1. **Upload Phase**: User uploads OpenAPI spec and enters base URL
2. **Submission**: Form validation and API call to `/scan` endpoint
3. **Polling Phase**: Polls `/scan/{scan_id}` every 3 seconds
4. **Status Transitions**: `queued` → `running` → `completed` or `failed`
5. **Results Display**: Shows vulnerabilities, risk score, and detailed findings

### Pages

- `/scan` - Production scanner with real backend integration
- `/try` - Demo page with simulated data (original)
- `/` - Homepage with updated CTAs

## Environment Setup

### Local Development

1. Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://rico-term.onrender.com
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

### Production Deployment

1. Set environment variable in Render/Vercel:
```
NEXT_PUBLIC_API_URL=https://rico-term.onrender.com
```

2. Build and deploy:
```bash
npm run build
npm start
```

## API Endpoints Used

### POST /scan

Initiates a new security scan.

**Request**:
- `spec_file`: OpenAPI specification file (multipart/form-data)
- `base_url`: Target API base URL
- `token`: Optional authentication token
- `use_ai`: Enable AI-powered testing (optional)
- `use_agentic_ai`: Enable agentic AI analysis (optional)

**Response**:
```json
{
  "scan_id": "uuid",
  "status": "started",
  "message": "Scan initiated successfully..."
}
```

### GET /scan/{scan_id}

Retrieves scan status and results.

**Response**:
```json
{
  "scan_id": "uuid",
  "status": "completed",
  "result": {
    "risk_score": 75,
    "risk_level": "High",
    "total_vulnerabilities": 5,
    "vulnerabilities": [...],
    "endpoints_tested": 8,
    "duration": 12.5,
    ...
  }
}
```

**Status Values**:
- `queued` - Scan waiting to start
- `running` - Scan in progress
- `completed` - Scan finished successfully
- `failed` - Scan encountered an error

### GET /health

Health check endpoint.

**Response**:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-02-28T..."
}
```

## Error Handling

The integration handles:

- **Network Failures**: Connection timeout, DNS errors
- **Backend Errors**: 500 Internal Server Error
- **Invalid Files**: Non-OpenAPI files rejected
- **Invalid URLs**: URL format validation
- **CORS Issues**: Proper headers configured
- **Polling Failures**: Graceful degradation

All errors display user-friendly messages without crashing the UI.

## Polling Mechanism

```typescript
// Poll every 3 seconds
const interval = setInterval(async () => {
  const status = await getScanStatus(scanId)
  
  if (status.status === "completed" || status.status === "failed") {
    clearInterval(interval) // Stop polling
    // Display results
  }
}, 3000)
```

**Memory Safety**: Intervals are cleared on:
- Scan completion
- Scan failure
- Component unmount
- New scan initiation

## Testing

### Local Testing

1. Start frontend:
```bash
cd frontend
npm run dev
```

2. Navigate to http://localhost:3000/scan

3. Upload test file: `demo-api/openapi.yaml`

4. Enter base URL: `http://localhost:8000`

5. Click "Start Scan"

6. Verify:
   - File uploads successfully
   - Scan ID is displayed
   - Status transitions: queued → running → completed
   - Results display correctly
   - No console errors

### Production Testing

1. Navigate to https://your-frontend.vercel.app/scan

2. Upload OpenAPI spec

3. Enter production API URL

4. Verify end-to-end flow

## Troubleshooting

### "Unable to connect to RICO backend"

- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running: `curl https://rico-term.onrender.com/health`
- Check network connectivity

### "Failed to start scan"

- Verify file is valid OpenAPI spec
- Check base URL format (must include protocol)
- Check backend logs for errors

### Polling Never Completes

- Check browser console for errors
- Verify scan ID is correct
- Check backend scan status manually: `curl https://rico-term.onrender.com/scan/{scan_id}`

### CORS Errors

- Backend has CORS middleware configured for all origins
- If issues persist, check browser console for specific CORS error

## Files Modified/Created

### Created
- `frontend/.env.local` - Environment configuration
- `frontend/.env.example` - Environment template
- `frontend/lib/api.ts` - API client layer
- `frontend/components/real-scanner.tsx` - Production scanner component
- `frontend/app/scan/page.tsx` - Scan page
- `frontend/INTEGRATION.md` - This file

### Modified
- `frontend/components/header.tsx` - Added scan link to navigation
- `frontend/app/page.tsx` - Updated CTAs to point to scan page

## Next Steps

1. **Add Authentication**: Implement token-based auth for scan endpoints
2. **Add Report Download**: Allow users to download scan reports (JSON, HTML, SARIF)
3. **Add Scan History**: Store and display previous scans
4. **Add Real-time Updates**: Replace polling with WebSocket/SSE for live updates
5. **Add Advanced Options**: Expose more scan configuration options (AI, max endpoints, etc.)

## Support

For issues or questions:
- Check backend health: https://rico-term.onrender.com/health
- Check API docs: https://rico-term.onrender.com/docs
- Review backend logs in Render dashboard
