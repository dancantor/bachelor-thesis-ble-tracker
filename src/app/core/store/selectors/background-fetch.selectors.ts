import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { BackgroundFetchState } from "../state/background-fetch.state";


export const selectBackgroundFetchState = (state: AppState) => state.backgroundFetchState;

export const selectHasStartedBackgroundFetch = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): boolean => state.hasStartedBackgroundFetch
);

export const selectIsBackgroundFetchPluginInitialized = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): boolean => state.isBackgroundPluginInitialized
);
