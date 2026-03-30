import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Product } from '../data/categories';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  horizontal?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, horizontal = false }) => {
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

  if (horizontal) {
    return (
      <TouchableOpacity
        style={styles.horizontalCard}
        onPress={() => onPress(product)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: product.image }} style={styles.horizontalImage} resizeMode="cover" />
        <View style={styles.horizontalContent}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>{renderStars(product.rating)}</View>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{product.price.toFixed(2).replace('.', ',')} €</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {product.originalPrice.toFixed(2).replace('.', ',')} €
              </Text>
            )}
          </View>
          {product.pricePerUnit && (
            <Text style={styles.pricePerUnit}>{product.pricePerUnit}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
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

      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>{renderStars(product.rating)}</View>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{product.price.toFixed(2).replace('.', ',')} €</Text>
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
          <Text style={styles.volume}>{product.volume}</Text>
        )}

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>In den Warenkorb</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  horizontalImage: {
    width: 120,
    height: 140,
  },
  horizontalContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  badgesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    color: Colors.textWhite,
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 10,
  },
  brand: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 12,
    color: Colors.accent,
  },
  reviewCount: {
    fontSize: 10,
    color: Colors.textLight,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
  },
  pricePerUnit: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 2,
  },
  volume: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 1,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartText: {
    color: Colors.textWhite,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ProductCard;
