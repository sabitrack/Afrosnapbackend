import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Sparkles, TrendingUp, Globe, Users } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import CulturalButton from '@/components/CulturalButton';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const featuredCultures = [
  {
    name: 'Nigerian Yoruba',
    image: 'https://images.pexels.com/photos/5384575/pexels-photo-5384575.jpeg',
    users: '12.5K',
    trend: '+25%'
  },
  {
    name: 'Japanese Kimono',
    image: 'https://images.pexels.com/photos/1181412/pexels-photo-1181412.jpeg',
    users: '8.2K',
    trend: '+18%'
  },
  {
    name: 'Indian Traditional',
    image: 'https://images.pexels.com/photos/3608281/pexels-photo-3608281.jpeg',
    users: '15.7K',
    trend: '+32%'
  }
];

const recentCreations = [
  'https://images.pexels.com/photos/5384575/pexels-photo-5384575.jpeg',
  'https://images.pexels.com/photos/6069125/pexels-photo-6069125.jpeg',
  'https://images.pexels.com/photos/7968043/pexels-photo-7968043.jpeg',
  'https://images.pexels.com/photos/3608281/pexels-photo-3608281.jpeg',
];

export default function CreateTab() {
  const handleStartCreating = () => {
    router.push('/continent');
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Ready to create?</Text>
              <Text style={styles.subGreeting}>Transform your photos with cultural authenticity</Text>
            </View>
            <View style={styles.logoContainer}>
              <Sparkles color="#8b5cf6" size={28} />
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users color="#8b5cf6" size={20} />
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Users</Text>
            </View>
            <View style={styles.statItem}>
              <Globe color="#ec4899" size={20} />
              <Text style={styles.statNumber}>25+</Text>
              <Text style={styles.statLabel}>Cultures</Text>
            </View>
            <View style={styles.statItem}>
              <TrendingUp color="#3b82f6" size={20} />
              <Text style={styles.statNumber}>100K+</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
          </View>

          {/* Main CTA */}
          <View style={styles.ctaSection}>
            <CulturalButton
              title="Start Creating Now"
              onPress={handleStartCreating}
              size="large"
              style={styles.ctaButton}
            />
            <Text style={styles.ctaSubtext}>Choose your culture and transform your photos</Text>
          </View>

          {/* Featured Cultures */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Cultures</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {featuredCultures.map((culture, index) => (
                <TouchableOpacity key={index} style={styles.cultureCard}>
                  <Image source={{ uri: culture.image }} style={styles.cultureImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cultureGradient}
                  />
                  <View style={styles.cultureInfo}>
                    <Text style={styles.cultureName}>{culture.name}</Text>
                    <View style={styles.cultureStats}>
                      <Text style={styles.cultureUsers}>{culture.users} users</Text>
                      <Text style={styles.cultureTrend}>{culture.trend}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recent Community Creations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Community Creations</Text>
            <Text style={styles.sectionSubtitle}>See what others are creating</Text>
            <View style={styles.creationsGrid}>
              {recentCreations.map((image, index) => (
                <TouchableOpacity key={index} style={styles.creationItem}>
                  <Image source={{ uri: image }} style={styles.creationImage} />
                  <View style={styles.creationOverlay}>
                    <View style={styles.heartContainer}>
                      <Text style={styles.heartIcon}>❤️</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <View style={styles.stepsContainer}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepTitle}>Choose Culture</Text>
                <Text style={styles.stepDescription}>Select from global traditions</Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepTitle}>Upload Photo</Text>
                <Text style={styles.stepDescription}>Add your portrait photo</Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepTitle}>AI Magic</Text>
                <Text style={styles.stepDescription}>Get styled instantly</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  subGreeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    marginTop: 4,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    marginTop: 4,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  ctaButton: {
    width: '100%',
    marginBottom: 12,
  },
  ctaSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    marginBottom: 16,
  },
  horizontalScroll: {
    marginHorizontal: -12,
  },
  cultureCard: {
    width: 140,
    height: 180,
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cultureImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cultureGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  cultureInfo: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  cultureName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cultureStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cultureUsers: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
  },
  cultureTrend: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  creationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  creationItem: {
    width: (width - 64) / 2,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  creationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  creationOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  heartContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
  },
  heartIcon: {
    fontSize: 12,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  stepTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
  },
});