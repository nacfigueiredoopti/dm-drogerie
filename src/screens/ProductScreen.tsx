import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { categories, Product } from '../data/categories';
import { RootStackParamList } from '../../App';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ProductScreenProps = {
  route: RouteProp<RootStackParamList, 'Product'>;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ route }) => {
  const { productId } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const allProducts = categories.flatMap((c) => c.products);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produkt nicht gefunden</Text>
      </View>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= Math.floor(rating) ? '★' : i - 0.5 <= rating ? '★' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
              {isFavorite ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>

          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <View style={styles.badgesContainer}>
              {product.badges.map((badge, index) => (
                <View
                  key={index}
                  style={[
                    styles.badge,
                    badge === 'Bio' && { backgroundColor: Colors.badgeBio },
                    badge === 'Vegan' && { backgroundColor: Colors.badgeVegan },
                    badge === 'Eigenmarke' && { backgroundColor: Colors.badgeMarke },
                    badge === 'Bestseller' && { backgroundColor: Colors.primary },
                    badge === 'Naturkosmetik' && { backgroundColor: Colors.badgeVegan },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {badge === 'Eigenmarke' ? 'MARKE dm' : badge.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          {/* Price */}
          <View style={styles.priceSection}>
            <Text style={styles.price}>
              {product.price.toFixed(2).replace('.', ',')} €
            </Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {product.originalPrice.toFixed(2).replace('.', ',')} €
              </Text>
            )}
          </View>
          {product.pricePerUnit && (
            <Text style={styles.pricePerUnit}>{product.pricePerUnit}</Text>
          )}

          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>
            {product.name}
            {product.volume ? `, ${product.volume}` : ''}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>

          {/* Hinweise link */}
          <TouchableOpacity style={styles.hinweiseRow}>
            <Text style={styles.hinweiseIcon}>ⓘ</Text>
            <Text style={styles.hinweiseText}>Hinweise</Text>
          </TouchableOpacity>

          {/* Availability */}
          <View style={styles.availabilitySection}>
            <View style={styles.availabilityRow}>
              <View style={[styles.availabilityDot, { backgroundColor: Colors.available }]} />
              <Text style={styles.availabilityText}>Lieferbar</Text>
            </View>
            <View style={styles.availabilityRow}>
              <View style={[styles.availabilityDot, { backgroundColor: Colors.dmBlue }]} />
              <Text style={styles.availabilityLink}>dm-Markt wählen</Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Menge:</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart */}
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartIcon}>🛒</Text>
            <Text style={styles.addToCartText}>
              In den Warenkorb · {(product.price * quantity).toFixed(2).replace('.', ',')} €
            </Text>
          </TouchableOpacity>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Produktbeschreibung</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliverySection}>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryIcon}>🚚</Text>
              <View>
                <Text style={styles.deliveryTitle}>Lieferung in 1-3 Werktagen</Text>
                <Text style={styles.deliverySubtitle}>Kostenlos ab 59 €</Text>
              </View>
            </View>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryIcon}>🏪</Text>
              <View>
                <Text style={styles.deliveryTitle}>Filialabholung</Text>
                <Text style={styles.deliverySubtitle}>Meist in 2 Stunden abholbereit</Text>
              </View>
            </View>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryIcon}>↩️</Text>
              <View>
                <Text style={styles.deliveryTitle}>30 Tage Rückgaberecht</Text>
                <Text style={styles.deliverySubtitle}>Kostenlose Rücksendung</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 320,
    backgroundColor: Colors.surface,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 24,
    color: Colors.dmBlue,
  },
  favoriteIconActive: {
    color: Colors.primary,
  },
  badgesContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    color: Colors.textWhite,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  infoContainer: {
    padding: 20,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.dmBlue,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
  },
  pricePerUnit: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  brand: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dmBlue,
    marginBottom: 8,
    lineHeight: 22,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: Colors.accent,
  },
  reviewCount: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  hinweiseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  hinweiseIcon: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  hinweiseText: {
    fontSize: 13,
    color: Colors.dmBlue,
    textDecorationLine: 'underline',
  },
  availabilitySection: {
    gap: 6,
    marginBottom: 20,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  availabilityText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  availabilityLink: {
    fontSize: 13,
    color: Colors.dmBlue,
    textDecorationLine: 'underline',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dmBlue,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dmBlue,
  },
  quantityValue: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dmBlue,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
    lineHeight: 40,
  },
  addToCartButton: {
    backgroundColor: Colors.dmBlue,
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  addToCartIcon: {
    fontSize: 18,
  },
  addToCartText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
  descriptionSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 20,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dmBlue,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textBody,
    lineHeight: 22,
  },
  deliverySection: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 16,
    gap: 14,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deliveryIcon: {
    fontSize: 24,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dmBlue,
  },
  deliverySubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
});

export default ProductScreen;
