import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const handleCheckStatus = async () => {
        try {
            // Local IP for testing on device (run 'ipconfig' to find yours)
            const response = await fetch('http://172.18.234.189:5000/api/status');
            const data = await response.json();
            alert(`${data.status}\nMode: ${data.mode}\nCore: ${data.core}`);
        } catch (error) {
            alert('Cannot connect to backend.\nMake sure server is running on port 5000.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <View style={styles.content}>
                <Text style={styles.title}>VISIONPATH</Text>
                <Text style={styles.subtitle}>
                    AI THIRD EYE FOR{'\n'}INDEPENDENT NAVIGATION
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Demo')}
                    >
                        <Text style={styles.primaryButtonText}>START AI DETECTION</Text>
                        <Text style={styles.buttonSubtext}>Open camera & detect objects</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Features')}
                    >
                        <Text style={styles.secondaryButtonText}>FEATURES</Text>
                        <Text style={styles.buttonSubtext}>Learn how it works</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleCheckStatus}
                    >
                        <Text style={styles.secondaryButtonText}>CHECK AI STATUS</Text>
                        <Text style={styles.buttonSubtext}>Test backend connection</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.footer}>DEMO VERSION</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 4,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#888888',
        letterSpacing: 2,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 60,
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    primaryButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 30,
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
    buttonSubtext: {
        fontSize: 10,
        fontWeight: '400',
        color: '#666666',
        letterSpacing: 1,
        marginTop: 5,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 18,
        paddingHorizontal: 30,
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
    footer: {
        fontSize: 10,
        fontWeight: '600',
        color: '#333333',
        letterSpacing: 3,
        textAlign: 'center',
        paddingBottom: 30,
    },
});

export default HomeScreen;
