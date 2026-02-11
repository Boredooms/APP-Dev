import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertBox = ({ object, distance, isDanger }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.objectText, isDanger && styles.dangerText]}>
                {object || 'Scanning...'}
            </Text>
            <Text style={styles.distanceText}>
                {distance ? `${distance.toFixed(1)}m` : '--'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    objectText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 2,
        textTransform: 'uppercase',
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
});

export default AlertBox;
