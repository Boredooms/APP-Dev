import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const FeaturesScreen = ({ navigation }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>HOW IT WORKS</Text>
                <Text style={styles.subtitle}>Tap sections to learn more</Text>

                {/* Section 1: IoT Headband Detection */}
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => toggleSection('iot')}
                    activeOpacity={0.8}
                >
                    <View style={styles.sectionHeader}>
                        <Text style={styles.featureTitle}>1. IOT HEADBAND DETECTION</Text>
                        <Text style={styles.expandIcon}>{expandedSection === 'iot' ? '−' : '+'}</Text>
                    </View>
                    <Text style={styles.featureText}>
                        Scans for VisionPath IoT headband device
                    </Text>

                    {expandedSection === 'iot' && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.expandedTitle}>✓ What Happens:</Text>
                            <Text style={styles.expandedText}>
                                • 2-second Bluetooth/WiFi scan on startup{'\n'}
                                • Checks for paired VisionPath headband{'\n'}
                                • Shows connection status (green/red indicator){'\n'}
                                • Displays device info (battery, signal)
                            </Text>

                            <Text style={styles.expandedTitle}>⚡ Fallback Logic:</Text>
                            <Text style={styles.expandedText}>
                                If headband NOT found:{'\n'}
                                → Modal popup: "Switching to mobile camera mode"{'\n'}
                                → Auto-redirects to phone camera (2.5s delay){'\n'}
                                → Detection continues without interruption
                            </Text>

                            <Text style={styles.statusBadge}>
                                STATUS: Simulated (30% connection rate for demo)
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Section 2: YOLOv8 Object Detection */}
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => toggleSection('yolo')}
                    activeOpacity={0.8}
                >
                    <View style={styles.sectionHeader}>
                        <Text style={styles.featureTitle}>2. YOLOV8-NANO AI DETECTION</Text>
                        <Text style={styles.expandIcon}>{expandedSection === 'yolo' ? '−' : '+'}</Text>
                    </View>
                    <Text style={styles.featureText}>
                        Real-time object detection with 80+ object classes
                    </Text>

                    {expandedSection === 'yolo' && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.expandedTitle}>🤖 AI Model:</Text>
                            <Text style={styles.expandedText}>
                                • Model: YOLOv8-nano (~6MB){'\n'}
                                • Backend: Python FastAPI (port 8000){'\n'}
                                • Inference time: 50-200ms per frame{'\n'}
                                • Confidence threshold: 50%
                            </Text>

                            <Text style={styles.expandedTitle}>📸 Detection Flow:</Text>
                            <Text style={styles.expandedText}>
                                1. Camera captures frame every 2 seconds{'\n'}
                                2. Image sent to AI backend via HTTP{'\n'}
                                3. YOLOv8 processes image{'\n'}
                                4. Returns: object name, confidence %, bounding box{'\n'}
                                5. Most prominent object displayed
                            </Text>

                            <Text style={styles.expandedTitle}>🎯 Detectable Objects:</Text>
                            <Text style={styles.expandedText}>
                                Vehicles: car, truck, bus, motorcycle, bicycle{'\n'}
                                People: person{'\n'}
                                Traffic: traffic light, stop sign{'\n'}
                                + 73 more COCO dataset objects
                            </Text>

                            <Text style={[styles.statusBadge, styles.statusWorking]}>
                                STATUS: ✓ FULLY WORKING
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Section 3: Distance Estimation */}
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => toggleSection('distance')}
                    activeOpacity={0.8}
                >
                    <View style={styles.sectionHeader}>
                        <Text style={styles.featureTitle}>3. DISTANCE CALCULATION</Text>
                        <Text style={styles.expandIcon}>{expandedSection === 'distance' ? '−' : '+'}</Text>
                    </View>
                    <Text style={styles.featureText}>
                        Estimates object distance from bounding box size
                    </Text>

                    {expandedSection === 'distance' && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.expandedTitle}>📐 Algorithm:</Text>
                            <Text style={styles.expandedText}>
                                Distance ≈ Inverse(Bounding Box Height){'\n\n'}
                                • Large box (70%+ screen) → 0.5-1.5m (close){'\n'}
                                • Medium box (40-70%) → 1.5-2.5m (medium){'\n'}
                                • Small box (20-40%) → 2.5-3.5m (far){'\n'}
                                • Tiny box (&lt;20%) → 3.5m+ (very far)
                            </Text>

                            <Text style={styles.expandedTitle}>⚠️ Danger Detection:</Text>
                            <Text style={styles.expandedText}>
                                If distance &lt; 1.5m:{'\n'}
                                → Red flashing border animation{'\n'}
                                → Distance bar turns RED{'\n'}
                                → Bengali voice alert triggers{'\n'}
                                → Visual warning: object name in RED
                            </Text>

                            <Text style={styles.expandedTitle}>🎨 Visual Indicators:</Text>
                            <Text style={styles.expandedText}>
                                Distance bar colors:{'\n'}
                                • RED: &lt;1.5m (danger zone){'\n'}
                                • WHITE: 1.5-3.0m (caution zone){'\n'}
                                • GRAY: &gt;3.0m (safe zone)
                            </Text>

                            <Text style={[styles.statusBadge, styles.statusWorking]}>
                                STATUS: ✓ FULLY WORKING
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Section 4: Bengali Voice Alerts */}
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => toggleSection('voice')}
                    activeOpacity={0.8}
                >
                    <View style={styles.sectionHeader}>
                        <Text style={styles.featureTitle}>4. BENGALI VOICE ALERTS</Text>
                        <Text style={styles.expandIcon}>{expandedSection === 'voice' ? '−' : '+'}</Text>
                    </View>
                    <Text style={styles.featureText}>
                        Real-time audio warnings in Bengali language
                    </Text>

                    {expandedSection === 'voice' && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.expandedTitle}>🔊 Voice System:</Text>
                            <Text style={styles.expandedText}>
                                • Engine: Expo Speech (hi-IN locale){'\n'}
                                • Trigger: Only when distance &lt; 1.5m{'\n'}
                                • Pitch: 1.0 (normal){'\n'}
                                • Rate: 0.9 (slightly slower for clarity)
                            </Text>

                            <Text style={styles.expandedTitle}>💬 Phrases:</Text>
                            <Text style={styles.expandedText}>
                                Cars: "Gari samne"{'\n'}
                                Trucks: "Truck samne"{'\n'}
                                Bus: "Bus samne"{'\n'}
                                Motorcycle: "Motorcycle samne"{'\n'}
                                Bicycle: "Cycle samne"{'\n'}
                                Person: "Samne lok"{'\n'}
                                Default: "[Object name] samne"
                            </Text>

                            <Text style={styles.expandedTitle}>⚡ Logic:</Text>
                            <Text style={styles.expandedText}>
                                1. Object detected + distance calculated{'\n'}
                                2. If distance &lt; 1.5m → fetch Bengali phrase{'\n'}
                                3. Expo Speech speaks phrase immediately{'\n'}
                                4. No repeat until next detection cycle (2s)
                            </Text>

                            <Text style={[styles.statusBadge, styles.statusWorking]}>
                                STATUS: ✓ FULLY WORKING
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Section 5: Camera Integration */}
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => toggleSection('camera')}
                    activeOpacity={0.8}
                >
                    <View style={styles.sectionHeader}>
                        <Text style={styles.featureTitle}>5. LIVE CAMERA PROCESSING</Text>
                        <Text style={styles.expandIcon}>{expandedSection === 'camera' ? '−' : '+'}</Text>
                    </View>
                    <Text style={styles.featureText}>
                        Real camera feed with overlay detection display
                    </Text>

                    {expandedSection === 'camera' && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.expandedTitle}>📷 Camera System:</Text>
                            <Text style={styles.expandedText}>
                                • Library: expo-camera{'\n'}
                                • Facing: Back camera (default){'\n'}
                                • Quality: 0.5 (optimized for upload speed){'\n'}
                                • Format: JPEG
                            </Text>

                            <Text style={styles.expandedTitle}>🔄 Processing Loop:</Text>
                            <Text style={styles.expandedText}>
                                Every 2 seconds:{'\n'}
                                1. takePictureAsync() captures frame{'\n'}
                                2. FormData created with image{'\n'}
                                3. POST to http://[IP]:8000/api/detect{'\n'}
                                4. Receive JSON: object, distance, confidence{'\n'}
                                5. Update UI with results{'\n'}
                                6. Trigger voice if danger detected
                            </Text>

                            <Text style={styles.expandedTitle}>🎨 UI Overlay:</Text>
                            <Text style={styles.expandedText}>
                                • Detection box: 280x280px with corner markers{'\n'}
                                • Object name: Large text at top{'\n'}
                                • Distance: 48px font in meters{'\n'}
                                • Confidence: Small text percentage{'\n'}
                                • "ANALYZING..." indicator during processing
                            </Text>

                            <Text style={[styles.statusBadge, styles.statusWorking]}>
                                STATUS: ✓ FULLY WORKING
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Action Buttons */}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.tryButton}
                        onPress={() => navigation.navigate('IoTCheck')}
                    >
                        <Text style={styles.tryButtonText}>TRY IT NOW →</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>← BACK TO HOME</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 3,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#666666',
        letterSpacing: 1,
        marginBottom: 30,
    },
    section: {
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#333333',
        padding: 15,
        backgroundColor: '#0A0A0A',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 1.5,
        flex: 1,
    },
    expandIcon: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginLeft: 10,
    },
    featureText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#888888',
        lineHeight: 18,
        letterSpacing: 0.5,
    },
    expandedContent: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#222222',
    },
    expandedTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 1,
        marginTop: 10,
        marginBottom: 5,
    },
    expandedText: {
        fontSize: 11,
        fontWeight: '400',
        color: '#AAAAAA',
        lineHeight: 18,
        letterSpacing: 0.3,
    },
    statusBadge: {
        marginTop: 15,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#333333',
        alignSelf: 'flex-start',
        fontSize: 10,
        fontWeight: '600',
        color: '#FFAA00',
        letterSpacing: 1,
    },
    statusWorking: {
        backgroundColor: '#003300',
        color: '#00FF00',
    },
    buttonGroup: {
        marginTop: 40,
        gap: 15,
    },
    tryButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        alignItems: 'center',
    },
    tryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 2,
    },
    backButton: {
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: '#888888',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#888888',
        letterSpacing: 2,
    },
});

export default FeaturesScreen;
