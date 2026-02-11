import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const DistanceBar = ({ distance }) => {
    // Color logic based on distance
    const getColor = () => {
        if (distance < 1.5) return '#FF0000'; // Red (danger)
        if (distance < 3.0) return '#FFFFFF'; // White (warning)
        return '#888888'; // Gray (safe)
    };

    // Calculate width percentage (max 4m = 100%)
    const widthPercentage = Math.min((distance / 4) * 100, 100);

    return (
        <View style={styles.container}>
            <View style={styles.barBackground}>
                <Animated.View
                    style={[
                        styles.barFill,
                        {
                            width: `${widthPercentage}%`,
                            backgroundColor: getColor(),
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
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
});

export default DistanceBar;
