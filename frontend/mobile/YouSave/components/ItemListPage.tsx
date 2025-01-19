import React, { useEffect } from "react";
import { FlatList, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";

interface Item {
  id: string;
  title: string;
  thumbnail: string;
  state: "idle" | "downloading" | "downloaded";
}

interface ItemListPageProps {
  data: Item[];
  loadData: () => any; // Action creator for loading data
  updateState: (payload: { id: string; newState: Partial<Item> }) => any; // Action creator for updating state
}

export const ItemListPage: React.FC<ItemListPageProps> = ({
  data,
  loadData,
  updateState,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const colors = useThemeColors();

  console.log("ItemListPage", data);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const handleAction = (id: string) => {
    // Trigger the update state action
    dispatch(updateState({ id, newState: { state: "downloading" } }));

    // Simulate a delay for the "downloaded" state
    setTimeout(() => {
      dispatch(updateState({ id, newState: { state: "downloaded" } }));
    }, 3000);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View
      style={[styles.itemContainer, { backgroundColor: colors.backgroundSecondary }]}
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
          onPress={() => handleAction(item.id)}
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
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
