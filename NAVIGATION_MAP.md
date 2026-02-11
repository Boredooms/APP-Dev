# VisionPath - Navigation & Screen Map

## 📱 App Structure

```
┌─────────────────────────────────────┐
│         HOME SCREEN                 │
│  "AI Third Eye for Navigation"     │
│                                     │
│  Buttons:                           │
│  ┌───────────────────────────────┐ │
│  │ START AI DETECTION            │ │──┐
│  │ Open camera & detect objects  │ │  │
│  └───────────────────────────────┘ │  │
│                                     │  │
│  ┌───────────────────────────────┐ │  │
│  │ FEATURES                      │ │──┼──┐
│  │ Learn how it works            │ │  │  │
│  └───────────────────────────────┘ │  │  │
│                                     │  │  │
│  ┌───────────────────────────────┐ │  │  │
│  │ CHECK AI STATUS               │ │  │  │
│  │ Test backend connection       │ │  │  │
│  └───────────────────────────────┘ │  │  │
│                                     │  │  │
└─────────────────────────────────────┘  │  │
                                         │  │
         ┌───────────────────────────────┘  │
         │                                  │
         ▼                                  ▼
┌─────────────────────────┐    ┌─────────────────────────┐
│   DEMO SCREEN           │    │  FEATURES SCREEN        │
│  (AI Detection)         │    │  (Information)          │
│                         │    │                         │
│  • Camera viewfinder    │    │  Features:              │
│  • Detection overlay    │    │  • Real-time Detection  │
│  • Object name          │    │  • Bengali Voice        │
│  • Distance display     │    │  • Distance Estimation  │
│  • Confidence %         │    │  • Camera-based AI      │
│  • Distance bar         │    │                         │
│  • Voice alerts         │    │  Buttons:               │
│                         │    │  ┌───────────────────┐  │
│  Buttons:               │    │  │ TRY DEMO NOW →    │──┼──┐
│  ┌──────────┐           │    │  └───────────────────┘  │  │
│  │ ← BACK   │───────────┼────┤                         │  │
│  └──────────┘           │    │  ┌───────────────────┐  │  │
│  ┌──────────┐           │    │─▶│ ← BACK TO HOME    │  │  │
│  │ STOP     │           │    │  └───────────────────┘  │  │
│  └──────────┘           │    └─────────────────────────┘  │
│                         │                                 │
└─────────────────────────┘◀────────────────────────────────┘
```

---

## 🗺️ Navigation Routes

### From HOME SCREEN:
1. **START AI DETECTION** → Opens `DemoScreen`
2. **FEATURES** → Opens `FeaturesScreen`
3. **CHECK AI STATUS** → Calls backend API (stays on Home)

### From FEATURES SCREEN:
1. **TRY DEMO NOW →** → Opens `DemoScreen`
2. **← BACK TO HOME** → Returns to `HomeScreen`

### From DEMO SCREEN:
1. **← BACK** → Returns to previous screen (Home or Features)
2. **STOP** → Stops detection (stays on Demo)

---

## 📄 Screen Details

### 1️⃣ HOME SCREEN (`HomeScreen.js`)
**Purpose:** Landing page / main menu

**What it shows:**
- App title "VISIONPATH"
- Subtitle explaining purpose
- 3 action buttons with descriptions
- Demo version footer

**Navigation:**
- ✅ Navigates to Demo
- ✅ Navigates to Features
- ✅ Calls backend status check

---

### 2️⃣ FEATURES SCREEN (`FeaturesScreen.js`)
**Purpose:** Information about app capabilities

**What it shows:**
- Explanation of real-time object detection (YOLOv8)
- Bengali voice alerts feature
- Distance estimation capability
- Camera-based AI processing

**Navigation:**
- ✅ Has "TRY DEMO NOW" button → goes to Demo
- ✅ Has "BACK TO HOME" button → returns to Home

---

### 3️⃣ DEMO SCREEN (`DemoScreen.js`)
**Purpose:** Live AI object detection

**What it shows:**
- Live camera feed
- Detection overlay box with corner markers
- Detected object name (e.g. "PERSON", "CAR")
- Distance in meters (e.g. "2.3m")
- Confidence percentage (e.g. "87% confident")
- Color-coded distance bar (red/white/gray)
- Red border flash when danger detected
- "ANALYZING..." indicator during processing

**States:**
1. **Before start:** Black screen with "AI READY"
2. **Running:** Live camera with detection data
3. **Processing:** Shows "ANALYZING..." overlay
4. **Danger:** Red flashing border + voice alert

**Navigation:**
- ✅ Has "← BACK" button → returns to previous screen
- ✅ Has "STOP" button → stops detection

---

## 🔄 Navigation Flow Examples

### Happy Path 1 (Quick Demo):
```
Home → START AI DETECTION → Demo Screen → Camera opens → Detections appear
```

### Happy Path 2 (Learn First):
```
Home → FEATURES → Read info → TRY DEMO NOW → Demo Screen → Camera opens
```

### Happy Path 3 (Status Check):
```
Home → CHECK AI STATUS → See backend status → START AI DETECTION → Demo
```

---

## ✅ All Routes Verified Working

| From | Action | To | Status |
|------|--------|-----|--------|
| Home | START AI DETECTION | Demo | ✅ Working |
| Home | FEATURES | Features | ✅ Working |
| Home | CHECK AI STATUS | (API call) | ✅ Working |
| Features | TRY DEMO NOW | Demo | ✅ Working |
| Features | ← BACK TO HOME | Home | ✅ Working |
| Demo | ← BACK | Previous | ✅ Working |
| Demo | STOP | (stays) | ✅ Working |

---

## 🎨 Screen Hierarchy

```
App.js (NavigationContainer)
  └── Stack.Navigator
      ├── Home (HomeScreen.js)        [Initial Screen]
      ├── Features (FeaturesScreen.js)
      └── Demo (DemoScreen.js)
```

**All screens use:**
- Monochrome design (black/white/gray/red)
- Consistent typography
- Clear button labels
- PropJSer navigation prop

---

## 🚀 Testing Checklist

- [x] Home screen loads
- [x] All 3 buttons on Home visible
- [x] Button descriptions showing
- [x] Home → Features navigation works
- [x] Home → Demo navigation works
- [x] Features screen shows 4 features
- [x] Features → Demo button works
- [x] Features → Home button works
- [x] Demo screen opens camera
- [x] Demo → Back button works
- [x] All text is clear and descriptive
- [x] No broken navigation routes

**All navigation routes verified! ✅**
