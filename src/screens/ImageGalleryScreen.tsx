import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client/react';
import { useNavigation } from '@react-navigation/native';
import { GET_IMAGES } from '../graphql/queries';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setImages, toggleLike, ImageItem } from '../store/gallerySlice';
import ImageCard from '../components/ImageCard';

const ImageGalleryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  
  const { images, likedImageIds } = useAppSelector((state) => state.gallery);
  const [refreshing, setRefreshing] = useState(false);

  const { loading, error, data, refetch } = useQuery<{ images: ImageItem[] }>(GET_IMAGES, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.images) { 
      dispatch(setImages(data.images));
      setRefreshing(false);
    }
  }, [data, dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const result = await refetch();
      if (result.data?.images) {
        dispatch(setImages(result.data.images));
      }
    } finally {
      setRefreshing(false);
    }
  };

  const handleImagePress = (image: ImageItem) => {
    (navigation.navigate as any)('ImageDetails', { id: image.id });
  };

  const handleLike = (id: string) => {
    dispatch(toggleLike(id));
  };

  const renderItem = ({ item }: { item: ImageItem }) => {
    const isLiked = likedImageIds.includes(item.id);
    return (
      <ImageCard
        image={item}
        isLiked={isLiked}
        onPress={() => handleImagePress(item)}
        onLike={() => handleLike(item.id)}
      />
    );
  };

  if (loading && !refreshing && images.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Discovering beautiful moments...</Text>
      </View>
    );
  }

  if (error && images.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gallery</Text>
      </View>
      
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2d3436',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#636e72',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: '#d63031',
    fontWeight: '600',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ImageGalleryScreen;
