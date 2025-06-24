import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Heart, Download, Share2, Trash2, Grid, List } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const favoriteItems = [
  {
    id: 1,
    title: 'My Nigerian Wedding Look',
    culture: 'Yoruba Traditional',
    date: '2024-01-15',
    image: 'https://images.pexels.com/photos/5384575/pexels-photo-5384575.jpeg',
    event: 'Wedding',
    liked: true
  },
  {
    id: 2,
    title: 'Festival Celebration',
    culture: 'Indian Traditional',
    date: '2024-01-10',
    image: 'https://images.pexels.com/photos/3608281/pexels-photo-3608281.jpeg',
    event: 'Festival',
    liked: true
  },
  {
    id: 3,
    title: 'Cultural Heritage Photo',
    culture: 'Japanese Kimono',
    date: '2024-01-05',
    image: 'https://images.pexels.com/photos/1181412/pexels-photo-1181412.jpeg',
    event: 'Traditional Ceremony',
    liked: true
  },
  {
    id: 4,
    title: 'Modern African Style',
    culture: 'Ghanaian Kente',
    date: '2024-01-01',
    image: 'https://images.pexels.com/photos/6069125/pexels-photo-6069125.jpeg',
    event: 'Fashion Shoot',
    liked: true
  }
];

export default function FavoritesTab() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState(favoriteItems);

  const toggleFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const shareItem = (item: typeof favoriteItems[0]) => {
    // Implement share functionality
    console.log('Sharing:', item.title);
  };

  const downloadItem = (item: typeof favoriteItems[0]) => {
    // Implement download functionality
    console.log('Downloading:', item.title);
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Your Favorites</Text>
            <Text style={styles.headerSubtitle}>{favorites.length} saved creations</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.viewToggle, viewMode === 'grid' && styles.activeViewToggle]}
              onPress={() => setViewMode('grid')}
            >
              <Grid color={viewMode === 'grid' ? '#ffffff' : '#a0aec0'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewToggle, viewMode === 'list' && styles.activeViewToggle]}
              onPress={() => setViewMode('list')}
            >
              <List color={viewMode === 'list' ? '#ffffff' : '#a0aec0'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart color="#a0aec0" size={64} />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start creating and save your favorite cultural styles here
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {viewMode === 'grid' ? (
              <View style={styles.grid}>
                {favorites.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.gridItem}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: item.image }} style={styles.itemImage} />
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.imageGradient}
                      />
                      
                      {/* Actions */}
                      <View style={styles.itemActions}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => toggleFavorite(item.id)}
                        >
                          <Heart color="#ef4444" size={16} fill="#ef4444" />
                        </TouchableOpacity>
                      </View>
                      
                      {/* Content */}
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemCulture}>{item.culture}</Text>
                        <View style={styles.itemMeta}>
                          <Text style={styles.itemDate}>{item.date}</Text>
                          <View style={styles.eventTag}>
                            <Text style={styles.eventTagText}>{item.event}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.list}>
                {favorites.map((item) => (
                  <View key={item.id} style={styles.listItem}>
                    <Image source={{ uri: item.image }} style={styles.listItemImage} />
                    
                    <View style={styles.listItemContent}>
                      <Text style={styles.listItemTitle}>{item.title}</Text>
                      <Text style={styles.listItemCulture}>{item.culture}</Text>
                      <View style={styles.listItemMeta}>
                        <Text style={styles.listItemDate}>{item.date}</Text>
                        <View style={styles.listEventTag}>
                          <Text style={styles.listEventTagText}>{item.event}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.listItemActions}>
                      <TouchableOpacity
                        style={styles.listActionButton}
                        onPress={() => downloadItem(item)}
                      >
                        <Download color="#a0aec0" size={18} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.listActionButton}
                        onPress={() => shareItem(item)}
                      >
                        <Share2 color="#a0aec0" size={18} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.listActionButton}
                        onPress={() => toggleFavorite(item.id)}
                      >
                        <Trash2 color="#ef4444" size={18} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            {/* Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.statsTitle}>Your Creative Journey</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{favorites.length}</Text>
                  <Text style={styles.statLabel}>Favorites</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{new Set(favorites.map(f => f.culture)).size}</Text>
                  <Text style={styles.statLabel}>Cultures</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{new Set(favorites.map(f => f.event)).size}</Text>
                  <Text style={styles.statLabel}>Events</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeViewToggle: {
    backgroundColor: '#8b5cf6',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 24,
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
    height: 180,
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  itemActions: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 4,
  },
  itemCulture: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDate: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
  },
  eventTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  eventTagText: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  list: {
    gap: 16,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  listItemCulture: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    marginBottom: 8,
  },
  listItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listItemDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  listEventTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  listEventTagText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  listItemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  listActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    textAlign: 'center',
  },
});