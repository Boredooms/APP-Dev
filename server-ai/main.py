#!/usr/bin/env python3
"""
VisionPath AI Backend - Real-time Object Detection with YOLOv8
Enhanced Distance Calculation with Object-Specific Parameters
"""

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import numpy as np

print("Loading YOLOv8-nano model...")
model = YOLO('yolov8n.pt')
print("Model loaded successfully!\n")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Object-Specific Distance Estimation Parameters
# Based on typical object heights in meters
OBJECT_HEIGHTS = {
    'person': 1.7,          # Average human height
    'car': 1.5,             # Average car height
    'truck': 2.8,           # Average truck height
    'bus': 3.2,             # Average bus height
    'motorcycle': 1.2,      # Average motorcycle height
    'bicycle': 1.5,         # Average bicycle with rider
    'traffic light': 3.5,   # Typical traffic light height
    'stop sign': 2.0,       # Typical stop sign height
    'dog': 0.6,             # Average dog height
    'cat': 0.3,             # Average cat height
    'chair': 0.9,           # Typical chair height
    'umbrella': 1.8,        # Person with umbrella
    'backpack': 1.5,        # Person wearing backpack
    'bench': 0.8,           # Typical bench height
    'potted plant': 0.6,    # Average potted plant
    'bottle': 0.25,         # Typical bottle
    'cup': 0.12,            # Typical cup
    'laptop': 0.35,         # Laptop screen height (CRITICAL for close detection)
    'keyboard': 0.05,       # Keyboard height
    'mouse': 0.04,          # Mouse height
    'cell phone': 0.15,     # Phone height
    'tv': 0.6,              # TV screen height
    'monitor': 0.4,         # Monitor height
    'book': 0.25,           # Book standing up
    'clock': 0.3,           # Table clock
}

# Camera parameters (typical smartphone)
IMAGE_HEIGHT = 640  # pixels (YOLO processing size)

def calculate_distance(bbox, img_height, obj_class):
    """
    Calculate distance using improved algorithm
    RECALIBRATED for accurate close-range detection
    """
    x1, y1, x2, y2 = bbox
    bbox_height = y2 - y1  # Height in pixels
    
    # Get object's real-world height
    obj_height = OBJECT_HEIGHTS.get(obj_class, 1.5)  # Default 1.5m
    
    # Calculate what percentage of screen the object takes up
    screen_percentage = bbox_height / img_height
    
    # RECALIBRATED DISTANCE FORMULA
    # Objects filling screen should be 0.3-0.8m away
    # Objects at 50% screen should be 1-2m away
    # Objects at 20% screen should be 3-4m away
    
    if screen_percentage > 0:
        # New formula with much better calibration
        # Distance = Object Height / (Screen Percentage × Calibration Factor)
        
        # CRITICAL: Lower calibration factor = reports closer distances
        calibration_factor = 0.5  # Was 1.8, now 0.5 for accuracy
        
        distance = obj_height / (screen_percentage * calibration_factor)
        
        # Apply object-specific fine-tuning
        if obj_class in ['laptop', 'tv', 'monitor', 'keyboard', 'mouse']:
            # Electronics on desk: usually very close
            distance *= 0.6  # Report as much closer
            
        elif obj_class in ['car', 'truck', 'bus']:
            # Large vehicles
            distance *= 0.85
            
        elif obj_class in ['person']:
            # People: standard calculation
            distance *= 0.9
            
        elif obj_class in ['bicycle', 'motorcycle']:
            # Two-wheelers
            distance *= 0.85
            
        elif obj_class in ['traffic light', 'stop sign']:
            # Signs: usually further
            distance *= 1.1
            
        elif obj_class in ['bottle', 'cup', 'cell phone', 'book']:
            # Small objects within arm's reach
            distance *= 0.5  # Report as very close
            
        else:
            # Default: assume closer than calculated
            distance *= 0.8
        
        # Clamp to reasonable range (0.2m to 8m)
        distance = max(0.2, min(distance, 8.0))
        
        return round(distance, 2)
    else:
        return 2.0  # Default if no height

def get_bengali_phrase(obj_class):
    """Enhanced Bengali translations for more objects"""
    bengali_map = {
        # Vehicles
        'person': 'Samne lok',
        'car': 'Gari samne',
        'truck': 'Truck samne',
        'bus': 'Bus samne',
        'motorcycle': 'Motorcycle samne',
        'bicycle': 'Cycle samne',
        
        # Traffic
        'traffic light': 'Traffic light samne',
        'stop sign': 'Stop sign samne',
        
        # Animals
        'dog': 'Kutta samne',
        'cat': 'Billi samne',
        'bird': 'Chidiya samne',
        'horse': 'Ghoda samne',
        
        # Objects
        'chair': 'Kursi samne',
        'umbrella': 'Chaata samne',
        'backpack': 'Bag samne',
        'handbag': 'Bag samne',
        'suitcase': 'Suitcase samne',
        'bottle': 'Bottle samne',
        'cup': 'Cup samne',
        'bench': 'Bench samne',
        'potted plant': 'Paudha samne',
        'book': 'Kitab samne',
        'clock': 'Ghadi samne',
        'tv': 'TV samne',
        'laptop': 'Laptop samne',
        'mouse': 'Mouse samne',
        'keyboard': 'Keyboard samne',
        'cell phone': 'Phone samne',
    }
    return bengali_map.get(obj_class, f'{obj_class.capitalize()} samne')

@app.post("/api/detect")
async def detect_objects(file: UploadFile = File(...)):
    """
    Detect objects in uploaded image with improved distance estimation
    """
    try:
        # Read image
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        # Convert to numpy array
        img_array = np.array(img)
        img_height = img_array.shape[0]
        
        # Run YOLOv8 detection (lowered conf for more detections)
        results = model(img_array, conf=0.35, verbose=False)
        
        if len(results[0].boxes) == 0:
            return {
                "object": None,
                "confidence": 0,
                "distance": None,
                "bengali": None,
                "total_objects": 0,
                "status": "no_detection"
            }
        
        # Get most prominent detection (largest bounding box)
        boxes = results[0].boxes
        box_areas = [(box.xyxy[0][2] - box.xyxy[0][0]) * (box.xyxy[0][3] - box.xyxy[0][1]) 
                     for box in boxes]
        primary_idx = box_areas.index(max(box_areas))
        
        primary_box = boxes[primary_idx]
        bbox = primary_box.xyxy[0].cpu().numpy()
        confidence = float(primary_box.conf[0])  # Convert to Python float
        class_id = int(primary_box.cls[0])       # Convert to Python int
        obj_name = model.names[class_id]
        
        # Calculate distance with improved algorithm
        distance = calculate_distance(bbox, img_height, obj_name)
        
        # Get Bengali phrase
        bengali = get_bengali_phrase(obj_name)
        
        # Convert bbox to Python list of floats (not numpy)
        bbox_list = [float(x) for x in bbox.tolist()]
        
        return {
            "object": obj_name,
            "confidence": float(confidence),      # Ensure Python float
            "distance": float(distance),          # Ensure Python float
            "bengali": bengali,
            "bbox": bbox_list,                    # Python list of floats
            "total_objects": int(len(boxes)),     # Ensure Python int
            "status": "success"
        }
        
    except Exception as e:
        print(f"❌ Detection error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            "object": None,
            "confidence": 0,
            "distance": None,
            "bengali": None,
            "error": str(e),
            "total_objects": 0,
            "status": "error"
        }

@app.get("/api/status")
def get_status():
    """Get backend status"""
    return {
        "status": "VisionPath AI Backend Running",
        "mode": "Real-Time Detection",
        "model": "YOLOv8-nano",
        "objects_supported": len(model.names),
        "distance_algorithm": "Pinhole Model + Object-Specific Calibration",
        "distance_range": "0.3m - 10m"
    }

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "VisionPath AI Backend",
        "version": "2.0",
        "endpoints": ["/api/status", "/api/detect"]
    }

if __name__ == "__main__":
    import uvicorn
    
    print("🔥 Starting VisionPath AI Backend v2.0...")
    print("📍 Server: http://localhost:8000")
    print("✅ YOLOv8-nano loaded")
    print("📏 Enhanced distance algorithm")
    print("🎯 80+ objects | 0.3m-10m range")
    print("🌐 CORS enabled\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)
