import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { eigenmarken } from '../data/categories';

const brandImages: Record<string, string> = {
  balea: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300',
  alverde: 'https://images.unsplash.com/photo-1570194065650-d99fb4a38c0a?w=300',
  denkmit: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300',
  babylove: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300',
  mivolis: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300',
  dontodent: 'https://images.unsplash.com/photo-1559650656-5e63b7eb56f5?w=300',
  dmbio: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300',
  trendItUp: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300',
  profissimo: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300',
  sundance: 'https://images.unsplash.com/photo-1532947974-2e3965da25a4?w=300',
  sportness: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=300',
  deinbestes: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300',
};

const EigenmarkenSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Unsere Marken-Highlights</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {eigenmarken.slice(0, 6).map((brand) => (
          <TouchableOpacity key={brand.id} style={styles.brandCard} activeOpacity={0.7}>
            <Image
              source={{ uri: brandImages[brand.id] }}
              style={styles.brandImage}
              resizeMode="cover"
            />
            <View style={styles.brandOverlay}>
              <View style={styles.brandLogoCircle}>
                <Text style={styles.brandLogoText}>{brand.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {/* Navigation arrow */}
        <TouchableOpacity style={styles.navArrow}>
          <Text style={styles.navArrowText}>›</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.subtitleRow}>
        {eigenmarken.slice(0, 3).map((brand) => (
          <Text key={brand.id} style={styles.brandSubtitle}>{brand.name}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 28,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dmBlue,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    alignItems: 'center',
  },
  brandCard: {
    width: 200,
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
  brandOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  brandLogoCircle: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  brandLogoText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dmBlue,
  },
  navArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  navArrowText: {
    fontSize: 24,
    color: Colors.dmBlue,
    fontWeight: '300',
    marginTop: -2,
  },
  subtitleRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 60,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dmBlue,
  },
});

export default EigenmarkenSection;
