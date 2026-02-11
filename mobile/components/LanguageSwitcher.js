import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { currentLanguage, changeLanguage, t } = useLanguage();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{t.language}</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[
                        styles.languageButton,
                        currentLanguage === 'en' && styles.activeButton
                    ]}
                    onPress={() => changeLanguage('en')}
                >
                    <Text style={[
                        styles.buttonText,
                        currentLanguage === 'en' && styles.activeText
                    ]}>
                        EN
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.languageButton,
                        currentLanguage === 'bn' && styles.activeButton
                    ]}
                    onPress={() => changeLanguage('bn')}
                >
                    <Text style={[
                        styles.buttonText,
                        currentLanguage === 'bn' && styles.activeText
                    ]}>
                        বাং
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888888',
        letterSpacing: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    languageButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#444444',
        backgroundColor: 'transparent',
    },
    activeButton: {
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#888888',
        letterSpacing: 1,
    },
    activeText: {
        color: '#000000',
    },
});

export default LanguageSwitcher;
