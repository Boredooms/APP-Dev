# 📱 VisionPath - Quick Start Guide

## 🚀 START IN 2 STEPS

### Step 1: Start Backend
```bash
cd c:\coder\visionpath\server
npm start
```
✅ Should see: "VisionPath Backend Running" on `http://localhost:5000`

### Step 2: Start Mobile App
```bash
cd c:\coder\visionpath\mobile
npx expo start
```
✅ Opens Expo DevTools - scan QR code with Expo Go app or press `w` for web

---

## 🎯 Testing on Phone

**Edit these 2 files and replace `localhost` with your PC's IP:**

1. `mobile/screens/HomeScreen.js` - Line 9
2. `mobile/screens/DemoScreen.js` - Line 56

**Find your IP:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Example change:**
```javascript
// Before
fetch('http://localhost:5000/api/status')

// After
fetch('http://192.168.1.100:5000/api/status')
```

---

## 📂 Everything You Have

```
visionpath/
│
├── README.md              ← Full documentation
├── QUICKSTART.md          ← This file
│
├── server/                ← Backend (port 5000)
│   ├── index.js          ← Express API with 2 endpoints
│   └── package.json
│
└── mobile/                ← React Native app
    ├── App.js            ← Navigation
    ├── app.json          ← Expo config
    ├── screens/          ← 3 screens
    │   ├── HomeScreen.js
    │   ├── FeaturesScreen.js
    │   └── DemoScreen.js
    └── components/        ← 3 components
        ├── DistanceBar.js
        ├── AlertBox.js
        └── DetectionBox.js
```

---

## ✨ Features

- ✅ Pure black & white monochrome UI
- ✅ Live object detection simulation
- ✅ Distance-based danger alerts
- ✅ Bengali voice warnings
- ✅ Red border flash animation
- ✅ 3-second automated polling
- ✅ Professional brutalist design

---

## 🐛 Troubleshooting

**"Cannot connect to backend"**
→ Make sure `npm start` is running in server folder

**"Expo app not loading"**
→ Phone and PC must be on same WiFi

**"Voice not working"**
→ Make sure phone volume is up and simulation detects danger (< 1.5m)

---

**All dependencies already installed. Just run and demo! 🔥**
