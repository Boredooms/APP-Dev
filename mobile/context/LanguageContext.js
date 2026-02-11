import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../locales/en';
import bn from '../locales/bn';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [translations, setTranslations] = useState(en);

    // Load saved language preference on mount
    useEffect(() => {
        loadLanguagePreference();
    }, []);

    const loadLanguagePreference = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('@language');
            if (savedLanguage) {
                changeLanguage(savedLanguage);
            }
        } catch (error) {
            console.log('Error loading language preference:', error);
        }
    };

    const changeLanguage = async (lang) => {
        try {
            setCurrentLanguage(lang);
            setTranslations(lang === 'bn' ? bn : en);
            await AsyncStorage.setItem('@language', lang);
        } catch (error) {
            console.log('Error saving language preference:', error);
        }
    };

    const value = {
        currentLanguage,
        translations,
        changeLanguage,
        t: translations, // Shorthand for translations
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
