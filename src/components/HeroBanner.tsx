import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDecision } from '@optimizely/react-sdk';
import { Colors } from '../constants/colors';
import { promotions } from '../data/categories';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 200;

const colorMap: Record<string, string> = {
  red: '#E30613',
  blue: '#2196F3',
  green: '#4CAF50',
  orange: '#FF9800',
  purple: '#9C27B0',
  yellow: '#FEC700',
  pink: '#E91E63',
  white: '#FFFFFF',
  black: '#1A1A1A',
  gold: '#FEC700',
};

const resolveColor = (color: string): string => {
  return colorMap[color?.toLowerCase()] || color || Colors.accent;
};

const HeroBanner: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [decision] = useDecision('hero_button', { autoUpdate: true });
  const variables = decision?.variables || {};
  const buttonColor = resolveColor(variables['button_color'] as string);
  const buttonTextColor = resolveColor(variables['button_text_color'] as string || 'white');
  const buttonShape = variables['button_shape'] as string || 'rounded';
  const buttonText = variables['button_text'] as string || 'Jetzt entdecken';

  const borderRadiusMap: Record<string, number> = {
    square: 0,
    rounded: 8,
    pill: 30,
  };
  const borderRadius = borderRadiusMap[buttonShape] ?? 8;

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % promotions.length;
      scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {promotions.map((promo) => (
          <ImageBackground
            key={promo.id}
            source={{ uri: promo.image }}
            style={[styles.banner, { backgroundColor: promo.color }]}
            imageStyle={styles.bannerImage}
          >
            <View style={styles.overlay}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{promo.title}</Text>
                <Text style={styles.bannerSubtitle}>{promo.subtitle}</Text>
                <TouchableOpacity
                  style={[
                    styles.bannerButton,
                    { backgroundColor: buttonColor, borderRadius },
                  ]}
                >
                  <Text style={[styles.bannerButtonText, { color: buttonTextColor }]}>
                    {buttonText}
                  </Text>
                </TouchableOpacity>
                {decision?.variationKey && (
                  <Text style={styles.variationLabel}>
                    Variation: {decision.variationKey}
                  </Text>
                )}
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {promotions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  banner: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
    justifyContent: 'center',
  },
  bannerImage: {
    opacity: 0.4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bannerContent: {
    maxWidth: '70%',
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textWhite,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    fontSize: 15,
    color: Colors.textWhite,
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bannerButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  variationLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    marginTop: 8,
    fontStyle: 'italic',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
  dotInactive: {
    backgroundColor: Colors.border,
  },
});

export default HeroBanner;
