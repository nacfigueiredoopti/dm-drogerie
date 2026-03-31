import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useDecision } from '@optimizely/react-sdk';
import { Colors } from '../constants/colors';
import { Product } from '../data/categories';

const CARD_WIDTH = 185;
const IMAGE_HEIGHT = 180;

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  horizontal?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, horizontal = false }) => {
  const [decision] = useDecision('product_tile_carousel', { autoUpdate: true });
  const variables = decision?.variables || {};
  const enableCarousel = variables['enable_carousel'] as boolean ?? false;
  const indicatorStyle = variables['indicator_style'] as string ?? 'dots';
  const autoScroll = variables['auto_scroll'] as boolean ?? false;
  const [isFavorite, setIsFavorite] = useState(false);

  const images = enableCarousel && product.images && product.images.length > 1
    ? product.images
    : [product.image];
  const showCarousel = images.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!autoScroll || !showCarousel) return;
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoScroll, showCarousel, activeIndex, images.length]);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

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

  const goToImage = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  }, []);

  const renderImageSection = () => {
    if (!showCarousel) {
      return <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />;
    }

    return (
      <View>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(_, idx) => `${product.id}-img-${idx}`}
          getItemLayout={(_, index) => ({
            length: CARD_WIDTH,
            offset: CARD_WIDTH * index,
            index,
          })}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          )}
          style={styles.imageCarousel}
        />
        {indicatorStyle === 'dots' ? (
          <View style={styles.dotsContainer}>
            {images.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => goToImage(idx)}
                style={[
                  styles.dot,
                  idx === activeIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        ) : (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              {activeIndex + 1}/{images.length}
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (horizontal) {
    return (
      <TouchableOpacity
        style={styles.horizontalCard}
        onPress={() => onPress(product)}
        activeOpacity={0.7}
      >
        <View style={styles.horizontalImageWrap}>
          <Image source={{ uri: product.image }} style={styles.horizontalImage} resizeMode="cover" />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContent}>
          <Text style={styles.price}>{product.price.toFixed(2).replace('.', ',')} €</Text>
          {product.pricePerUnit && (
            <Text style={styles.pricePerUnit}>{product.pricePerUnit}</Text>
          )}
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>{renderStars(product.rating)}</View>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>
          <View style={styles.availabilityRow}>
            <View style={styles.availabilityItem}>
              <View style={[styles.availabilityDot, { backgroundColor: Colors.available }]} />
              <Text style={styles.availabilityText}>Lieferbar</Text>
            </View>
          </View>
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
      {/* Badges top-left */}
      {product.badges && product.badges.length > 0 && (
        <View style={styles.badgesContainer}>
          {product.badges.slice(0, 1).map((badge, index) => (
            <View
              key={index}
              style={[
                styles.badge,
                badge === 'Eigenmarke' && { backgroundColor: Colors.badgeMarke },
                badge === 'Bio' && { backgroundColor: Colors.badgeBio },
                badge === 'Vegan' && { backgroundColor: Colors.badgeVegan },
                badge === 'Bestseller' && { backgroundColor: Colors.primary },
                badge === 'Naturkosmetik' && { backgroundColor: Colors.badgeVegan },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  badge === 'Eigenmarke' && { fontSize: 8 },
                ]}
              >
                {badge === 'Eigenmarke' ? 'MARKE dm' : badge === 'Bestseller' ? 'NEU' : badge.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Favorite button top-right */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => setIsFavorite(!isFavorite)}
      >
        <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
          {isFavorite ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>

      {renderImageSection()}

      {/* Cart button */}
      <View style={styles.cartButtonContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
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

        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
          {product.volume ? `, ${product.volume}` : ''}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>{renderStars(product.rating)}</View>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        {/* Availability */}
        <View style={styles.availabilitySection}>
          <View style={styles.availabilityItem}>
            <View style={[styles.availabilityDot, { backgroundColor: Colors.available }]} />
            <Text style={styles.availabilityText}>Lieferbar</Text>
          </View>
          <View style={styles.availabilityItem}>
            <View style={[styles.availabilityDot, { backgroundColor: Colors.dmBlue }]} />
            <Text style={styles.availabilityText}>dm-Markt wählen</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.cardBg,
    borderRadius: 0,
    overflow: 'hidden',
    marginRight: 16,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    overflow: 'hidden',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingBottom: 12,
  },
  horizontalImageWrap: {
    position: 'relative',
  },
  horizontalImage: {
    width: 120,
    height: 150,
  },
  horizontalContent: {
    flex: 1,
    paddingLeft: 12,
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
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    color: Colors.textWhite,
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
    color: Colors.dmBlue,
  },
  favoriteIconActive: {
    color: Colors.primary,
  },
  image: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
  },
  imageCarousel: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: Colors.dmBlue,
    width: 12,
  },
  dotInactive: {
    backgroundColor: Colors.border,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  counterText: {
    color: Colors.textWhite,
    fontSize: 10,
    fontWeight: '600',
  },
  cartButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
    marginTop: -20,
    zIndex: 5,
  },
  cartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dmBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cartButtonIcon: {
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  brand: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
    marginBottom: 2,
    marginTop: 6,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dmBlue,
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 13,
    color: Colors.accent,
  },
  reviewCount: {
    fontSize: 11,
    color: Colors.textSecondary,
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
    color: Colors.dmBlue,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
  },
  pricePerUnit: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  availabilitySection: {
    gap: 3,
  },
  availabilityRow: {
    marginTop: 6,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  availabilityText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
});

export default ProductCard;
