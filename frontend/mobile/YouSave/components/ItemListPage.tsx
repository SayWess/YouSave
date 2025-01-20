import React, { useEffect } from "react";
import { FlatList, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import ItemView from "@/components/ItemView";
import { Item } from "@/types";

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

  // Fetch data when the component mounts
  useEffect(() => {
    if (data.length === 0) {
      // Load data if it's not already loaded
      dispatch(loadData());
    }
  }, []);

  const handleAction = (id: string) => {
    // Trigger the update state action
    dispatch(updateState({ id, newState: { state: "downloading" } }));

    // Simulate a delay for the "downloaded" state
    setTimeout(() => {
      dispatch(updateState({ id, newState: { state: "downloaded" } }));
    }, 3000);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <ItemView item={item} handleAction={handleAction} />
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
  }
});
