import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';

interface HeaderProps {
  onCartPress?: () => void;
  cartCount?: number;
}

const Header: React.FC<HeaderProps> = ({ onCartPress, cartCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Top Nav Links */}
      <View style={styles.topBar}>
        <View style={styles.topBarLinks}>
          <TouchableOpacity>
            <Text style={styles.topBarLink}>Nachhaltigkeit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.topBarLink}>Tipps & Trends</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.topBarLink}>Rezepte</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.topBarLink}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.topBarLink}>Kundenservice</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topBarLogos}>
          <View style={[styles.partnerBadge, { backgroundColor: '#002d72' }]}>
            <Text style={styles.partnerBadgeText}>PAYBACK</Text>
          </View>
        </View>
      </View>

      {/* Main Header */}
      <View style={styles.mainHeader}>
        {/* dm Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>dm</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Suchen und finden"
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconEmoji}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconEmoji}>♡</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
            <Text style={styles.iconEmoji}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>🚚</Text>
          <Text style={styles.infoText}>Kostenloser Versand ab 59 € mit dm-Konto</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>🏪</Text>
          <Text style={styles.infoText}>Online bestellen & nach 2 Stunden abholen</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>✓</Text>
          <Text style={styles.infoText}>Dauerpreis - dauerhaft günstig einkaufen</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  topBarLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  topBarLink: {
    color: Colors.dmBlue,
    fontSize: 11,
    fontWeight: '400',
  },
  topBarLogos: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  partnerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  partnerBadgeText: {
    color: Colors.textWhite,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  logoContainer: {
    backgroundColor: Colors.background,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.primary,
    fontStyle: 'italic',
    letterSpacing: -2,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dmBlue,
    borderRadius: 8,
    height: 42,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textBody,
    paddingHorizontal: 14,
    padding: 0,
  },
  searchButton: {
    width: 42,
    height: '100%',
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.divider,
  },
  searchIcon: {
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  iconEmoji: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: Colors.textWhite,
    fontSize: 10,
    fontWeight: '700',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  infoIcon: {
    fontSize: 12,
  },
  infoText: {
    fontSize: 10,
    color: Colors.dmBlue,
    fontWeight: '400',
  },
  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.divider,
    marginHorizontal: 8,
  },
});

export default Header;
