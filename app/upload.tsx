import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Camera, Upload, Image as ImageIcon, Info, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import GradientBackground from '@/components/GradientBackground';
import CulturalButton from '@/components/CulturalButton';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const events = [
  { value: 'Wedding', label: 'Wedding', icon: '💒', description: 'Traditional wedding ceremonies and celebrations' },
  { value: 'Festival', label: 'Festival', icon: '🎭', description: 'Cultural festivals and community celebrations' },
  { value: 'Graduation', label: 'Graduation', icon: '🎓', description: 'Academic achievements and ceremonies' },
  { value: 'Fashion Shoot', label: 'Fashion Shoot', icon: '📸', description: 'Professional photography and modeling' },
  { value: 'Naming Ceremony', label: 'Naming Ceremony', icon: '👶', description: 'Traditional naming and blessing ceremonies' },
  { value: 'Birthday', label: 'Birthday', icon: '🎂', description: 'Birthday celebrations and milestone events' },
  { value: 'Traditional Gathering', label: 'Traditional Gathering', icon: '🏛️', description: 'Cultural meetings and community events' },
  { value: 'Religious Ceremony', label: 'Religious Ceremony', icon: '🙏', description: 'Spiritual and religious celebrations' }
];

const photoTips = [
  { icon: '📱', tip: 'Use good lighting - natural light works best' },
  { icon: '👤', tip: 'Clear view of face and upper body' },
  { icon: '🎯', tip: 'Stand against a simple background' },
  { icon: '📏', tip: 'Keep the camera at eye level' }
];

const examplePhotos = [
  {
    uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    label: 'Portrait Style',
    quality: 'Excellent'
  },
  {
    uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    label: 'Full Body',
    quality: 'Good'
  },
  {
    uri: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    label: 'Professional',
    quality: 'Perfect'
  }
];

export default function PhotoUploadScreen() {
  const { continent, country, culture, cultureColors } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState(events[0].value);
  const [imageQuality, setImageQuality] = useState<'excellent' | 'good' | 'poor' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const colors = cultureColors ? JSON.parse(cultureColors as string) : ['#8b5cf6', '#ec4899'];

  const analyzeImageQuality = (imageUri: string) => {
    setIsAnalyzing(true);
    // Simulate AI image quality analysis
    setTimeout(() => {
      const qualities = ['excellent', 'good', 'poor'];
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)] as 'excellent' | 'good' | 'poor';
      setImageQuality(randomQuality);
      setIsAnalyzing(false);
    }, 2000);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      analyzeImageQuality(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      analyzeImageQuality(result.assets[0].uri);
    }
  };

  const handleGenerateStyle = () => {
    if (!selectedImage) {
      Alert.alert('Photo Required', 'Please upload or take a photo first');
      return;
    }

    if (imageQuality === 'poor') {
      Alert.alert(
        'Image Quality Warning',
        'The selected image may not produce the best results. Would you like to continue or choose a different photo?',
        [
          { text: 'Choose Different Photo', onPress: pickImage },
          { text: 'Continue Anyway', onPress: proceedToSuggestions }
        ]
      );
      return;
    }

    proceedToSuggestions();
  };

  const proceedToSuggestions = () => {
    router.push({
      pathname: '/suggestions',
      params: {
        continent: continent as string,
        country: country as string,
        culture: culture as string,
        event: selectedEvent,
        imageUri: selectedImage!,
        cultureColors: cultureColors as string
      }
    });
  };

  const handleBack = () => {
    router.back();
  };

  const getQualityColor = () => {
    switch (imageQuality) {
      case 'excellent': return '#10b981';
      case 'good': return '#f59e0b';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getQualityIcon = () => {
    switch (imageQuality) {
      case 'excellent': return <CheckCircle color="#10b981" size={16} />;
      case 'good': return <CheckCircle color="#f59e0b" size={16} />;
      case 'poor': return <AlertCircle color="#ef4444" size={16} />;
      default: return null;
    }
  };

  const selectedEventData = events.find(e => e.value === selectedEvent) || events[0];

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload Photo</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Let's Style Your Photo</Text>
            <Text style={styles.subtitle}>
              Upload your photo and select the event type for personalized {culture} styling
            </Text>
          </View>

          {/* Photo Upload Section */}
          <View style={styles.uploadSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Photo</Text>
              <TouchableOpacity style={styles.infoButton}>
                <Info color="#a0aec0" size={16} />
              </TouchableOpacity>
            </View>
            
            {selectedImage ? (
              <View style={styles.selectedImageContainer}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                  
                  {/* Quality Analysis Overlay */}
                  {isAnalyzing ? (
                    <View style={styles.analysisOverlay}>
                      <View style={styles.analysisIndicator}>
                        <Text style={styles.analysisText}>Analyzing...</Text>
                      </View>
                    </View>
                  ) : imageQuality && (
                    <View style={styles.qualityBadge}>
                      {getQualityIcon()}
                      <Text style={[styles.qualityText, { color: getQualityColor() }]}>
                        {imageQuality.charAt(0).toUpperCase() + imageQuality.slice(1)} Quality
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.imageActions}>
                  <TouchableOpacity 
                    style={styles.changePhotoButton}
                    onPress={pickImage}
                  >
                    <Upload color="#8b5cf6" size={16} />
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.changePhotoButton}
                    onPress={takePhoto}
                  >
                    <Camera color="#8b5cf6" size={16} />
                    <Text style={styles.changePhotoText}>Take New</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.uploadContainer}>
                <LinearGradient
                  colors={['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.1)']}
                  style={styles.uploadArea}
                >
                  <ImageIcon color="#8b5cf6" size={48} />
                  <Text style={styles.uploadText}>Upload or take a photo</Text>
                  <Text style={styles.uploadSubtext}>For best results, use a clear portrait photo</Text>
                </LinearGradient>
                
                <View style={styles.uploadButtons}>
                  <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Upload color="#8b5cf6" size={20} />
                    <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                    <Camera color="#8b5cf6" size={20} />
                    <Text style={styles.uploadButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Photo Tips */}
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>📸 Photo Tips for Best Results</Text>
              <View style={styles.tipsGrid}>
                {photoTips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Text style={styles.tipIcon}>{tip.icon}</Text>
                    <Text style={styles.tipText}>{tip.tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Event Selection */}
          <View style={styles.eventSection}>
            <Text style={styles.sectionTitle}>Select Event Type</Text>
            <View style={styles.eventGrid}>
              {events.map((event) => (
                <TouchableOpacity
                  key={event.value}
                  style={[
                    styles.eventCard,
                    selectedEvent === event.value && styles.selectedEventCard
                  ]}
                  onPress={() => setSelectedEvent(event.value)}
                >
                  <Text style={styles.eventIcon}>{event.icon}</Text>
                  <Text style={[
                    styles.eventLabel,
                    selectedEvent === event.value && styles.selectedEventLabel
                  ]}>
                    {event.label}
                  </Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  {selectedEvent === event.value && (
                    <View style={styles.selectedIndicator}>
                      <CheckCircle color="#8b5cf6" size={16} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Example Photos */}
          <View style={styles.samplesSection}>
            <Text style={styles.sectionTitle}>Example Photos</Text>
            <Text style={styles.samplesSubtext}>See what types of photos work best</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.samplesScroll}>
              {examplePhotos.map((photo, index) => (
                <View key={index} style={styles.sampleContainer}>
                  <Image source={{ uri: photo.uri }} style={styles.sampleImage} />
                  <View style={styles.sampleInfo}>
                    <Text style={styles.sampleLabel}>{photo.label}</Text>
                    <View style={styles.sampleQuality}>
                      <CheckCircle color="#10b981" size={12} />
                      <Text style={styles.sampleQualityText}>{photo.quality}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Generate Button */}
          <View style={styles.buttonContainer}>
            <CulturalButton
              title={`Generate My ${selectedEventData.label} Look`}
              onPress={handleGenerateStyle}
              size="large"
              style={styles.generateButton}
              disabled={!selectedImage || isAnalyzing}
            />
            
            {selectedImage && imageQuality && (
              <View style={styles.qualityInfo}>
                <Text style={styles.qualityInfoText}>
                  {imageQuality === 'excellent' && '✨ Perfect! Your photo will create amazing results'}
                  {imageQuality === 'good' && '👍 Good quality - results will look great'}
                  {imageQuality === 'poor' && '⚠️ Consider using a clearer photo for better results'}
                </Text>
              </View>
            )}
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
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  uploadSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    flex: 1,
  },
  infoButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderStyle: 'dashed',
  },
  uploadArea: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 32,
    borderRadius: 12,
  },
  uploadText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8b5cf6',
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  selectedImage: {
    width: 240,
    height: 320,
    borderRadius: 16,
  },
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisIndicator: {
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  analysisText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  qualityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  qualityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  imageActions: {
    flexDirection: 'row',
    gap: 12,
  },
  changePhotoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  tipsContainer: {
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 12,
  },
  tipsGrid: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    flex: 1,
  },
  eventSection: {
    marginBottom: 32,
  },
  eventGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  eventCard: {
    width: (width - 72) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedEventCard: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  eventIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  eventLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  selectedEventLabel: {
    color: '#8b5cf6',
  },
  eventDescription: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 14,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  samplesSection: {
    marginBottom: 32,
  },
  samplesSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    marginBottom: 16,
  },
  samplesScroll: {
    marginHorizontal: -8,
  },
  sampleContainer: {
    marginHorizontal: 8,
    alignItems: 'center',
  },
  sampleImage: {
    width: 100,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  sampleInfo: {
    alignItems: 'center',
  },
  sampleLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginBottom: 4,
  },
  sampleQuality: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sampleQualityText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#10b981',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  generateButton: {
    width: '100%',
    marginBottom: 16,
  },
  qualityInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  qualityInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    textAlign: 'center',
  },
});