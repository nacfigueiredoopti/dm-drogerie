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
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Kostenloser Versand ab 49 €</Text>
        <TouchableOpacity>
          <Text style={styles.topBarLink}>Filiale finden</Text>
        </TouchableOpacity>
      </View>

      {/* Main Header */}
      <View style={styles.mainHeader}>
        {/* dm Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>dm</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Produkt oder Marke suchen..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>♡</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
            <Text style={styles.icon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.primaryDark,
  },
  topBarText: {
    color: Colors.textWhite,
    fontSize: 11,
    fontWeight: '400',
  },
  topBarLink: {
    color: Colors.textWhite,
    fontSize: 11,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  logoContainer: {
    backgroundColor: Colors.textWhite,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary,
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.textWhite,
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 40,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    padding: 6,
    position: 'relative',
  },
  icon: {
    fontSize: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: Colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
});

export default Header;
