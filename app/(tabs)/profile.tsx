import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { User, Settings, Globe, Crown, CircleHelp as HelpCircle, LogOut, ChevronRight, Camera, Bell, Moon, Shield, Heart, Download, Palette, Star, Gift } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import CulturalButton from '@/components/CulturalButton';
import { LinearGradient } from 'expo-linear-gradient';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function ProfileTab() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const profileStats = {
    creations: 47,
    favorites: 23,
    cultures: 8,
    downloads: 156,
    shares: 89,
    likes: 342
  };

  const achievements = [
    { icon: '🎨', title: 'Cultural Explorer', description: 'Tried 5+ cultures' },
    { icon: '📸', title: 'Photo Master', description: 'Created 25+ images' },
    { icon: '❤️', title: 'Community Favorite', description: '100+ likes received' },
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setShowLanguages(false);
    // Here you would implement actual language switching
    Alert.alert('Language Changed', `Switched to ${languages.find(l => l.code === languageCode)?.name}`);
  };

  const handleUpgrade = () => {
    Alert.alert('Upgrade to Pro', 'Unlock premium features and unlimited generations!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Logged out') }
      ]
    );
  };

  const selectedLang = languages.find(l => l.code === selectedLanguage);

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#8b5cf6', '#ec4899']}
                style={styles.avatar}
              >
                <User color="#ffffff" size={32} />
              </LinearGradient>
              <TouchableOpacity style={styles.cameraButton}>
                <Camera color="#ffffff" size={16} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>Cultural Creator</Text>
            <Text style={styles.userEmail}>creator@afrosnap.ai</Text>
            
            {/* Premium Badge */}
            <TouchableOpacity style={styles.premiumBadge} onPress={handleUpgrade}>
              <Crown color="#f59e0b" size={16} />
              <Text style={styles.premiumText}>Free Plan</Text>
              <ChevronRight color="#f59e0b" size={14} />
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileStats.creations}</Text>
                <Text style={styles.statLabel}>Creations</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileStats.favorites}</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileStats.cultures}</Text>
                <Text style={styles.statLabel}>Cultures</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileStats.downloads}</Text>
                <Text style={styles.statLabel}>Downloads</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileStats.shares}</Text>
                <Text style={styles.statLabel}>Shares</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileStats.likes}</Text>
                <Text style={styles.statLabel}>Likes</Text>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsContainer}>
              {achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                  <Star color="#f59e0b" size={16} fill="#f59e0b" />
                </View>
              ))}
            </View>
          </View>

          {/* Upgrade Section */}
          <View style={styles.upgradeSection}>
            <TouchableOpacity onPress={handleUpgrade}>
              <LinearGradient
                colors={['#8b5cf6', '#ec4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.upgradeCard}
              >
                <Crown color="#ffffff" size={24} />
                <View style={styles.upgradeContent}>
                  <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
                  <Text style={styles.upgradeSubtitle}>Unlock premium filters and unlimited generations</Text>
                  <View style={styles.upgradeFeatures}>
                    <Text style={styles.upgradeFeature}>• Unlimited AI generations</Text>
                    <Text style={styles.upgradeFeature}>• Premium cultural filters</Text>
                    <Text style={styles.upgradeFeature}>• 4K resolution exports</Text>
                  </View>
                </View>
                <ChevronRight color="#ffffff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Settings Sections */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            {/* Language Selection */}
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => setShowLanguages(!showLanguages)}
            >
              <View style={styles.settingLeft}>
                <Globe color="#8b5cf6" size={20} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Language</Text>
                  <Text style={styles.settingSubtitle}>
                    {selectedLang?.flag} {selectedLang?.name}
                  </Text>
                </View>
              </View>
              <ChevronRight color="#a0aec0" size={20} />
            </TouchableOpacity>

            {showLanguages && (
              <View style={styles.languageList}>
                {languages.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    style={[
                      styles.languageItem,
                      selectedLanguage === language.code && styles.selectedLanguageItem
                    ]}
                    onPress={() => handleLanguageSelect(language.code)}
                  >
                    <Text style={styles.languageFlag}>{language.flag}</Text>
                    <Text style={[
                      styles.languageName,
                      selectedLanguage === language.code && styles.selectedLanguageName
                    ]}>
                      {language.name}
                    </Text>
                    {selectedLanguage === language.code && (
                      <View style={styles.selectedIndicator} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Notifications */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Bell color="#8b5cf6" size={20} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Notifications</Text>
                  <Text style={styles.settingSubtitle}>Get updates about new features</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#374151', true: '#8b5cf6' }}
                thumbColor={notifications ? '#ffffff' : '#9ca3af'}
              />
            </View>

            {/* Auto Save */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Download color="#8b5cf6" size={20} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Auto Save</Text>
                  <Text style={styles.settingSubtitle}>Automatically save creations</Text>
                </View>
              </View>
              <Switch
                value={autoSave}
                onValueChange={setAutoSave}
                trackColor={{ false: '#374151', true: '#8b5cf6' }}
                thumbColor={autoSave ? '#ffffff' : '#9ca3af'}
              />
            </View>
          </View>

          {/* App Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App</Text>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Palette color="#8b5cf6" size={20} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Cultural Acknowledgment</Text>
                  <Text style={styles.settingSubtitle}>Learn about cultural respect</Text>
                </View>
              </View>
              <ChevronRight color="#a0aec0" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Gift color="#8b5cf6" size={20} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Invite Friends</Text>
                  <Text style={styles.settingSubtitle}>Share AfroSnap AI with others</Text>
                </View>
              </View>
              <ChevronRight color="#a0aec0" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <HelpCircle color="#8b5cf6" size={20} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Help & Support</Text>
                  <Text style={styles.settingSubtitle}>Get help and contact us</Text>
                </View>
              </View>
              <ChevronRight color="#a0aec0" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Shield color="#8b5cf6" size={20} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Privacy & Terms</Text>
                  <Text style={styles.settingSubtitle}>Review our policies</Text>
                </View>
              </View>
              <ChevronRight color="#a0aec0" size={20} />
            </TouchableOpacity>
          </View>

          {/* Account Actions */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut color="#ef4444" size={20} />
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>AfroSnap AI v1.0.0</Text>
            <Text style={styles.versionSubtext}>Made with ❤️ for cultural celebration</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
    marginBottom: 16,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    gap: 8,
  },
  premiumText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#f59e0b',
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
  },
  upgradeSection: {
    marginBottom: 32,
  },
  upgradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  upgradeSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  upgradeFeatures: {
    gap: 2,
  },
  upgradeFeature: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#a0aec0',
  },
  languageList: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    gap: 12,
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  languageFlag: {
    fontSize: 20,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    flex: 1,
  },
  selectedLanguageName: {
    fontFamily: 'Inter-SemiBold',
    color: '#8b5cf6',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b5cf6',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#a0aec0',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
});