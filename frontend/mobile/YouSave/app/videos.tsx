import React, { useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  state: "idle" | "downloading" | "downloaded";
}

const initialVideos: Video[] = [
  {
    id: "1",
    title: "React Native Tutorial",
    thumbnail: "https://via.placeholder.com/150",
    state: "idle",
  },
  {
    id: "2",
    title: "Learn JavaScript Basics With SayWess and his team at the School of Code",
    thumbnail: "https://via.placeholder.com/150",
    state: "idle",
  },
  {
    id: "3",
    title: "Building Apps with Expo",
    thumbnail: "https://via.placeholder.com/150",
    state: "idle",
  },
];

export default function VideosPage() {
  const colors = useThemeColors();
  const [videos, setVideos] = useState<Video[]>(initialVideos);

  const handleDownload = (id: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, state: "downloading" } : video
      )
    );

    // Simulate download process
    setTimeout(() => {
      setVideos((prev) =>
        prev.map((video) =>
          video.id === id ? { ...video, state: "downloaded" } : video
        )
      );
      alert(`Download completed for video ${id}`);
    }, 2000);
  };

  const renderVideoItem = ({ item }: { item: Video }) => (
    <View style={[styles.videoItem, { backgroundColor: colors.backgroundSecondary }]}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <ThemedText variant="body" color="greyDark" style={styles.title}>
          {item.title}
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.downloadButton,
            {
              backgroundColor:
                item.state === "downloaded"
                  ? colors.greyMedium
                  : colors.tint,
            },
          ]}
          onPress={() => handleDownload(item.id)}
          disabled={item.state === "downloading" || item.state === "downloaded"}
        >
          <ThemedText variant="button" color="white">
            {item.state === "downloading"
              ? "Downloading..."
              : item.state === "downloaded"
              ? "Downloaded"
              : "Download"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={renderVideoItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  downloadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
});
