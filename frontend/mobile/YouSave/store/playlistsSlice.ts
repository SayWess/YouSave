import { createListSlice } from "@/store/listSliceFactory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY_PLAYLISTS } from "@/constants/StorageKeys";


export interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  state: "idle" | "downloading" | "downloaded";
}

const playlistsSlice = createListSlice<Playlist>({
  name: "playlists",
  initialItems: [],
});

export const {
  loadItems: loadPlaylists,
  addItem: addPlaylist,
  updateItemState: updatePlaylistState,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;

export const selectPlaylists = (state: { playlists: { items: Playlist[] }; }) => state.playlists.items;

// Async action to load videos from AsyncStorage

export const loadVideosFromStorage = () => async (dispatch: any) => {
    console.log("PlaylistsSlice.ts : Loading playlists")
    const storedVideos = await AsyncStorage.getItem(STORAGE_KEY_PLAYLISTS);
    const videos = storedVideos ? JSON.parse(storedVideos) : [];
    console.log("PlaylistsSlice.ts : Loaded")
    dispatch(loadPlaylists(videos));
};