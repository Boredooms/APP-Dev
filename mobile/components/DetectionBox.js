import React from 'react';
import { View, StyleSheet } from 'react-native';

const DetectionBox = ({ isDanger }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.box, isDanger && styles.dangerBox]} />
            {/* Corner markers */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    box: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#888888',
        backgroundColor: 'transparent',
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
});

export default DetectionBox;
