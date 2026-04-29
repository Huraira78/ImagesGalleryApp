import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleLike } from '../store/gallerySlice';

const { width, height } = Dimensions.get('window');

const ImageDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { id } = route.params;

  // Read the image perfectly from Redux
  const image = useAppSelector((state) => state.gallery.images.find((i) => i.id === id));
  
  // Read liked status from Redux
  const likedImageIds = useAppSelector((state) => state.gallery.likedImageIds);
  const isLiked = likedImageIds.includes(id);

  // Animation 1 — Image Zoom on Entry
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Animation 2 — Heart Like Animation (Floating upward)
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const floatOpacity = useRef(new Animated.Value(0)).current;
  const floatScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fire image zoom entry animation exactly as requested
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnim, scaleAnim]);

  const handleLike = () => {
    dispatch(toggleLike(id));
    
    // Only fire the beautiful floating heart animation when "Liking" (not unliking)
    if (!isLiked) {
      setShowFloatingHeart(true);
      floatAnim.setValue(0);
      floatOpacity.setValue(0);
      floatScale.setValue(0);

      // Sequence: scale up from 0 to 1.3, then scale down to 1 while floating up and fading out
      Animated.sequence([
        Animated.parallel([
          Animated.timing(floatScale, { toValue: 1.3, duration: 250, useNativeDriver: true }),
          Animated.timing(floatOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(floatScale, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: -150, duration: 700, useNativeDriver: true }),
          Animated.timing(floatOpacity, { toValue: 0, duration: 700, useNativeDriver: true, delay: 100 }),
        ])
      ]).start(() => {
        setShowFloatingHeart(false);
      });
    }
  };

  if (!image) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={{ uri: image.imageUrl }}
        style={[
          styles.image,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="cover"
      />
      
      {/* Absolute Back Button */}
      <View style={styles.backButtonSafeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color="#2d3436" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.detailsContainer} contentContainerStyle={styles.detailsContent}>
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.author}>Captured by {image.author}</Text>
        
        <View style={styles.likesRow}>
          <Icon name="heart" size={22} color="#ff4757" />
          <Text style={styles.likesCount}>{image.likes} Total Likes</Text>
        </View>

        <Text style={styles.descriptionLabel}>About this moment</Text>
        <Text style={styles.description}>{image.description}</Text>
      </ScrollView>

      {/* Floating Action Button (Like) */}
      <TouchableOpacity 
        style={[styles.fab, isLiked && styles.fabLiked]} 
        onPress={handleLike}
        activeOpacity={0.8}
      >
        <Icon name={isLiked ? "heart" : "heart-outline"} size={28} color={isLiked ? "#fff" : "#ff4757"} />
      </TouchableOpacity>

      {/* Floating Heart Animation overlay perfectly positioned above FAB */}
      {showFloatingHeart && (
        <Animated.View
          style={[
            styles.floatingHeart,
            {
              opacity: floatOpacity,
              transform: [
                { translateY: floatAnim },
                { scale: floatScale }
              ]
            }
          ]}
          pointerEvents="none"
        >
          <Icon name="heart" size={60} color="#ff4757" />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: width,
    height: height * 0.55,
  },
  backButtonSafeArea: {
    position: 'absolute',
    top: 0,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -40,
    paddingTop: 36,
  },
  detailsContent: {
    paddingHorizontal: 28,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2d3436',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  author: {
    fontSize: 18,
    color: '#a4b0be',
    fontWeight: '700',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  likesCount: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '800',
    color: '#2d3436',
  },
  descriptionLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#636e72',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 28,
    bottom: 40,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 50,
  },
  fabLiked: {
    backgroundColor: '#ff4757',
  },
  floatingHeart: {
    position: 'absolute',
    right: 28,
    bottom: 40,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  }
});

export default ImageDetailsScreen;
