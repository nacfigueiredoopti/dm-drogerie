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
const BANNER_HEIGHT = 260;

const colorMap: Record<string, string> = {
  red: '#E30613',
  blue: '#002d72',
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
  return colorMap[color?.toLowerCase()] || color || Colors.dmBlue;
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
                {/* Content card overlay like dm.de */}
                <View style={styles.contentCard}>
                  <Text style={styles.bannerTitle}>{promo.title}</Text>
                  <Text style={styles.bannerSubtitle}>{promo.subtitle}</Text>
                  <TouchableOpacity
                    style={[
                      styles.bannerButton,
                      { backgroundColor: buttonColor, borderRadius },
                    ]}
                  >
                    <Text style={[styles.bannerButtonText, { color: buttonTextColor }]}>
                      → {buttonText}
                    </Text>
                  </TouchableOpacity>
                  {decision?.variationKey && (
                    <Text style={styles.variationLabel}>
                      Variation: {decision.variationKey}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            {/* Navigation arrow */}
            <TouchableOpacity style={styles.navArrow}>
              <Text style={styles.navArrowText}>›</Text>
            </TouchableOpacity>
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
    opacity: 0.85,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bannerContent: {
    alignItems: 'flex-end',
  },
  contentCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 4,
    padding: 20,
    maxWidth: '55%',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.dmBlue,
    marginBottom: 6,
    lineHeight: 30,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: Colors.textBody,
    marginBottom: 14,
    lineHeight: 20,
  },
  bannerButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dmBlue,
  },
  variationLabel: {
    color: Colors.textLight,
    fontSize: 9,
    marginTop: 8,
    fontStyle: 'italic',
  },
  navArrow: {
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
  navArrowText: {
    fontSize: 24,
    color: Colors.dmBlue,
    fontWeight: '300',
    marginTop: -2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: Colors.dmBlue,
  },
  dotInactive: {
    backgroundColor: Colors.border,
  },
});

export default HeroBanner;
