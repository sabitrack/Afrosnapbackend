import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, MapPin, TrendingUp } from 'lucide-react-native';
import { TouchableOpacity, TextInput } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const categories = ['All', 'Wedding', 'Festival', 'Traditional', 'Modern', 'Celebration'];

const exploreItems = [
  {
    id: 1,
    title: 'Nigerian Wedding Style',
    location: 'Lagos, Nigeria',
    image: 'https://images.pexels.com/photos/5384575/pexels-photo-5384575.jpeg',
    likes: 245,
    category: 'Wedding',
    trending: true
  },
  {
    id: 2,
    title: 'Japanese Kimono Art',
    location: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/1181412/pexels-photo-1181412.jpeg',
    likes: 189,
    category: 'Traditional',
    trending: false
  },
  {
    id: 3,
    title: 'Indian Festival Look',
    location: 'Mumbai, India',
    image: 'https://images.pexels.com/photos/3608281/pexels-photo-3608281.jpeg',
    likes: 312,
    category: 'Festival',
    trending: true
  },
  {
    id: 4,
    title: 'African Heritage Style',
    location: 'Accra, Ghana',
    image: 'https://images.pexels.com/photos/6069125/pexels-photo-6069125.jpeg',
    likes: 198,
    category: 'Traditional',
    trending: false
  },
  {
    id: 5,
    title: 'Modern Cultural Fusion',
    location: 'New York, USA',
    image: 'https://images.pexels.com/photos/7968043/pexels-photo-7968043.jpeg',
    likes: 156,
    category: 'Modern',
    trending: true
  },
  {
    id: 6,
    title: 'Brazilian Carnival',
    location: 'Rio de Janeiro, Brazil',
    image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg',
    likes: 274,
    category: 'Celebration',
    trending: false
  }
];

export default function ExploreTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = exploreItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore Cultures</Text>
          <Text style={styles.headerSubtitle}>Discover authentic styles from around the world</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#a0aec0" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search cultures, styles, locations..."
              placeholderTextColor="#a0aec0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color="#8b5cf6" size={20} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content Grid */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {filteredItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.imageGradient}
                  />
                  
                  {/* Trending Badge */}
                  {item.trending && (
                    <View style={styles.trendingBadge}>
                      <TrendingUp color="#ffffff" size={12} />
                      <Text style={styles.trendingText}>Trending</Text>
                    </View>
                  )}
                  
                  {/* Content Overlay */}
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.itemLocation}>
                      <MapPin color="#e2e8f0" size={12} />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <View style={styles.itemStats}>
                      <Text style={styles.likesText}>❤️ {item.likes}</Text>
                      <View style={styles.categoryTag}>
                        <Text style={styles.categoryTagText}>{item.category}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Load More */}
          <View style={styles.loadMoreContainer}>
            <TouchableOpacity style={styles.loadMoreButton}>
              <Text style={styles.loadMoreText}>Load More Styles</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  selectedCategoryButton: {
    backgroundColor: '#8b5cf6',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#a0aec0',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  gridItem: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  trendingText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  itemContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 6,
  },
  itemLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
  },
  itemStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likesText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  categoryTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryTagText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  loadMoreContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  loadMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8b5cf6',
  },
});