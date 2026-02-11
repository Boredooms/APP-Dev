import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const HomeScreen = ({ navigation }) => {
    const { t } = useLanguage();
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

            <View style={styles.languageContainer}>
                <LanguageSwitcher />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{t.appTitle}</Text>
                <Text style={styles.subtitle}>
                    {t.appSubtitle}
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('IoTCheck')}
                    >
                        <Text style={styles.primaryButtonText}>{t.startDetection}</Text>
                        <Text style={styles.buttonSubtext}>{t.startDetectionDesc}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Features')}
                    >
                        <Text style={styles.secondaryButtonText}>{t.features}</Text>
                        <Text style={styles.buttonSubtext}>{t.featuresDesc}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleCheckStatus}
                    >
                        <Text style={styles.secondaryButtonText}>{t.checkStatus}</Text>
                        <Text style={styles.buttonSubtext}>{t.checkStatusDesc}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.footer}>{t.demoVersion}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    languageContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
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
