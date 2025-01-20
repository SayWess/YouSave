import { createListSlice } from "@/store/listSliceFactory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY_VIDEOS } from "@/constants/StorageKeys";
import { Video } from "@/types/item";

const videosSlice = createListSlice<Video>({
  name: "videos",
  initialItems: [],
});

export const { loadItems: loadVideos, addItem: addVideo, updateItemState: updateVideoState } =
  videosSlice.actions;

export default videosSlice.reducer;

// Async action to load videos from AsyncStorage

export const loadVideosFromStorage = () => async (dispatch: any) => {
    console.log("Loading videos")
    const storedVideos = await AsyncStorage.getItem(STORAGE_KEY_VIDEOS);
    const videos = storedVideos ? JSON.parse(storedVideos) : [];
    console.log("Loaded")
    dispatch(loadVideos(videos));
};

export const selectVideos = (state: { videos: { items: Video[] } }) => state.videos.items;

// export default videosSlice.reducer;
