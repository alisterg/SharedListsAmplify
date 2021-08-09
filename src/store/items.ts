import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./index";
import { DataStore } from "aws-amplify";
import { List, ListItem } from "../models";
import cloneDeep from "lodash/cloneDeep";

type sortedItemsType = { [listId: string]: ListItem[] };

export interface ItemsState {
  sortedItems: sortedItemsType;
  lists: List[];
  itemsSubscription: any;
  listsSubscription: any;
}

const initialState: ItemsState = {
  sortedItems: {},
  lists: [],
  itemsSubscription: null,
  listsSubscription: null,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setSortedItems: (state, action: PayloadAction<sortedItemsType>) => {
      console.log("[setSortedItems]", action.payload);
      state.sortedItems = action.payload;
    },
    setLists: (state, action: PayloadAction<List[]>) => {
      console.log("[setLists]", action.payload);
      state.lists = action.payload;
    },
    setItemsSubscription: (state, action: PayloadAction<any>) => {
      state.itemsSubscription = action.payload;
    },
    setListsSubscription: (state, action: PayloadAction<any>) => {
      state.listsSubscription = action.payload;
    },
  },
});

export const {
  setSortedItems,
  setLists,
  setItemsSubscription,
  setListsSubscription,
} = itemsSlice.actions;

export const fetchItemsAsync = (): AppThunk => async (dispatch) => {
  const itemsResult = await DataStore.query(ListItem);

  let sortedItems: sortedItemsType = {};

  for (let i of itemsResult) {
    if (i.listID === undefined) continue;
    if (!sortedItems[i.listID]) sortedItems[i.listID] = [];

    const itemClone = cloneDeep(i);
    sortedItems[i.listID].push(itemClone);
  }

  for (let l in sortedItems) {
    sortedItems[l].sort((a, b) => (a.indexInList || 0) - (b.indexInList || 0));
  }

  dispatch(setSortedItems(sortedItems));
};

export const fetchListsAsync = (): AppThunk => async (dispatch) => {
  const listsResult = await DataStore.query(List);
  dispatch(setLists(listsResult));
};

export const editItemAsync =
  (item: ListItem, newTitle: string): AppThunk =>
  async (dispatch) => {
    await DataStore.save(
      ListItem.copyOf(item, (updated) => {
        updated.title = newTitle;
      })
    ); // Could play a saving animation here

    dispatch(fetchItemsAsync());
  };

export const toggleItemCompleteAsync =
  (item: ListItem): AppThunk =>
  async (dispatch) => {
    await DataStore.save(
      ListItem.copyOf(item, (updated) => {
        updated.isComplete = !item.isComplete;
      })
    );

    dispatch(fetchItemsAsync());
  };

export const reorderItemAsync =
  (
    sourceIdx: number,
    destIdx: number,
    sourceListId: string,
    destListId: string
  ): AppThunk =>
  async (dispatch, getState) => {
    const saveReorderedItems = (itemsInList: ListItem[], listId: string) => {
      itemsInList.forEach((i, idx) => {
        DataStore.save(
          ListItem.copyOf(i, (updated) => {
            updated.listID = listId;
            updated.indexInList = idx;
          })
        );
      });
    };

    const sortedItems = getState().items.sortedItems;

    if (sourceListId === destListId) {
      const itemsInList = cloneDeep(sortedItems![destListId]);

      const [removed] = itemsInList.splice(sourceIdx, 1);
      itemsInList.splice(destIdx, 0, removed);

      saveReorderedItems(itemsInList, destListId);
    } else {
      const itemsInSourceList = cloneDeep(sortedItems![sourceListId]);
      let itemsInDestList = cloneDeep(sortedItems![destListId]);

      if (!itemsInDestList) itemsInDestList = [];

      const [removed] = itemsInSourceList.splice(sourceIdx, 1);
      itemsInDestList.splice(destIdx, 0, removed);

      saveReorderedItems(itemsInSourceList, sourceListId);
      saveReorderedItems(itemsInDestList, destListId);
    }
  };

export const editListAsync =
  (list: List, newTitle: string): AppThunk =>
  async (dispatch) => {
    await DataStore.save(
      List.copyOf(list, (updated) => {
        updated.name = newTitle;
      })
    ); // Could play a saving animation here

    dispatch(fetchItemsAsync());
  };

export const selectItems = (state: RootState) => state.items.sortedItems;
export const selectLists = (state: RootState) => state.items.lists;
export default itemsSlice.reducer;
