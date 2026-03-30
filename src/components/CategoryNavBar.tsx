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
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onCategoryPress(category)}
              activeOpacity={0.7}
            >
              <Text style={styles.tabIcon}>{category.icon}</Text>
              <Text
                style={[styles.tabText, isActive && styles.tabTextActive]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    gap: 6,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabIcon: {
    fontSize: 14,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  tabTextActive: {
    color: Colors.textWhite,
  },
});

export default CategoryNavBar;
