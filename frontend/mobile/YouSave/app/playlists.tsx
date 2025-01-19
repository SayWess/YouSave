import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadVideosFromStorage, updatePlaylistState } from "@/store/playlistsSlice";
import { ItemListPage } from "@/components/ItemListPage";

export default function PlaylistsPage() {
  const playlists = useSelector((state: RootState) => state.playlists.items);

  return (
    <ItemListPage
      data={playlists}
      loadData={loadVideosFromStorage}
      updateState={updatePlaylistState}
    />
  );
}

