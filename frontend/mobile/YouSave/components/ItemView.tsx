import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRouter } from 'expo-router';
import { Item } from "@/types"; // Interface Item

interface ItemViewProps {
  item: Item;
  handleAction: (id: string) => void;
}

export default function ItemView({ item, handleAction }: ItemViewProps) {
  const colors = useThemeColors();

  const router = useRouter();

  const handleNavigate = () => {
    // Navigate to the ItemInfo screen, passing the item ID
      router.push({
        pathname: "/itemInfo",
        params: { id: item.id },
      });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={[styles.itemContainer, { backgroundColor: colors.backgroundSecondary }]}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

      <View style={styles.infoContainer}>
        <ThemedText variant="body" color="greyDark" style={styles.title}>
          {item.title}
        </ThemedText>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor:
                item.state === "downloaded" ? colors.greyMedium : colors.tint,
            },
          ]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the parent `TouchableOpacity`
            handleAction(item.id);
          }}
          disabled={item.state !== "idle"}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
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
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
});
