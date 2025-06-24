import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import GradientBackground from '@/components/GradientBackground';
import CulturalButton from '@/components/CulturalButton';
import { Sparkles, Camera, Palette } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/continent');
  };

  return (
    <GradientBackground colors={['#0f0f23', '#1a1a2e', '#16213e', '#8b5cf6']}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo and Brand */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Camera color="#ffffff" size={40} />
            </View>
            <Text style={styles.appName}>AfroSnap AI</Text>
            <Text style={styles.tagline}>Celebrate Your Culture Through AI</Text>
          </View>

          {/* Feature Icons */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Sparkles color="#8b5cf6" size={24} />
              <Text style={styles.featureText}>AI-Powered</Text>
            </View>
            <View style={styles.featureItem}>
              <Palette color="#ec4899" size={24} />
              <Text style={styles.featureText}>Cultural Styling</Text>
            </View>
            <View style={styles.featureItem}>
              <Camera color="#3b82f6" size={24} />
              <Text style={styles.featureText}>Event Ready</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>Transform Your Photos with{'\n'}Cultural Authenticity</Text>
            <Text style={styles.description}>
              Upload your photo, choose your cultural inspiration, and let AI create stunning, 
              event-ready images that honor your heritage.
            </Text>
          </View>

          {/* CTA Button */}
          <View style={styles.buttonContainer}>
            <CulturalButton
              title="Get Started Free"
              onPress={handleGetStarted}
              size="large"
              style={styles.ctaButton}
            />
            <Text style={styles.freeText}>No credit card required</Text>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#a0aec0',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
    marginTop: 8,
    textAlign: 'center',
  },
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.85,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ctaButton: {
    width: '100%',
    marginBottom: 12,
  },
  freeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
});