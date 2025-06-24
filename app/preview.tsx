import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Share } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Download, Share2, Instagram, MessageCircle, Settings } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import CulturalButton from '@/components/CulturalButton';
import { LinearGradient } from 'expo-linear-gradient';

export default function PreviewScreen() {
  const { continent, country, culture, event, imageUri, pose, outfit, filter, cultureColors } = useLocalSearchParams();
  const [customText, setCustomText] = useState('');
  const [occasion, setOccasion] = useState(event as string);
  const colors = cultureColors ? JSON.parse(cultureColors as string) : ['#8b5cf6', '#ec4899'];

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving image...');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my ${culture} styled photo for ${event}! Created with AfroSnap AI 🎨`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const navigateToProfile = () => {
    router.push('/(tabs)/profile');
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preview & Customize</Text>
          <TouchableOpacity onPress={navigateToProfile} style={styles.settingsButton}>
            <Settings color="#8b5cf6" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Preview Image */}
          <View style={styles.previewSection}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri as string }} style={styles.previewImage} />
              <LinearGradient
                colors={[...colors, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.imageOverlay}
              />
              <View style={styles.styleInfo}>
                <Text style={styles.styleText}>{culture} • {pose}</Text>
                <Text style={styles.outfitText}>{outfit}</Text>
              </View>
            </View>
          </View>

          {/* Style Summary */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Your Style Selection</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Culture</Text>
                <Text style={styles.summaryValue}>{culture}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Event</Text>
                <Text style={styles.summaryValue}>{event}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Pose</Text>
                <Text style={styles.summaryValue}>{pose}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Filter</Text>
                <Text style={styles.summaryValue}>{filter}</Text>
              </View>
            </View>
          </View>

          {/* Customization */}
          <View style={styles.customSection}>
            <Text style={styles.sectionTitle}>Add Personal Touch</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Custom Text (Optional)</Text>
              <TextInput
                style={styles.textInput}
                value={customText}
                onChangeText={setCustomText}
                placeholder="Add your name, date, or special message..."
                placeholderTextColor="#718096"
                multiline
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Occasion</Text>
              <TextInput
                style={styles.textInput}
                value={occasion}
                onChangeText={setOccasion}
                placeholder="Enter occasion..."
                placeholderTextColor="#718096"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Share Your Creation</Text>
            
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Instagram color="#E4405F" size={24} />
                <Text style={styles.socialText}>Instagram</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <MessageCircle color="#25D366" size={24} />
                <Text style={styles.socialText}>WhatsApp</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} onPress={handleShare}>
                <Share2 color="#1DA1F2" size={24} />
                <Text style={styles.socialText}>More</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.primaryActions}>
              <CulturalButton
                title="Save to Gallery"
                onPress={handleSave}
                variant="outline"
                style={styles.saveButton}
                size="large"
              />
              
              <CulturalButton
                title="Order Print"
                onPress={() => {}}
                size="large"
                style={styles.printButton}
              />
            </View>
          </View>

          {/* Create Another */}
          <View style={styles.createAnotherSection}>
            <Text style={styles.createAnotherTitle}>Love your style?</Text>
            <Text style={styles.createAnotherSubtitle}>
              Create more cultural looks or explore different traditions
            </Text>
            <CulturalButton
              title="Create Another Look"
              onPress={() => router.push('/continent')}
              variant="secondary"
              style={styles.createAnotherButton}
            />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  previewSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  previewImage: {
    width: 280,
    height: 280,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  styleInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  styleText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  outfitText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  summarySection: {
    marginBottom: 32,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#a0aec0',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  customSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionsSection: {
    marginBottom: 32,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
  },
  socialText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
    marginTop: 8,
  },
  primaryActions: {
    gap: 12,
  },
  saveButton: {
    marginBottom: 8,
  },
  printButton: {
    marginBottom: 0,
  },
  createAnotherSection: {
    alignItems: 'center',
    paddingBottom: 40,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 32,
  },
  createAnotherTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  createAnotherSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  createAnotherButton: {
    minWidth: 200,
  },
});