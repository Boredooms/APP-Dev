# VisionPath AI Backend - Quick Start

## Start the AI Backend

```bash
cd c:\coder\visionpath\server-ai
python main.py
```

**Server will run on:** `http://localhost:8000`

**What it does:**
- Receives camera frames from mobile app
- Runs YOLOv8-nano object detection  
- Returns detected objects with distance estimates
- Provides Bengali voice alert phrases

**Endpoints:**
- `GET /api/status` - Check backend status
- `POST /api/detect` - Upload image for detection

---

## How Distance is Calculated

Distance is estimated from bounding box size:
- Large box (fills screen) → ~0.5-1m (close)
- Medium box → ~1.5-2.5m (medium)
- Small box → ~3-4m (far)

---

## Supported Objects (80 total via COCO dataset)

### Vehicles
- car, truck, bus, motorcycle, bicycle

### People
- person

### Traffic
- traffic light, stop sign, fire hydrant

### Animals
- dog, cat, bird, horse, etc.

And 70+ more common objects!

---

## Bengali Alerts

Custom phrases for:
- **Vehicles:** "Gari samne", "Truck samne", "Bus samne"
- **Person:** "Samne lok"
- **Cycle:** "Cycle samne"
- **Default:** "{Object} samne"

---

## First Run

On first run, YOLOv8-nano model (~6MB) will download automatically.

Be patient - it may take 30-60 seconds to load the model initially.

---

## Testing

1. Start backend: `python main.py`
2. Start mobile app: `npx expo start` (in mobile folder)
3. Open app on phone
4. Tap "START AI DETECTION"
5. Point camera at objects
6. See real detections every 2 seconds!
