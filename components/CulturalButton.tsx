import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CulturalButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function CulturalButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  style,
  disabled = false,
  size = 'medium'
}: CulturalButtonProps) {
  const getButtonStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={[styles.container, getButtonStyle(), style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={disabled ? ['#4a5568', '#2d3748'] : ['#8b5cf6', '#ec4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={[styles.text, getTextStyle(), disabled && styles.disabledText]}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          getButtonStyle(),
          styles.outlineButton,
          style,
          disabled && styles.disabledOutline
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.text, 
          getTextStyle(), 
          styles.outlineText,
          disabled && styles.disabledText
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getButtonStyle(),
        styles.secondaryButton,
        style,
        disabled && styles.disabledSecondary
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text, 
        getTextStyle(), 
        styles.secondaryText,
        disabled && styles.disabledText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
  },
  smallButton: {
    minHeight: 40,
  },
  mediumButton: {
    minHeight: 50,
  },
  largeButton: {
    minHeight: 56,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#2d3748',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#8b5cf6',
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryText: {
    color: '#e2e8f0',
  },
  outlineText: {
    color: '#8b5cf6',
  },
  disabledText: {
    color: '#718096',
  },
  disabledSecondary: {
    backgroundColor: '#1a202c',
  },
  disabledOutline: {
    borderColor: '#4a5568',
  },
});