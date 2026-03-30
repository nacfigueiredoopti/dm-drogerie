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
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
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
                    badge === 'Eigenmarke' && { backgroundColor: Colors.primary },
                    badge === 'Bestseller' && { backgroundColor: Colors.accent },
                    badge === 'Naturkosmetik' && { backgroundColor: Colors.badgeVegan },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      badge === 'Bestseller' && { color: Colors.textPrimary },
                    ]}
                  >
                    {badge}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} Bewertungen)</Text>
          </View>

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
          {product.volume && (
            <Text style={styles.volume}>Inhalt: {product.volume}</Text>
          )}

          {/* Availability */}
          <View style={styles.availabilityRow}>
            <View style={styles.availabilityDot} />
            <Text style={styles.availabilityText}>Online verfügbar</Text>
          </View>
          <View style={styles.availabilityRow}>
            <View style={[styles.availabilityDot, { backgroundColor: Colors.success }]} />
            <Text style={styles.availabilityText}>In Ihrer Filiale verfügbar</Text>
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
                <Text style={styles.deliverySubtitle}>Kostenlos ab 49 €</Text>
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
    backgroundColor: Colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 22,
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
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    color: Colors.textWhite,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  infoContainer: {
    padding: 20,
  },
  brand: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
    lineHeight: 28,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 18,
    color: Colors.accent,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  reviewCount: {
    fontSize: 13,
    color: Colors.textLight,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  originalPrice: {
    fontSize: 18,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
  },
  pricePerUnit: {
    fontSize: 13,
    color: Colors.textLight,
    marginBottom: 2,
  },
  volume: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  availabilityText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    gap: 12,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
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
    color: Colors.textPrimary,
  },
  quantityValue: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
    lineHeight: 40,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addToCartText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  deliverySection: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
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
    color: Colors.textPrimary,
  },
  deliverySubtitle: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 1,
  },
});

export default ProductScreen;
