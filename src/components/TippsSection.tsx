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

const tips = [
  {
    id: '1',
    title: 'Hautpflege-Routine für den Sommer',
    category: 'Pflege-Tipps',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300',
    readTime: '5 Min.',
  },
  {
    id: '2',
    title: 'Die besten veganen Produkte bei dm',
    category: 'Nachhaltigkeit',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a38c0a?w=300',
    readTime: '4 Min.',
  },
  {
    id: '3',
    title: 'Baby-Erstausstattung: Was braucht man?',
    category: 'Baby & Kind',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300',
    readTime: '7 Min.',
  },
  {
    id: '4',
    title: 'Natürliche Haarpflege-Tipps',
    category: 'Haare',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300',
    readTime: '3 Min.',
  },
];

const TippsSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Tipps & Trends</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Alle ansehen →</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tips.map((tip) => (
          <TouchableOpacity key={tip.id} style={styles.tipCard} activeOpacity={0.7}>
            <Image source={{ uri: tip.image }} style={styles.tipImage} resizeMode="cover" />
            <View style={styles.tipContent}>
              <Text style={styles.tipCategory}>{tip.category}</Text>
              <Text style={styles.tipTitle} numberOfLines={2}>
                {tip.title}
              </Text>
              <Text style={styles.readTime}>{tip.readTime} Lesezeit</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 14,
  },
  tipCard: {
    width: 220,
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  tipImage: {
    width: '100%',
    height: 130,
  },
  tipContent: {
    padding: 12,
  },
  tipCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 6,
  },
  readTime: {
    fontSize: 11,
    color: Colors.textLight,
  },
});

export default TippsSection;
