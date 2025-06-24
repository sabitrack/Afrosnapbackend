import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Shuffle, Sparkles, Wand as Wand2, Palette, Quote, RefreshCw } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import CulturalButton from '@/components/CulturalButton';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const poses = [
  { 
    id: 1, 
    name: 'Graceful Hands', 
    image: 'https://images.pexels.com/photos/5384575/pexels-photo-5384575.jpeg',
    description: 'Traditional hand positioning with cultural elegance',
    difficulty: 'Easy'
  },
  { 
    id: 2, 
    name: 'Bold Stance', 
    image: 'https://images.pexels.com/photos/6069125/pexels-photo-6069125.jpeg',
    description: 'Confident posture showcasing cultural pride',
    difficulty: 'Medium'
  },
  { 
    id: 3, 
    name: 'Cultural Pride', 
    image: 'https://images.pexels.com/photos/7968043/pexels-photo-7968043.jpeg',
    description: 'Regal positioning with traditional significance',
    difficulty: 'Advanced'
  },
  { 
    id: 4, 
    name: 'Ceremonial Pose', 
    image: 'https://images.pexels.com/photos/3608281/pexels-photo-3608281.jpeg',
    description: 'Formal stance for special occasions',
    difficulty: 'Medium'
  },
];

const outfits = [
  { 
    id: 1, 
    name: 'Agbada Deluxe', 
    image: 'https://images.pexels.com/photos/5384575/pexels-photo-5384575.jpeg',
    description: 'Premium traditional flowing robe with intricate embroidery',
    occasion: 'Formal Events',
    popularity: 95
  },
  { 
    id: 2, 
    name: 'Modern Traditional', 
    image: 'https://images.pexels.com/photos/3608281/pexels-photo-3608281.jpeg',
    description: 'Contemporary styling with traditional elements',
    occasion: 'Casual & Semi-formal',
    popularity: 88
  },
  { 
    id: 3, 
    name: 'Festival Ready', 
    image: 'https://images.pexels.com/photos/4040717/pexels-photo-4040717.jpeg',
    description: 'Vibrant colors and patterns for celebrations',
    occasion: 'Festivals & Parties',
    popularity: 92
  },
  { 
    id: 4, 
    name: 'Royal Heritage', 
    image: 'https://images.pexels.com/photos/6069125/pexels-photo-6069125.jpeg',
    description: 'Luxurious styling with royal cultural elements',
    occasion: 'Special Ceremonies',
    popularity: 97
  },
];

const filters = [
  { 
    id: 1, 
    name: 'Golden Frame', 
    description: 'Traditional embroidery border with gold accents',
    preview: '🌟',
    intensity: 'Subtle',
    culturalElements: ['Geometric patterns', 'Gold leaf details', 'Traditional motifs']
  },
  { 
    id: 2, 
    name: 'Cultural Patterns', 
    description: 'Authentic textile designs and symbolic elements',
    preview: '🎨',
    intensity: 'Medium',
    culturalElements: ['Tribal patterns', 'Sacred symbols', 'Ancestral designs']
  },
  { 
    id: 3, 
    name: 'Celebration Glow', 
    description: 'Festive lighting effects with warm tones',
    preview: '✨',
    intensity: 'Vibrant',
    culturalElements: ['Festival lights', 'Warm ambiance', 'Joyful atmosphere']
  },
  { 
    id: 4, 
    name: 'Heritage Vintage', 
    description: 'Classic film-inspired look with cultural depth',
    preview: '📸',
    intensity: 'Classic',
    culturalElements: ['Vintage tones', 'Timeless appeal', 'Historical essence']
  },
];

const culturalQuotes = [
  "Embracing heritage with modern grace",
  "Where tradition meets contemporary beauty",
  "Celebrating cultural roots with pride",
  "Honoring ancestors through style",
  "Cultural elegance in every detail",
  "Traditional beauty, timeless appeal"
];

export default function AISuggestionsScreen() {
  const { continent, country, culture, event, imageUri, cultureColors } = useLocalSearchParams();
  const [selectedPose, setSelectedPose] = useState(poses[0]);
  const [selectedOutfit, setSelectedOutfit] = useState(outfits[0]);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedQuote, setSelectedQuote] = useState(culturalQuotes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const colors = cultureColors ? JSON.parse(cultureColors as string) : ['#8b5cf6', '#ec4899'];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleShuffle = () => {
    setSelectedPose(poses[Math.floor(Math.random() * poses.length)]);
    setSelectedOutfit(outfits[Math.floor(Math.random() * outfits.length)]);
    setSelectedFilter(filters[Math.floor(Math.random() * filters.length)]);
    setSelectedQuote(culturalQuotes[Math.floor(Math.random() * culturalQuotes.length)]);
  };

  const handleApplyAll = () => {
    setIsGenerating(true);
    // Simulate AI processing time
    setTimeout(() => {
      router.push({
        pathname: '/preview',
        params: {
          continent: continent as string,
          country: country as string,
          culture: culture as string,
          event: event as string,
          imageUri: imageUri as string,
          pose: selectedPose.name,
          outfit: selectedOutfit.name,
          filter: selectedFilter.name,
          quote: selectedQuote,
          cultureColors: cultureColors as string
        }
      });
    }, 3000);
  };

  const handleTryAnother = () => {
    router.push('/culture');
  };

  const handleBack = () => {
    router.back();
  };

  if (isGenerating) {
    return (
      <GradientBackground>
        <StatusBar style="light" />
        <SafeAreaView style={styles.container}>
          <View style={styles.generatingContainer}>
            <Animated.View style={[styles.generatingContent, { opacity: fadeAnim }]}>
              <LinearGradient
                colors={colors}
                style={styles.generatingIcon}
              >
                <Wand2 color="#ffffff" size={32} />
              </LinearGradient>
              <Text style={styles.generatingTitle}>Creating Your {culture} Look</Text>
              <Text style={styles.generatingSubtitle}>
                AI is applying {selectedOutfit.name} styling with {selectedFilter.name} effects...
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <Animated.View style={[styles.progressFill, { width: '75%' }]} />
                </View>
                <Text style={styles.progressText}>Processing your cultural transformation...</Text>
              </View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Suggestions</Text>
          <TouchableOpacity onPress={handleShuffle} style={styles.shuffleButton}>
            <Shuffle color="#8b5cf6" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.titleContainer, { opacity: fadeAnim }]}>
            <LinearGradient
              colors={colors}
              style={styles.iconContainer}
            >
              <Sparkles color="#ffffff" size={24} />
            </LinearGradient>
            <Text style={styles.title}>Your Personalized {culture} Style</Text>
            <Text style={styles.subtitle}>
              AI-curated styling for your {event?.toString().toLowerCase()} celebration
            </Text>
          </Animated.View>

          {/* User Photo Preview */}
          <View style={styles.previewSection}>
            <Text style={styles.sectionTitle}>Your Photo</Text>
            <View style={styles.photoPreview}>
              <Image source={{ uri: imageUri as string }} style={styles.userPhoto} />
              <View style={styles.photoOverlay}>
                <Text style={styles.photoLabel}>Ready for styling</Text>
              </View>
            </View>
          </View>

          {/* Pose Suggestions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pose Suggestions</Text>
              <TouchableOpacity onPress={() => setSelectedPose(poses[Math.floor(Math.random() * poses.length)])}>
                <RefreshCw color="#8b5cf6" size={16} />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {poses.map((pose) => (
                <TouchableOpacity
                  key={pose.id}
                  style={[
                    styles.suggestionCard,
                    pose.id === selectedPose.id && styles.selectedCard
                  ]}
                  onPress={() => setSelectedPose(pose)}
                >
                  <Image source={{ uri: pose.image }} style={styles.suggestionImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cardGradient}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.suggestionName}>{pose.name}</Text>
                    <Text style={styles.suggestionDescription}>{pose.description}</Text>
                    <View style={styles.difficultyBadge}>
                      <Text style={styles.difficultyText}>{pose.difficulty}</Text>
                    </View>
                  </View>
                  {pose.id === selectedPose.id && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedText}>Selected</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Outfit Styles */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Outfit Recommendations</Text>
              <TouchableOpacity onPress={() => setSelectedOutfit(outfits[Math.floor(Math.random() * outfits.length)])}>
                <RefreshCw color="#8b5cf6" size={16} />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {outfits.map((outfit) => (
                <TouchableOpacity
                  key={outfit.id}
                  style={[
                    styles.suggestionCard,
                    outfit.id === selectedOutfit.id && styles.selectedCard
                  ]}
                  onPress={() => setSelectedOutfit(outfit)}
                >
                  <Image source={{ uri: outfit.image }} style={styles.suggestionImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cardGradient}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.suggestionName}>{outfit.name}</Text>
                    <Text style={styles.suggestionDescription}>{outfit.description}</Text>
                    <View style={styles.outfitMeta}>
                      <Text style={styles.occasionText}>{outfit.occasion}</Text>
                      <Text style={styles.popularityText}>{outfit.popularity}% ❤️</Text>
                    </View>
                  </View>
                  {outfit.id === selectedOutfit.id && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedText}>Selected</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Filters & Effects */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Cultural Filters & Effects</Text>
              <Palette color="#8b5cf6" size={16} />
            </View>
            <View style={styles.filtersContainer}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterCard,
                    filter.id === selectedFilter.id && styles.selectedFilterCard
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <View style={styles.filterHeader}>
                    <Text style={styles.filterPreview}>{filter.preview}</Text>
                    <View style={styles.filterInfo}>
                      <Text style={styles.filterName}>{filter.name}</Text>
                      <Text style={styles.filterIntensity}>{filter.intensity} intensity</Text>
                    </View>
                    {filter.id === selectedFilter.id && (
                      <View style={styles.selectedBadge}>
                        <Text style={styles.selectedBadgeText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.filterDescription}>{filter.description}</Text>
                  <View style={styles.culturalElements}>
                    {filter.culturalElements.map((element, index) => (
                      <View key={index} style={styles.elementTag}>
                        <Text style={styles.elementText}>{element}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Cultural Quote/Caption */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Cultural Caption</Text>
              <Quote color="#8b5cf6" size={16} />
            </View>
            <View style={styles.quoteContainer}>
              <Text style={styles.selectedQuote}>"{selectedQuote}"</Text>
              <TouchableOpacity 
                style={styles.refreshQuoteButton}
                onPress={() => setSelectedQuote(culturalQuotes[Math.floor(Math.random() * culturalQuotes.length)])}
              >
                <RefreshCw color="#8b5cf6" size={16} />
                <Text style={styles.refreshQuoteText}>New Quote</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Your Style Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Pose</Text>
                <Text style={styles.summaryValue}>{selectedPose.name}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Outfit</Text>
                <Text style={styles.summaryValue}>{selectedOutfit.name}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Filter</Text>
                <Text style={styles.summaryValue}>{selectedFilter.name}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Event</Text>
                <Text style={styles.summaryValue}>{event as string}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <CulturalButton
              title="Generate My Cultural Look"
              onPress={handleApplyAll}
              size="large"
              style={styles.primaryButton}
            />
            
            <View style={styles.secondaryButtons}>
              <CulturalButton
                title="Shuffle All Suggestions"
                onPress={handleShuffle}
                variant="outline"
                style={styles.secondaryButton}
              />
              <CulturalButton
                title="Try Different Culture"
                onPress={handleTryAnother}
                variant="secondary"
                style={styles.secondaryButton}
              />
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
  shuffleButton: {
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
  titleContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
  },
  previewSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  photoPreview: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  userPhoto: {
    width: 120,
    height: 160,
    resizeMode: 'cover',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
  },
  photoLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  horizontalScroll: {
    marginHorizontal: -12,
  },
  suggestionCard: {
    width: 140,
    height: 200,
    marginHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  suggestionImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardGradient: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    height: 120,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  suggestionName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    lineHeight: 12,
    marginBottom: 6,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  outfitMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  occasionText: {
    fontSize: 9,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
  },
  popularityText: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  filtersContainer: {
    gap: 12,
  },
  filterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedFilterCard: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterPreview: {
    fontSize: 24,
    marginRight: 12,
  },
  filterInfo: {
    flex: 1,
  },
  filterName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  filterIntensity: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  filterDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    marginBottom: 12,
    lineHeight: 20,
  },
  culturalElements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  elementTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  elementText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#8b5cf6',
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  selectedQuote: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 24,
  },
  refreshQuoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  refreshQuoteText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8b5cf6',
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
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButtons: {
    gap: 12,
  },
  secondaryButton: {
    marginBottom: 8,
  },
  generatingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  generatingContent: {
    alignItems: 'center',
  },
  generatingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  generatingTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  generatingSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
  },
});