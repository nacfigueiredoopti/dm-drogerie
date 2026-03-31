import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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

        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <TouchableOpacity>
            <Text style={styles.breadcrumbLink}>Startseite</Text>
          </TouchableOpacity>
        </View>

        <HeroBanner />

        {/* Category Title */}
        <View style={styles.categoryTitleSection}>
          <Text style={styles.categoryTitle}>Make-up</Text>
          <View style={styles.subCategoryChips}>
            {['Augen Make-up', 'Lippen Make-up', 'Teint', 'Nägel', 'Make-up Zubehör'].map((name) => (
              <TouchableOpacity key={name} style={styles.chip}>
                <Text style={styles.chipText}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoBannerContent}>
            <Text style={styles.promoBannerTitle}>
              Jede Woche ein Geschenk nach Deinem Einkauf
            </Text>
            <Text style={styles.promoBannerSubtitle}>
              → Jetzt in der dm-App entdecken
            </Text>
          </View>
        </View>

        {/* Neu im Sortiment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Neu im Sortiment</Text>
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

        <CategoryGrid
          categories={categories}
          onCategoryPress={handleCategoryPress}
        />

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
  breadcrumb: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  breadcrumbLink: {
    fontSize: 12,
    color: Colors.dmBlue,
    textDecorationLine: 'underline',
  },
  categoryTitleSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dmBlue,
    marginBottom: 14,
  },
  subCategoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  chipText: {
    fontSize: 13,
    color: Colors.dmBlue,
    fontWeight: '400',
  },
  promoBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#e8eef7',
    borderRadius: 8,
    padding: 20,
  },
  promoBannerContent: {},
  promoBannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dmBlue,
    marginBottom: 4,
  },
  promoBannerSubtitle: {
    fontSize: 14,
    color: Colors.dmBlue,
    fontWeight: '400',
  },
  section: {
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dmBlue,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  productsScroll: {
    paddingHorizontal: 16,
  },
  appBanner: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: Colors.dmBlue,
    borderRadius: 12,
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
