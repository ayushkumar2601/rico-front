# 🚀 RICO Frontend Quick Start Guide

Get the RICO frontend up and running in 5 minutes.

---

## Prerequisites

- Node.js 18+ installed
- npm or pnpm installed
- Internet connection (to reach backend)

---

## Quick Start (3 Steps)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open Browser

Navigate to: **http://localhost:3000/scan**

---

## Test the Integration

### Option A: Use Demo API

1. **Start Demo API** (in another terminal):
```bash
cd demo-api
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python app/main.py
```

2. **Upload Spec**:
   - File: `demo-api/openapi.yaml`
   - Base URL: `http://localhost:8000`

3. **Click "Start Scan"**

### Option B: Use Your Own API

1. **Upload your OpenAPI spec** (.yaml, .yml, or .json)
2. **Enter your API base URL** (e.g., https://api.example.com)
3. **Click "Start Scan"**

---

## What to Expect

### 1. Upload Phase (1-2 seconds)
- Status: "Uploading specification and starting scan..."
- Progress bar animating

### 2. Queued Phase (0-5 seconds)
- Status: "Scan queued, waiting to start..."
- Scan ID displayed

### 3. Running Phase (5-30 seconds)
- Status: "Scan in progress, analyzing endpoints..."
- Progress bar continues

### 4. Completed Phase
- Status: "Scan completed successfully!"
- Results displayed in tabs:
  - **Summary**: Risk score, vulnerabilities count, severity distribution
  - **Vulnerabilities**: Detailed list of issues found
  - **Raw Data**: Full JSON response

---

## Verify Integration

Run the test script:

**Windows**:
```bash
test-integration.bat
```

**Mac/Linux**:
```bash
chmod +x test-integration.sh
./test-integration.sh
```

Expected output:
```
✓ Environment configured correctly
✓ Backend is healthy and accessible
✓ API layer files are in place
✓ Frontend structure is correct
```

---

## Environment Configuration

The frontend is pre-configured to use the deployed backend:

```bash
NEXT_PUBLIC_API_URL=https://rico-term.onrender.com
```

To use a local backend instead:

1. Edit `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:10000
```

2. Restart dev server:
```bash
npm run dev
```

---

## Troubleshooting

### "Unable to connect to RICO backend"

**Solution**: Check backend health:
```bash
curl https://rico-term.onrender.com/health
```

Expected response:
```json
{"status":"ok","version":"1.0.0","timestamp":"..."}
```

### "Failed to start scan"

**Common causes**:
- Invalid OpenAPI spec file
- Invalid base URL format (must include http:// or https://)
- Backend is down

**Solution**: Check browser console (F12) for detailed error messages

### Port 3000 already in use

**Solution**: Use a different port:
```bash
PORT=3001 npm run dev
```

### Dependencies not installing

**Solution**: Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Homepage
│   ├── scan/
│   │   └── page.tsx          # Scan page (REAL BACKEND)
│   └── try/
│       └── page.tsx          # Demo page (SIMULATED)
├── components/
│   ├── real-scanner.tsx      # Production scanner
│   ├── scanner-client.tsx    # Demo scanner
│   └── header.tsx            # Navigation
├── lib/
│   ├── api.ts                # Backend API client
│   └── demo-api.ts           # Demo data generator
├── .env.local                # Environment config
└── INTEGRATION.md            # Full documentation
```

---

## Key Pages

- **/** - Homepage with features and CTAs
- **/scan** - Production scanner (real backend)
- **/try** - Demo scanner (simulated data)
- **/docs** - Documentation
- **/install** - Installation guide

---

## API Endpoints

The frontend uses these backend endpoints:

- `POST /scan` - Start a new scan
- `GET /scan/{scan_id}` - Get scan status and results
- `GET /health` - Check backend health

Full API docs: https://rico-term.onrender.com/docs

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## Production Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://rico-term.onrender.com
   ```
4. Deploy

### Render

1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://rico-term.onrender.com
   ```
6. Deploy

---

## Support

- **Documentation**: See `INTEGRATION.md` for detailed info
- **Backend API Docs**: https://rico-term.onrender.com/docs
- **Backend Health**: https://rico-term.onrender.com/health

---

## Next Steps

1. ✅ Start dev server: `npm run dev`
2. ✅ Open http://localhost:3000/scan
3. ✅ Upload OpenAPI spec
4. ✅ Run a scan
5. ✅ View results
6. 🚀 Deploy to production

---

**Happy Scanning! 🛡️**
