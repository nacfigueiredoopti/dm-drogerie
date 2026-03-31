import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Category } from '../data/categories';

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Beliebte Kategorien</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => onCategoryPress(category)}
            activeOpacity={0.7}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.categoryName}>
                {category.name}
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
    paddingVertical: 24,
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
  categoryCard: {
    width: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    padding: 12,
  },
  categoryName: {
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
    marginLeft: 4,
  },
  navArrowText: {
    fontSize: 24,
    color: Colors.dmBlue,
    fontWeight: '300',
    marginTop: -2,
  },
});

export default CategoryGrid;
