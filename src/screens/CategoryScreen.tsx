import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import ProductCard from '../components/ProductCard';
import { categories, Product } from '../data/categories';
import { RootStackParamList } from '../../App';

type CategoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Category'>;
  route: RouteProp<RootStackParamList, 'Category'>;
};

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const category = categories.find((c) => c.id === categoryId);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Kategorie nicht gefunden</Text>
      </View>
    );
  }

  const handleProductPress = (product: Product) => {
    navigation.navigate('Product', {
      productId: product.id,
      productName: product.name,
    });
  };

  return (
    <View style={styles.container}>
      {/* Category Hero */}
      <View style={[styles.categoryHero, { backgroundColor: category.color + '40' }]}>
        <Image
          source={{ uri: category.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroIcon}>{category.icon}</Text>
          <Text style={styles.heroTitle}>{category.name}</Text>
          <Text style={styles.heroCount}>
            {category.products.length} Produkte
          </Text>
        </View>
      </View>

      {/* Sub Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subCategoriesScroll}
        style={styles.subCategoriesContainer}
      >
        <TouchableOpacity
          style={[
            styles.subCategoryChip,
            !activeSubCategory && styles.subCategoryChipActive,
          ]}
          onPress={() => setActiveSubCategory(null)}
        >
          <Text
            style={[
              styles.subCategoryText,
              !activeSubCategory && styles.subCategoryTextActive,
            ]}
          >
            Alle
          </Text>
        </TouchableOpacity>
        {category.subCategories.map((sub) => (
          <TouchableOpacity
            key={sub.id}
            style={[
              styles.subCategoryChip,
              activeSubCategory === sub.id && styles.subCategoryChipActive,
            ]}
            onPress={() => setActiveSubCategory(sub.id)}
          >
            <Text style={styles.subCategoryIcon}>{sub.icon}</Text>
            <Text
              style={[
                styles.subCategoryText,
                activeSubCategory === sub.id && styles.subCategoryTextActive,
              ]}
            >
              {sub.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <View style={styles.filterLeft}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Sortieren</Text>
            <Text style={styles.filterIcon}>↕️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={styles.viewIcon}>⊞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Text style={styles.viewIcon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Products */}
      <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
        {viewMode === 'grid' ? (
          <View style={styles.productsGrid}>
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
              />
            ))}
          </View>
        ) : (
          <View style={styles.productsList}>
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
                horizontal
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoryHero: {
    height: 140,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  heroCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  subCategoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  subCategoriesScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  subCategoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    gap: 6,
  },
  subCategoryChipActive: {
    backgroundColor: Colors.primary,
  },
  subCategoryIcon: {
    fontSize: 14,
  },
  subCategoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  subCategoryTextActive: {
    color: Colors.textWhite,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  filterLeft: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  filterButtonText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  filterIcon: {
    fontSize: 12,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 4,
  },
  viewButton: {
    padding: 6,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: Colors.surface,
  },
  viewIcon: {
    fontSize: 18,
  },
  productsContainer: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  productsList: {
    padding: 16,
  },
});

export default CategoryScreen;
