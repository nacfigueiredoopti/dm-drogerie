import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import Header from '../components/Header';
import CategoryNavBar from '../components/CategoryNavBar';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import EigenmarkenSection from '../components/EigenmarkenSection';
import TippsSection from '../components/TippsSection';
import Footer from '../components/Footer';
import { categories, Category, Product } from '../data/categories';
import { RootStackParamList } from '../../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleCategoryPress = (category: Category) => {
    navigation.navigate('Category', {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('Product', {
      productId: product.id,
      productName: product.name,
    });
  };

  // Featured products from different categories
  const featuredProducts = categories.flatMap((c) => c.products).slice(0, 8);
  const topRated = [...categories.flatMap((c) => c.products)]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <View style={styles.container}>
      <Header cartCount={3} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <CategoryNavBar
          categories={categories}
          onCategoryPress={handleCategoryPress}
        />

        <HeroBanner />

        <CategoryGrid
          categories={categories}
          onCategoryPress={handleCategoryPress}
        />

        {/* Featured Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beliebte Produkte</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
              />
            ))}
          </ScrollView>
        </View>

        <EigenmarkenSection />

        {/* Top Rated */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top bewertet</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {topRated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
              />
            ))}
          </ScrollView>
        </View>

        <TippsSection />

        {/* App Download Banner */}
        <View style={styles.appBanner}>
          <View style={styles.appBannerContent}>
            <Text style={styles.appBannerIcon}>📱</Text>
            <View style={styles.appBannerText}>
              <Text style={styles.appBannerTitle}>Mein dm App</Text>
              <Text style={styles.appBannerSubtitle}>
                Coupons, Payback Punkte & mehr – jetzt herunterladen!
              </Text>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  productsScroll: {
    paddingHorizontal: 16,
  },
  appBanner: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
  },
  appBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  appBannerIcon: {
    fontSize: 48,
  },
  appBannerText: {
    flex: 1,
  },
  appBannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textWhite,
    marginBottom: 4,
  },
  appBannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
});

export default HomeScreen;
