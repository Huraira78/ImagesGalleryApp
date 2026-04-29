import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImageItem {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  description: string;
  likes: number;
}

export interface GalleryState {
  images: ImageItem[];
  likedImageIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  images: [],
  likedImageIds: [],
  loading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<ImageItem[]>) {
      state.images = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const imageId = action.payload;
      const isLiked = state.likedImageIds.includes(imageId);
      
      if (isLiked) {
        state.likedImageIds = state.likedImageIds.filter(id => id !== imageId);
      } else {
        state.likedImageIds.push(imageId);
      }

      const imageIndex = state.images.findIndex(img => img.id === imageId);
      if (imageIndex !== -1) {
        if (isLiked) {
          state.images[imageIndex].likes -= 1;
        } else {
          state.images[imageIndex].likes += 1;
        }
      }
    },
  },
});

export const { setImages, setLoading, setError, toggleLike } = gallerySlice.actions;
export default gallerySlice.reducer;
