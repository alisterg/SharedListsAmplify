import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./index";
import { Auth, DataStore } from "aws-amplify";

export interface SettingsState {
  showingComplete: boolean;
  isDeleting: boolean;
  isLoggedIn: boolean;
}

const initialState: SettingsState = {
  showingComplete: true,
  isDeleting: false,
  isLoggedIn: false, // NOTE: this is not used because Amplify is handling auth
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleShowingComplete: (state) => {
      state.showingComplete = !state.showingComplete;
    },
    toggleIsDeleting: (state) => {
      state.isDeleting = !state.isDeleting;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { toggleShowingComplete, toggleIsDeleting, setLoggedOut } =
  settingsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const logoutAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoggedOut());

  await DataStore.clear();
  await Auth.signOut();
  window.location.reload();
};

export const selectShowingComplete = (state: RootState) =>
  state.settings.showingComplete;
export const selectIsDeleting = (state: RootState) => state.settings.isDeleting;
export default settingsSlice.reducer;
