import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
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
  const [storeAvailability, setStoreAvailability] = useState(false);

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
      <View style={styles.categoryHero}>
        <Image
          source={{ uri: category.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroTextCard}>
            <Text style={styles.heroTitle}>{category.name}</Text>
            <Text style={styles.heroSubtitle}>Entdecke unser Sortiment</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.heroNavArrow}>
          <Text style={styles.heroNavArrowText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Dots */}
      <View style={styles.heroDots}>
        <View style={[styles.heroDot, styles.heroDotActive]} />
        <View style={styles.heroDot} />
      </View>

      {/* Category Title */}
      <View style={styles.titleSection}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
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

      {/* Promo Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoTitle}>Jede Woche ein Geschenk nach Deinem Einkauf</Text>
        <Text style={styles.promoSubtitle}>→ Jetzt in der dm-App entdecken</Text>
      </View>

      {/* Filter Section Header */}
      <View style={styles.allProductsHeader}>
        <Text style={styles.allProductsTitle}>Alle {category.name} Produkte</Text>
      </View>

      {/* Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScrollContainer}
        contentContainerStyle={styles.filterScroll}
      >
        {['Beliebte Filter', 'Marken', 'Preis', 'Farbe', 'Produkteigenschaften'].map((filter) => (
          <TouchableOpacity key={filter} style={styles.filterChip}>
            <Text style={styles.filterChipText}>{filter}</Text>
            <Text style={styles.filterChevron}>▾</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Store Availability Toggle */}
      <View style={styles.storeToggle}>
        <Switch
          value={storeAvailability}
          onValueChange={setStoreAvailability}
          trackColor={{ false: Colors.border, true: Colors.dmBlue }}
          thumbColor={Colors.background}
        />
        <Text style={styles.storeToggleText}>
          Verfügbarkeit prüfen in einem{' '}
          <Text style={styles.storeToggleLink}>dm-Markt</Text>
        </Text>
      </View>

      {/* Products Count & Sort */}
      <View style={styles.productsMeta}>
        <Text style={styles.productsCount}>{category.products.length} Produkte</Text>
        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sortieren nach:</Text>
          <TouchableOpacity>
            <Text style={styles.sortValue}>Beliebtheit ▾</Text>
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
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
  heroTextCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 4,
    padding: 20,
    maxWidth: '50%',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.dmBlue,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: Colors.textBody,
  },
  heroNavArrow: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  heroNavArrowText: {
    fontSize: 24,
    color: Colors.dmBlue,
    fontWeight: '300',
    marginTop: -2,
  },
  heroDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  heroDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
  },
  heroDotActive: {
    backgroundColor: Colors.dmBlue,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.dmBlue,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  subCategoryChipActive: {
    borderColor: Colors.dmBlue,
    backgroundColor: Colors.dmBlueLight,
  },
  subCategoryText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.dmBlue,
  },
  subCategoryTextActive: {
    fontWeight: '600',
  },
  promoBanner: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#e8eef7',
    borderRadius: 8,
    padding: 20,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dmBlue,
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 13,
    color: Colors.dmBlue,
  },
  allProductsHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  allProductsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dmBlue,
  },
  filterScrollContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  filterChipText: {
    fontSize: 13,
    color: Colors.dmBlue,
    fontWeight: '400',
  },
  filterChevron: {
    fontSize: 10,
    color: Colors.dmBlue,
  },
  storeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  storeToggleText: {
    fontSize: 13,
    color: Colors.textBody,
  },
  storeToggleLink: {
    color: Colors.dmBlue,
    textDecorationLine: 'underline',
  },
  productsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  productsCount: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  sortValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dmBlue,
    textDecorationLine: 'underline',
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
