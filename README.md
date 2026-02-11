# 🔥 VisionPath - Complete Setup Guide (With Real AI!)

## What You Have Now

✅ **Mobile App (React Native + Expo)**
- Real camera feed 
- Captures frames every 2 seconds
- Displays AI detection results
- Bengali voice alerts
- Distance warnings with red flash

✅ **AI Backend (Python + YOLOv8)**
- Detects 80 different objects
- Returns confidence scores
- Calculates distance estimates
- Provides Bengali translations

---

## 🚀 How to Run Everything

### Step 1: Start AI Backend (Port 8000)

```bash
cd c:\coder\visionpath\server-ai
python main.py
```

**You should see:**
```
Loading YOLOv8-nano model...
Model loaded successfully!
🔥 Starting VisionPath AI Backend...
📍 Server will run on: http://localhost:8000
```

**First run:** YOLOv8 model downloads automatically (~6MB, takes 30-60s)

---

### Step 2: Restart Expo App

**IMPORTANT:** You must restart Expo for camera permissions to work!

```bash
# Go to the terminal running "npx expo start"
# Press Ctrl+C to stop

# Then restart:
cd c:\coder\visionpath\mobile
npx expo start
```

Press `w` for web OR scan QR code with Expo Go app

---

### Step 3: Test on Your Phone

1. Open Expo Go app
2. Scan QR code from terminal
3. App opens → Tap "START SIMULATION"  
4. **Grant Camera Permission** when prompted
5. Point camera at objects
6. See detections appear every 2s!

**Update IP if needed:**
- `mobile/screens/DemoScreen.js` line 65
- Change `172.18.234.189` to your PC's IP (run `ipconfig`)

---

## 📱 What the App Does

**When you press "START AI DETECTION":**

1. Camera opens and shows live feed
2. Every 2 seconds:
   - Captures a photo
   - Sends to AI backend at `http://YOUR_IP:8000/api/detect`
   - Shows detected object name (e.g., "PERSON", "CAR")
   - Displays confidence score (e.g., "85% confident")
   - Shows estimated distance (e.g., "1.2m")
   - Updates distance bar color (red/white/gray)
   
3. If object is < 1.5m away:
   - Red border flashes
   - Bengali voice speaks (e.g., "Gari samne")

---

## 🧪 What Objects Can Be Detected?

YOLOv8 detects **80 objects** from COCO dataset:

### Vehicles & Transportation
car, truck, bus, motorcycle, bicycle, train, boat, airplane

### People & Animals  
person, dog, cat, bird, horse, cow, sheep

### Traffic & Road
traffic light, stop sign, fire hydrant, parking meter

### Common Items
chair, table, laptop, phone, bottle, cup, keyboard, mouse

**And 60+ more!**

---

## ⚠️ Common Issues

**"Cannot connect to AI backend"**
→ Make sure Python server is running: `python main.py` in `server-ai` folder

**"Camera permission denied"**
→ Go to phone Settings → Apps → Expo Go → Permissions → Enable Camera

**"Black screen"**
→ Restart Expo: Press Ctrl+C, then `npx expo start` again

**Camera not opening**
→ You're testing in web browser - camera only works on real phone via Expo Go

**Detection not working**
→ Update IP address in DemoScreen.js line 65 to match your PC's IP

---

## 📂 Project Structure

```
visionpath/
├── mobile/                    # React Native app
│   ├── screens/
│   │   ├── HomeScreen.js     # Landing page
│   │   ├── FeaturesScreen.js # Info page
│   │   └── DemoScreen.js     # AI detection screen ⭐
│   ├── components/
│   └── app.json              # Camera permissions configured
│
├── server-ai/                 # Python AI backend ⭐
│   ├── main.py               # FastAPI + YOLOv8
│   └── requirements.txt
│
├── server/                    # Old simulation server (optional)
│   └── index.js
│
└── README.md
```

---

## 🎯 Demo Flow

1. User opens app
2. Sees "VISIONPATH" home screen  
3. Taps "START SIMULATION"
4. Camera opens with detection overlay
5. Points at objects
6. AI detects and announces in Bengali
7. Distance warnings with visual+audio alerts

**Perfect for hackathon demo!** 🚀

---

## 💡 Tips

- Test indoors first with common objects (laptop, phone, bottle)
- Point camera at people to hear "Samne lok"
- Cover/uncover objects to see detection change
- Move closer to trigger red danger alerts
- Works best in good lighting

---

**All systems ready! Restart Expo and test!** ✅
