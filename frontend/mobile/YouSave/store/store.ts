import { configureStore } from "@reduxjs/toolkit";
import videosReducer, { selectVideos } from "./videosSlice";
import playlistsReducer, { selectPlaylists } from "./playlistsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY_VIDEOS, STORAGE_KEY_PLAYLISTS } from "@/constants/StorageKeys";

// Middleware to save the videos slice to AsyncStorage whenever it changes
const saveToStorageMiddleware = (store: any) => (next: any) => async (action: any) => {
  const result = next(action); // Pass the action to the next middleware/reducer
  const state = store.getState(); // Get the latest state

  console.log("Saving to storage", action.type);
  if (action.type.startsWith("videos/")) {
    const videos = selectVideos(state); // Select the videos slice
    await AsyncStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(videos)); // Save to AsyncStorage
  }

  if (action.type.startsWith("playlists/")) {
    const playlists = selectPlaylists(state); // Select the videos slice
    await AsyncStorage.setItem(STORAGE_KEY_PLAYLISTS, JSON.stringify(playlists)); // Save to AsyncStorage
  }
  return result;
};

// Configure store with the middleware
const store = configureStore({
  reducer: {
    videos: videosReducer,
    playlists: playlistsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToStorageMiddleware),
});

export default store;

// Export RootState and AppDispatch for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;