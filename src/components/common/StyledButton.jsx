import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import officialColors from '../../style/colors';

const StyledButton = (props) => {
    const containerStyle = [
        styles.container,
        props.variant === 'blue' ? styles.blue : styles.green,
        props.filled ? styles.filled : styles.transparent,
        props.disabled && styles.disabled,
        props.style, // Additional styles from props
    ];

    const textStyle = [
        styles.text,
        props.filled && styles.filledText,
        props.variant === 'blue' ? styles.blueText : styles.filledText,
    ];

    return (
        <TouchableOpacity
            disabled={props.disabled}
            style={containerStyle}
            onPress={props.onPress}
        >
            <Text style={textStyle}>{props.title || props.children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 2,
        paddingVertical: 11,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blue: {
        borderColor: 'blue', // Replace with your desired color
    },
    green: {
        borderColor: officialColors.darkGreen, // Replace with your desired color
    },
    filled: {
        backgroundColor: officialColors.green, // Replace with your desired color
    },
    transparent: {
        backgroundColor: 'transparent',
    },
    disabled: {
        backgroundColor: 'gray',
        borderColor: 'gray',
    },
    text: {
        fontSize: 16,
        color: 'black', // Default text color
    },
    filledText: {
        color: 'white', // Text color when filled
    },
    blueText: {
        color: 'blue', // Text color for the blue variant
    },
    greenText: {
        color: 'green', // Text color for the green variant
    },
});

export default StyledButton;
