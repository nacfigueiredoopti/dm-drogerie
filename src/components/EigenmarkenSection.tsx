import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';
import { eigenmarken } from '../data/categories';

const EigenmarkenSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Unsere Eigenmarken</Text>
      <Text style={styles.sectionSubtitle}>
        Qualität zum besten Preis – exklusiv bei dm
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {eigenmarken.map((brand) => (
          <TouchableOpacity key={brand.id} style={styles.brandCard} activeOpacity={0.7}>
            <View style={styles.brandLogo}>
              <Text style={styles.brandEmoji}>{brand.logo}</Text>
            </View>
            <Text style={styles.brandName}>{brand.name}</Text>
            <Text style={styles.brandCategory}>{brand.category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: Colors.surfaceAlt,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  brandCard: {
    width: 100,
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  brandLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandEmoji: {
    fontSize: 28,
  },
  brandName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  brandCategory: {
    fontSize: 10,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default EigenmarkenSection;
