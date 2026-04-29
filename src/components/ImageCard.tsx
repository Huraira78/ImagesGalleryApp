import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageItem } from '../store/gallerySlice';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; 

interface ImageCardProps {
  image: ImageItem;
  isLiked: boolean;
  onPress: () => void;
  onLike: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, isLiked, onPress, onLike }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  
  useEffect(() => {
    if (isLiked) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isLiked, scaleAnim]);

  const handleLikePress = () => {
    onLike();
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={{ uri: image.imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {image.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          By {image.author}
        </Text>
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={handleLikePress} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Icon 
                name={isLiked ? "heart" : "heart-outline"} 
                size={22} 
                color={isLiked ? "#ff4757" : "#2d3436"} 
                style={styles.heartIcon} 
              />
            </Animated.View>
          </TouchableOpacity>
          <Text style={[styles.likeCount, isLiked && styles.likedText]}>
            {image.likes}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  image: {
    width: '100%',
    height: cardWidth * 1.2,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: '#636e72',
    marginBottom: 8,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 6,
  },
  likeCount: {
    fontSize: 13,
    color: '#636e72',
    fontWeight: '600',
  },
  likedText: {
    color: '#ff4757',
  },
});

export default ImageCard;
