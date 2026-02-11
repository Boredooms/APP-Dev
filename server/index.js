const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Simulation objects and their Bengali phrases
const OBJECTS = [
  { name: 'Vehicle', bengali: 'Gari samne' },
  { name: 'Person', bengali: 'Samne lok' },
  { name: 'Pothole', bengali: 'Gat-tha' },
  { name: 'Pole', bengali: 'Samne khuti' }
];

// GET /api/status - Check AI status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'VisionPath AI Running',
    mode: 'Simulation',
    core: 'Connected'
  });
});

// GET /api/simulate - Get random object detection
app.get('/api/simulate', (req, res) => {
  // Random object
  const randomObject = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  
  // Random distance between 0.5m and 4.0m
  const distance = (Math.random() * 3.5 + 0.5).toFixed(1);
  
  res.json({
    object: randomObject.name,
    distance: parseFloat(distance),
    bengali: randomObject.bengali
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'VisionPath Backend Running',
    endpoints: ['/api/status', '/api/simulate']
  });
});

app.listen(PORT, () => {
  console.log(`\n🔥 VisionPath Backend Running`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`✅ Status: http://localhost:${PORT}/api/status`);
  console.log(`🎲 Simulate: http://localhost:${PORT}/api/simulate\n`);
});
