import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import CultureCard from '@/components/CultureCard';

const cultureData: Record<string, Array<{ name: string; description: string; imageUrl: string; colors: string[] }>> = {
  'Nigeria': [
    {
      name: 'Yoruba Traditional',
      description: 'Elegant Agbada and Gele styles for weddings and ceremonies',
      imageUrl: 'https://images.pexels.com/photos/5384575/pexels-photo-5384575.jpeg',
      colors: ['#ff6b35', '#f7931e']
    },
    {
      name: 'Igbo Heritage',
      description: 'Traditional Isiagu and colorful coral beads styling',
      imageUrl: 'https://images.pexels.com/photos/6069125/pexels-photo-6069125.jpeg',
      colors: ['#dc2626', '#ea580c']
    },
    {
      name: 'Hausa Elegance',
      description: 'Northern Nigerian traditional attire with intricate embroidery',
      imageUrl: 'https://images.pexels.com/photos/7968043/pexels-photo-7968043.jpeg',
      colors: ['#16a34a', '#ca8a04']
    }
  ],
  'Japan': [
    {
      name: 'Traditional Kimono',
      description: 'Classic and modern kimono styles for special occasions',
      imageUrl: 'https://images.pexels.com/photos/1181412/pexels-photo-1181412.jpeg',
      colors: ['#dc2626', '#7c2d12']
    },
    {
      name: 'Harajuku Fashion',
      description: 'Bold, colorful street fashion with unique accessories',
      imageUrl: 'https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg',
      colors: ['#ec4899', '#8b5cf6']
    }
  ],
  'India': [
    {
      name: 'Punjabi Traditional',
      description: 'Stunning Punjabi suits and turbans for celebrations',
      imageUrl: 'https://images.pexels.com/photos/3608281/pexels-photo-3608281.jpeg',
      colors: ['#f59e0b', '#dc2626']
    },
    {
      name: 'South Indian Heritage',
      description: 'Beautiful sarees and traditional jewelry for ceremonies',
      imageUrl: 'https://images.pexels.com/photos/4040717/pexels-photo-4040717.jpeg',
      colors: ['#7c3aed', '#ec4899']
    }
  ],
  'Mexico': [
    {
      name: 'Aztec Inspired',
      description: 'Traditional patterns and colors celebrating ancient heritage',
      imageUrl: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg',
      colors: ['#ea580c', '#dc2626']
    },
    {
      name: 'Modern Mexican',
      description: 'Contemporary styling with traditional Mexican elements',
      imageUrl: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
      colors: ['#16a34a', '#f59e0b']
    }
  ]
};

export default function CultureSelectionScreen() {
  const { continent, countries } = useLocalSearchParams();
  const countryList = countries ? JSON.parse(countries as string) : [];
  
  // For demo, showing cultures for first country in the list
  const selectedCountry = countryList[0] || 'Nigeria';
  const cultures = cultureData[selectedCountry] || cultureData['Nigeria'];

  const handleCultureSelect = (culture: typeof cultures[0]) => {
    router.push({
      pathname: '/upload',
      params: {
        continent: continent as string,
        country: selectedCountry,
        culture: culture.name,
        cultureColors: JSON.stringify(culture.colors)
      }
    });
  };

  const handleBack = () => {
    router.back();
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
          <Text style={styles.headerTitle}>{selectedCountry} Cultures</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose Your Cultural Style</Text>
            <Text style={styles.subtitle}>
              Select a traditional style from {selectedCountry} to inspire your photo transformation
            </Text>
          </View>

          <View style={styles.culturesList}>
            {cultures.map((culture, index) => (
              <CultureCard
                key={index}
                name={culture.name}
                description={culture.description}
                imageUrl={culture.imageUrl}
                colors={culture.colors}
                onPress={() => handleCultureSelect(culture)}
              />
            ))}
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
  culturesList: {
    paddingBottom: 40,
  },
});