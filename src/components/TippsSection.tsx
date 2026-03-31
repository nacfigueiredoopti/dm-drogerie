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
    title: 'Schmink-Tipps für Anfänger',
    subtitle: 'Schritt für Schritt zum perfekten Make-up',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
  },
  {
    id: '2',
    title: 'Nagelpflege',
    subtitle: 'Deine ultimative Anleitung',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a38c0a?w=400',
  },
  {
    id: '3',
    title: 'Pediküre zuhause selber machen',
    subtitle: 'Tipps und Anleitung',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
  },
  {
    id: '4',
    title: 'Natürliche Haarpflege-Tipps',
    subtitle: 'Die besten Hausmittel',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
  },
];

const TippsSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Tipps & Trends</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tips.map((tip) => (
          <TouchableOpacity key={tip.id} style={styles.tipCard} activeOpacity={0.7}>
            <Image source={{ uri: tip.image }} style={styles.tipImage} resizeMode="cover" />
            <View style={styles.tipContent}>
              <Text style={styles.tipSubtitle}>{tip.subtitle}</Text>
              <Text style={styles.tipTitle} numberOfLines={2}>
                {tip.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {/* Navigation arrow */}
        <TouchableOpacity style={styles.navArrow}>
          <Text style={styles.navArrowText}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 28,
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
    gap: 14,
    alignItems: 'center',
  },
  tipCard: {
    width: 220,
    backgroundColor: Colors.cardBg,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tipImage: {
    width: '100%',
    height: 150,
  },
  tipContent: {
    padding: 12,
  },
  tipSubtitle: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dmBlue,
    lineHeight: 20,
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
});

export default TippsSection;
