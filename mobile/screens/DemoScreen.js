import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Speech from 'expo-speech';

const DemoScreen = ({ navigation }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [isRunning, setIsRunning] = useState(false);
    const [detectionData, setDetectionData] = useState(null);
    const [isDanger, setIsDanger] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const flashAnim = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef(null);
    const cameraRef = useRef(null);

    // Trigger danger animation
    useEffect(() => {
        if (isDanger) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(flashAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                    Animated.timing(flashAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        } else {
            flashAnim.setValue(0);
        }
    }, [isDanger]);

    // Capture frame and send to AI backend
    const detectObjects = async () => {
        if (!cameraRef.current || isProcessing) return;

        try {
            setIsProcessing(true);

            // Take picture
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.5, // Lower quality for faster upload
                base64: false,
            });

            // Create form data
            const formData = new FormData();
            formData.append('file', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });

            // Send to AI backend
            const response = await fetch('http://172.18.234.189:8000/api/detect', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();

            if (data.object) {
                setDetectionData(data);

                // Check if danger (distance < 1.5m)
                const dangerDetected = data.distance && data.distance < 1.5;
                setIsDanger(dangerDetected);

                // Speak Bengali alert if danger
                if (dangerDetected && data.bengali) {
                    Speech.speak(data.bengali, {
                        language: 'hi-IN',
                        pitch: 1.0,
                        rate: 0.9,
                    });
                }
            } else {
                // No detection
                setDetectionData({
                    object: 'Scanning',
                    distance: null,
                });
                setIsDanger(false);
            }

        } catch (error) {
            console.error('Detection error:', error);
            Alert.alert('Connection Error', 'Cannot connect to AI backend. Make sure Python server is running on port 8000.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Start detection loop
    const startDetection = async () => {
        if (!permission?.granted) {
            const result = await requestPermission();
            if (!result.granted) {
                Alert.alert('Camera Permission', 'Camera access is required for object detection');
                return;
            }
        }

        setIsRunning(true);

        // Run detection every 2 seconds
        intervalRef.current = setInterval(() => {
            detectObjects();
        }, 2000);

        // Immediate first detection
        setTimeout(() => detectObjects(), 500);
    };

    // Stop detection
    const stopDetection = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setDetectionData(null);
        setIsDanger(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const borderColor = flashAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#000000', '#FF0000'],
    });

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading camera...</Text>
            </View>
        );
    }

    return (
        <Animated.View
            style={[
                styles.container,
                { borderColor, borderWidth: isDanger ? 8 : 0 },
            ]}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    stopDetection();
                    navigation.goBack();
                }}>
                    <Text style={styles.backText}>← BACK</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>LIVE AI DETECTION</Text>
            </View>

            <View style={styles.cameraContainer}>
                {isRunning ? (
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing="back"
                    >
                        {/* Detection overlay box */}
                        <View style={styles.overlay}>
                            <View style={[styles.detectionBox, isDanger && styles.dangerBox]}>
                                {/* Corner markers */}
                                <View style={[styles.corner, styles.topLeft]} />
                                <View style={[styles.corner, styles.topRight]} />
                                <View style={[styles.corner, styles.bottomLeft]} />
                                <View style={[styles.corner, styles.bottomRight]} />

                                {/* Processing indicator */}
                                {isProcessing && (
                                    <View style={styles.processingIndicator}>
                                        <Text style={styles.processingText}>ANALYZING...</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </CameraView>
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>AI READY</Text>
                        <Text style={styles.placeholderSubtext}>YOLOv8 Object Detection</Text>
                        <Text style={styles.placeholderSubtext}>Press Start to activate</Text>
                    </View>
                )}
            </View>

            {/* Detection Info */}
            {detectionData && (
                <View style={styles.infoSection}>
                    <Text style={[styles.objectText, isDanger && styles.dangerText]}>
                        {detectionData.object?.toUpperCase() || 'SCANNING...'}
                    </Text>
                    {detectionData.distance && (
                        <Text style={styles.distanceText}>
                            {detectionData.distance.toFixed(1)}m
                        </Text>
                    )}
                    {detectionData.confidence && (
                        <Text style={styles.confidenceText}>
                            {Math.round(detectionData.confidence * 100)}% confident
                        </Text>
                    )}
                </View>
            )}

            {/* Distance Bar */}
            {detectionData && detectionData.distance && (
                <View style={styles.distanceSection}>
                    <Text style={styles.distanceLabel}>DISTANCE</Text>
                    <View style={styles.barBackground}>
                        <View
                            style={[
                                styles.barFill,
                                {
                                    width: `${Math.min((detectionData.distance / 4) * 100, 100)}%`,
                                    backgroundColor: detectionData.distance < 1.5 ? '#FF0000' :
                                        detectionData.distance < 3.0 ? '#FFFFFF' : '#888888',
                                },
                            ]}
                        />
                    </View>
                </View>
            )}

            <View style={styles.controls}>
                {!isRunning ? (
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={startDetection}
                    >
                        <Text style={styles.startButtonText}>START AI DETECTION</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.stopButton}
                        onPress={stopDetection}
                    >
                        <Text style={styles.stopButtonText}>STOP</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.helpText}>
                    {isRunning ? 'Real-time detection every 2 seconds' : 'Powered by YOLOv8-nano'}
                </Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    backText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#888888',
        letterSpacing: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    cameraContainer: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#444444',
        letterSpacing: 2,
    },
    placeholderSubtext: {
        fontSize: 12,
        fontWeight: '400',
        color: '#333333',
        letterSpacing: 1,
        marginTop: 10,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detectionBox: {
        width: 280,
        height: 280,
        borderWidth: 2,
        borderColor: '#888888',
        backgroundColor: 'transparent',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dangerBox: {
        borderColor: '#FF0000',
        borderWidth: 3,
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: '#FFFFFF',
    },
    topLeft: {
        top: -2,
        left: -2,
        borderTopWidth: 3,
        borderLeftWidth: 3,
    },
    topRight: {
        top: -2,
        right: -2,
        borderTopWidth: 3,
        borderRightWidth: 3,
    },
    bottomLeft: {
        bottom: -2,
        left: -2,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
    },
    bottomRight: {
        bottom: -2,
        right: -2,
        borderBottomWidth: 3,
        borderRightWidth: 3,
    },
    processingIndicator: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
    },
    processingText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1,
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#888888',
        fontSize: 16,
    },
    infoSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    objectText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    dangerText: {
        color: '#FF0000',
    },
    distanceText: {
        fontSize: 48,
        fontWeight: '900',
        color: '#888888',
        marginTop: 10,
        letterSpacing: 1,
    },
    confidenceText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#666666',
        marginTop: 5,
        letterSpacing: 1,
    },
    distanceSection: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    distanceLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888888',
        letterSpacing: 2,
        marginBottom: 8,
    },
    barBackground: {
        width: '100%',
        height: 8,
        backgroundColor: '#222222',
        borderRadius: 4,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 4,
    },
    controls: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    startButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 2,
    },
    stopButton: {
        backgroundColor: 'transparent',
        paddingVertical: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FF0000',
    },
    stopButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF0000',
        letterSpacing: 2,
    },
    helpText: {
        fontSize: 10,
        fontWeight: '400',
        color: '#444444',
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 15,
    },
});

export default DemoScreen;
