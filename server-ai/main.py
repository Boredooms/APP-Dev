from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from ultralytics import YOLO
import io
import numpy as np
import cv2

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv8 nano model (lightweight, ~6MB)
print("Loading YOLOv8-nano model...")
model = YOLO('yolov8n.pt')
print("Model loaded successfully!")

# Bengali translations for common objects
BENGALI_TRANSLATIONS = {
    'car': 'Gari samne',
    'truck': 'Truck samne',
    'bus': 'Bus samne',
    'motorcycle': 'Motorcycle samne',
    'bicycle': 'Cycle samne',
    'person': 'Samne lok',
    'pothole': 'Gat-tha',
    'traffic light': 'Signal samne',
    'stop sign': 'Stop sign samne',
}

def estimate_distance(bbox_height, image_height):
    """
    Estimate distance based on bounding box size
    Larger boxes = closer objects
    This is a simplified estimation for demo purposes
    """
    # Normalize bbox height (0-1)
    normalized_height = bbox_height / image_height
    
    # Simple inverse relationship
    # If bbox takes up full height (1.0) -> ~0.5m away
    # If bbox is very small (0.1) -> ~4.0m away
    if normalized_height > 0.7:
        distance = 0.5 + (1 - normalized_height) * 2
    elif normalized_height > 0.4:
        distance = 1.5 + (0.7 - normalized_height) * 3
    elif normalized_height > 0.2:
        distance = 2.5 + (0.4 - normalized_height) * 4
    else:
        distance = 3.5 + (0.2 - normalized_height) * 2
    
    return round(distance, 1)

@app.get("/")
async def root():
    return {
        "message": "VisionPath AI Backend Running",
        "model": "YOLOv8-nano",
        "endpoints": ["/api/status", "/api/detect"]
    }

@app.get("/api/status")
async def status():
    return {
        "status": "VisionPath AI Running",
        "mode": "Real-Time Detection",
        "model": "YOLOv8-nano",
        "core": "Connected"
    }

@app.post("/api/detect")
async def detect_objects(file: UploadFile = File(...)):
    """
    Receive image from mobile app and return object detection results
    """
    try:
        # Read image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to numpy array for YOLO
        image_np = np.array(image)
        
        # Run detection
        results = model(image_np, verbose=False)
        
        # Get detections
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get class name and confidence
                class_id = int(box.cls[0])
                class_name = model.names[class_id]
                confidence = float(box.conf[0])
                
                # Get bounding box
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                bbox_height = y2 - y1
                
                # Only include high-confidence detections
                if confidence > 0.5:
                    detections.append({
                        'object': class_name,
                        'confidence': round(confidence, 2),
                        'bbox': {
                            'x1': int(x1), 'y1': int(y1),
                            'x2': int(x2), 'y2': int(y2)
                        },
                        'bbox_height': int(bbox_height)
                    })
        
        if not detections:
            return {
                "object": None,
                "distance": None,
                "bengali": None,
                "confidence": 0,
                "message": "No objects detected"
            }
        
        # Get the most prominent detection (largest bbox)
        primary_detection = max(detections, key=lambda d: d['bbox_height'])
        
        # Estimate distance
        image_height = image_np.shape[0]
        distance = estimate_distance(primary_detection['bbox_height'], image_height)
        
        # Get Bengali translation
        object_name = primary_detection['object']
        bengali = BENGALI_TRANSLATIONS.get(object_name.lower(), f"{object_name} samne")
        
        return {
            "object": object_name.capitalize(),
            "distance": distance,
            "bengali": bengali,
            "confidence": primary_detection['confidence'],
            "all_detections": len(detections)
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "object": None,
            "distance": None,
            "bengali": None
        }

if __name__ == "__main__":
    import uvicorn
    print("\n🔥 Starting VisionPath AI Backend...")
    print("📍 Server will run on: http://localhost:8000")
    print("✅ Real-time object detection with YOLOv8-nano\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)
