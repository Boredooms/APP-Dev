import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Animated,
} from 'react-native';

const IoTCheckScreen = ({ navigation }) => {
    const [isChecking, setIsChecking] = useState(true);
    const [iotConnected, setIotConnected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const fadeAnim = useState(new Animated.Value(0))[0];

    // Check for IoT headband connection
    useEffect(() => {
        checkIoTConnection();
    }, []);

    const checkIoTConnection = async () => {
        setIsChecking(true);

        // Simulate IoT headband detection
        // In production, this would check Bluetooth/WiFi for actual device
        await new Promise(resolve => setTimeout(resolve, 2000));

        // For demo: randomly decide if IoT is connected
        // In production: replace with actual Bluetooth LE scan
        const isConnected = Math.random() > 0.7; // 30% chance of being connected

        setIotConnected(isConnected);
        setIsChecking(false);

        if (!isConnected) {
            // Show modal popup
            setModalMessage('IoT headband not detected.\nSwitching to mobile camera mode...');
            setShowModal(true);

            // Auto-dismiss after 2 seconds and proceed
            setTimeout(() => {
                setShowModal(false);
                // Navigate to mobile camera detection
                navigation.navigate('Demo');
            }, 2500);
        }
    };

    const handleManualCameraMode = () => {
        setShowModal(false);
        navigation.navigate('Demo');
    };

    const handleIoTMode = () => {
        // Navigate to IoT-based detection (future implementation)
        // For now, just show a message
        setModalMessage('IoT headband mode activated!\nProceeding with headband camera...');
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
            navigation.navigate('Demo'); // Can create separate IoTDemo screen later
        }, 2000);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← BACK</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>IOT DEVICE</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Text style={styles.title}>HEADBAND DETECTION</Text>

                {isChecking ? (
                    <View style={styles.checkingContainer}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                        <Text style={styles.checkingText}>Scanning for IoT headband...</Text>
                        <Text style={styles.checkingSubtext}>Searching Bluetooth devices</Text>
                    </View>
                ) : (
                    <View style={styles.statusContainer}>
                        <View style={[
                            styles.statusIndicator,
                            iotConnected ? styles.statusConnected : styles.statusDisconnected
                        ]}>
                            <Text style={styles.statusText}>
                                {iotConnected ? '●' : '○'}
                            </Text>
                        </View>

                        <Text style={[
                            styles.statusLabel,
                            iotConnected ? styles.connectedText : styles.disconnectedText
                        ]}>
                            {iotConnected ? 'HEADBAND CONNECTED' : 'HEADBAND NOT FOUND'}
                        </Text>

                        <Text style={styles.deviceInfo}>
                            {iotConnected
                                ? 'VisionPath IoT Headband v1.0\nBattery: 87% • Signal: Strong'
                                : 'No IoT device detected nearby\nWill use mobile camera instead'
                            }
                        </Text>

                        {/* Action Buttons */}
                        <View style={styles.buttonGroup}>
                            {iotConnected ? (
                                <>
                                    <TouchableOpacity
                                        style={styles.primaryButton}
                                        onPress={handleIoTMode}
                                    >
                                        <Text style={styles.primaryButtonText}>USE HEADBAND CAMERA</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.secondaryButton}
                                        onPress={handleManualCameraMode}
                                    >
                                        <Text style={styles.secondaryButtonText}>USE MOBILE CAMERA</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={styles.primaryButton}
                                        onPress={handleManualCameraMode}
                                    >
                                        <Text style={styles.primaryButtonText}>CONTINUE WITH MOBILE</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.secondaryButton}
                                        onPress={checkIoTConnection}
                                    >
                                        <Text style={styles.secondaryButtonText}>SCAN AGAIN</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                )}
            </View>

            {/* Modal Popup */}
            <Modal
                transparent={true}
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIcon}>
                            <Text style={styles.modalIconText}>⚡</Text>
                        </View>
                        <Text style={styles.modalTitle}>MODE SWITCH</Text>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>

                        <ActivityIndicator
                            size="small"
                            color="#FFFFFF"
                            style={styles.modalLoader}
                        />
                    </View>
                </View>
            </Modal>
        </View>
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
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 3,
        textAlign: 'center',
        marginBottom: 50,
    },
    checkingContainer: {
        alignItems: 'center',
        gap: 20,
    },
    checkingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 1,
        marginTop: 10,
    },
    checkingSubtext: {
        fontSize: 12,
        fontWeight: '400',
        color: '#666666',
        letterSpacing: 1,
    },
    statusContainer: {
        alignItems: 'center',
    },
    statusIndicator: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 3,
    },
    statusConnected: {
        borderColor: '#00FF00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
    },
    statusDisconnected: {
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    statusText: {
        fontSize: 48,
        fontWeight: '900',
    },
    statusLabel: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 15,
    },
    connectedText: {
        color: '#00FF00',
    },
    disconnectedText: {
        color: '#FF0000',
    },
    deviceInfo: {
        fontSize: 12,
        fontWeight: '400',
        color: '#888888',
        letterSpacing: 0.5,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 50,
    },
    buttonGroup: {
        width: '100%',
        gap: 15,
    },
    primaryButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 2,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#888888',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#888888',
        letterSpacing: 2,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#111111',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        padding: 40,
        width: '80%',
        alignItems: 'center',
    },
    modalIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalIconText: {
        fontSize: 32,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 3,
        marginBottom: 15,
    },
    modalMessage: {
        fontSize: 14,
        fontWeight: '400',
        color: '#888888',
        letterSpacing: 1,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    modalLoader: {
        marginTop: 10,
    },
});

export default IoTCheckScreen;
