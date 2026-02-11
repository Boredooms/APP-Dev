import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const FeaturesScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>FEATURES</Text>

                <View style={styles.section}>
                    <Text style={styles.featureTitle}>OFFLINE EDGE INTELLIGENCE</Text>
                    <Text style={styles.featureText}>
                        All AI processing runs locally on device. No internet required. No cloud dependency. Complete privacy.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.featureTitle}>SENSOR FUSION CONCEPT</Text>
                    <Text style={styles.featureText}>
                        Combines camera vision, distance sensors, and spatial mapping to build a real-time hazard detection system.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.featureTitle}>BENGALI VOICE ALERTS</Text>
                    <Text style={styles.featureText}>
                        Context-aware audio guidance in Bengali designed specifically for users in West Bengal. Clear, instant warnings.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.featureTitle}>REAL-TIME OBJECT DETECTION</Text>
                    <Text style={styles.featureText}>
                        Uses YOLOv8-nano AI model to detect 80+ objects including vehicles, people, traffic signs, and obstacles in real-time.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.featureTitle}>BENGALI VOICE ALERTS</Text>
                    <Text style={styles.featureText}>
                        Context-aware audio guidance in Bengali. Speaks object names and warnings like "Gari samne" (Car ahead) instantly.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.featureTitle}>DISTANCE ESTIMATION</Text>
                    <Text style={styles.featureText}>
                        Calculates approximate distance to detected objects. Visual warnings when objects are closer than 1.5 meters.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.featureTitle}>CAMERA-BASED AI</Text>
                    <Text style={styles.featureText}>
                        Captures frames every 2 seconds, processes with AI backend, displays results with confidence scores. Works on any smartphone.
                    </Text>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.tryButton}
                        onPress={() => navigation.navigate('Demo')}
                    >
                        <Text style={styles.tryButtonText}>TRY DEMO NOW →</Text>
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
        marginBottom: 40,
    },
    section: {
        marginBottom: 35,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    featureText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#888888',
        lineHeight: 22,
        letterSpacing: 0.5,
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
