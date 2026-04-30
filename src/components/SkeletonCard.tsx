import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const SkeletonCard: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View style={[styles.skeletonCard, { opacity: pulseAnim }]}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonAuthor} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  skeletonImage: {
    width: '100%',
    height: cardWidth * 1.2,
    backgroundColor: '#e1e1e1',
  },
  skeletonContent: {
    padding: 12,
  },
  skeletonTitle: {
    height: 14,
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  skeletonAuthor: {
    height: 12,
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
    width: '50%',
  },
});

export default SkeletonCard;
