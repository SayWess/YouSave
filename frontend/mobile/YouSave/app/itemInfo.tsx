import { View, Image, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { RootState } from "@/store/store";
import { updateVideoState } from "@/store/videosSlice";
import { updatePlaylistState } from "@/store/playlistsSlice";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";

export default function ItemInfo() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const colors = useThemeColors();

  const items = id.length < 10 ? useSelector((state: RootState) => state.videos.items) : useSelector((state: RootState) => state.playlists.items);
  const updateItemState = id.length < 10 ? updateVideoState : updatePlaylistState;
  const item = items.find((item) => item.id === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <ThemedText variant="body" color="red">
          Item not found!
        </ThemedText>
      </View>
    );
  }

  // Store the initial title
  const [initialTitle] = useState(item.title);

  const handleUpdateTitle = (newTitle: string) => {
    dispatch(updateItemState({ id: item.id, newState: { title: newTitle } }));
  };

  const handleResetTitle = () => {
    handleUpdateTitle(initialTitle);
  };

  const handlePathUpdate = (newPath: string) => {
    dispatch(updateItemState({ id: item.id, newState: { storagePath: newPath } }));
  };

  const handleVideo = (newBool: boolean) => {
    dispatch(updateItemState({ id: item.id, newState: { video: newBool } }));
  }

  const handleSubtitles = (newBool: boolean) => {
    dispatch(updateItemState({ id: item.id, newState: { subtitles: newBool } }));
  }

  const handleQuality = (newQuality: string) => {
    dispatch(updateItemState({ id: item.id, newState: { quality: newQuality } }));
  }

  const handleDownload = () => {
    console.log(`Downloading:`);
    if (item.video) {
      console.log(`- Video in ${item.quality} quality`);
    }
    console.log(`- Subtitles: ${item.subtitles}`);
    // Replace this with your actual download logic
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      {/* Thumbnail */}
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

      <View style={styles.content}>
        {/* Editable Title */}
        <ThemedTextInput
          value={item.title}
          onChangeText={handleUpdateTitle}
          placeholder="Enter a new title"
          multiline={true} // Enable multiline input
          numberOfLines={2} // Suggest a number of lines
          style={[styles.titleInput]} // Adjust the height
        />

        <ThemedTextInput
          value={item.storagePath}
          onChangeText={handlePathUpdate}
          placeholder="Enter a new path"
          style={[styles.titleInput]}
        />

        {/* Download Options */}
        <View style={styles.optionsContainer}>
          {/* Video Toggle */}
          <View style={styles.optionRow}>
            <ThemedText variant="body" color="greyDark">
              Download Video
            </ThemedText>
            <Switch
              value={item.video}
              onValueChange={handleVideo}
              trackColor={{ false: colors.greyMedium, true: colors.tint }}
            />
          </View>

          {/* Quality Selector */}
          {item.video && (
            <View style={styles.qualitySelector}>
              <ThemedText variant="body" color="greyDark">
                Video Quality:
              </ThemedText>
              <Picker
                selectedValue={item.quality}
                onValueChange={(itemValue: string) => handleQuality(itemValue)}
              >
                <Picker.Item label="1080p" value="1080p"/>
                <Picker.Item label="720p" value="720p" />
                <Picker.Item label="480p" value="480p" />
              </Picker>
            </View>
          )}

          {/* Subtitles Toggle */}
          <View style={styles.optionRow}>
            <ThemedText variant="body" color="greyDark">
              Include Subtitles
            </ThemedText>
            <Switch
              value={item.subtitles}
              onValueChange={handleSubtitles}
              trackColor={{ false: colors.greyMedium, true: colors.tint }}
            />
          </View>

          {/* Download Button */}
          <TouchableOpacity
            style={[styles.downloadButton, { backgroundColor: colors.tint }]}
            onPress={handleDownload}
          >
            <ThemedText variant="button" color="greyDark">
                {item.state === "downloading" ? "Downloading..." : item.state === "downloaded" ? "Downloaded" : "Start Download"}
            </ThemedText>
          </TouchableOpacity>

        </View>
        {/* End of Download Options */}

        <TouchableOpacity onPress={handleResetTitle} style={styles.resetButton}>
            <ThemedText variant="button" color="greyDark">
              Reset Title
            </ThemedText>
          </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  thumbnail: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  qualitySelector: {
    marginBottom: 16,
  },
  downloadButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
});
