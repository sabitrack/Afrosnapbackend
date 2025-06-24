import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import ContinentCard from '@/components/ContinentCard';
import { TouchableOpacity } from 'react-native';

const continents = [
  {
    name: 'Africa',
    emoji: '🌍',
    colors: ['#ff6b35', '#f7931e'],
    countries: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco']
  },
  {
    name: 'Asia',
    emoji: '🌏',
    colors: ['#ff007f', '#ff4081'],
    countries: ['India', 'Japan', 'China', 'Thailand', 'Indonesia', 'South Korea']
  },
  {
    name: 'Europe',
    emoji: '🌍',
    colors: ['#3b82f6', '#1e40af'],
    countries: ['United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Greece']
  },
  {
    name: 'North America',
    emoji: '🌎',
    colors: ['#10b981', '#059669'],
    countries: ['United States', 'Canada', 'Mexico', 'Guatemala', 'Cuba', 'Jamaica']
  },
  {
    name: 'South America',
    emoji: '🌎',
    colors: ['#f59e0b', '#d97706'],
    countries: ['Brazil', 'Argentina', 'Peru', 'Colombia', 'Chile', 'Bolivia']
  },
  {
    name: 'Oceania',
    emoji: '🌊',
    colors: ['#06b6d4', '#0891b2'],
    countries: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea', 'Samoa', 'Tonga']
  },
];

export default function ContinentSelectionScreen() {
  const handleContinentSelect = (continent: typeof continents[0]) => {
    router.push({
      pathname: '/culture',
      params: { 
        continent: continent.name,
        countries: JSON.stringify(continent.countries)
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
          <Text style={styles.headerTitle}>Choose Continent</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Where's Your Cultural{'\n'}Inspiration From?</Text>
            <Text style={styles.subtitle}>
              Select a continent to explore authentic cultural styles from around the world
            </Text>
          </View>

          <View style={styles.grid}>
            {continents.map((continent, index) => (
              <View key={continent.name} style={styles.cardContainer}>
                <ContinentCard
                  name={continent.name}
                  emoji={continent.emoji}
                  colors={continent.colors}
                  onPress={() => handleContinentSelect(continent)}
                />
              </View>
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
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 36,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  cardContainer: {
    width: '48%',
    marginBottom: 16,
  },
});