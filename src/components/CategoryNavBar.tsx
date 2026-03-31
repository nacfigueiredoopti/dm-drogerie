import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Category } from '../data/categories';

interface CategoryNavBarProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryPress: (category: Category) => void;
}

const extraTabs = [
  { id: 'neu', name: 'Neu' },
  { id: 'marken', name: 'Marken' },
];

const trailingTabs = [
  { id: 'aktionen', name: 'Aktionen' },
];

const CategoryNavBar: React.FC<CategoryNavBarProps> = ({
  categories,
  activeCategory,
  onCategoryPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {extraTabs.map((tab) => (
          <TouchableOpacity key={tab.id} style={styles.tab} activeOpacity={0.7}>
            <Text style={styles.tabText}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onCategoryPress(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.tabText, isActive && styles.tabTextActive]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        {trailingTabs.map((tab) => (
          <TouchableOpacity key={tab.id} style={styles.tab} activeOpacity={0.7}>
            <Text style={styles.tabText}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 0,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.dmBlue,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dmBlue,
  },
  tabTextActive: {
    fontWeight: '700',
  },
});

export default CategoryNavBar;
