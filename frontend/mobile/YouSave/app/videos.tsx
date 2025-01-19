import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadVideosFromStorage, updateVideoState } from "@/store/videosSlice";
import { ItemListPage } from "@/components/ItemListPage";

export default function VideosPage() {
  const videos = useSelector((state: RootState) => state.videos.items);

  console.log("Videos", videos)
  return (
    <ItemListPage
      data={videos}
      loadData={loadVideosFromStorage}
      updateState={updateVideoState}
    />
  );
}
