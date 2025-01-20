import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  title: string;
  thumbnail: string;
  state: "idle" | "downloading" | "downloaded";
}

interface ListState<T extends Item> {
  items: T[];
}

export function createListSlice<T extends Item>({
  name,
  initialItems = [],
}: {
  name: string;
  initialItems?: T[];
}) {
  const initialState: ListState<T> = {
    items: initialItems,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      loadItems(state, action: PayloadAction<T[]>) {
        // Directly assigning the payload to `state.items`
        state.items = action.payload as Draft<T>[]; // Explicitly cast if needed
      },
      addItem(state, action: PayloadAction<T>) {
        state.items.push(action.payload as Draft<T>); // Explicitly cast if needed
      },
      updateItemState(
        state,
        action: PayloadAction<{ id: string; newState: Partial<T> }>
      ) {
        const { id, newState } = action.payload;
        const item = state.items.find((item) => item.id === id);
        if (item) {
          Object.assign(item, newState);
        }
      },
    },
  });

  return slice;
}
