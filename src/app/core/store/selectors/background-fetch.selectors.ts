import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { BackgroundFetchState } from "../state/background-fetch.state";
import { PossibleThreateningTracker, PossibleThreateningTrackerList } from "ble-background-scan/dist/esm/models/possible-threatening-treacker";


export const selectBackgroundFetchState = (state: AppState) => state.backgroundFetchState;

export const selectHasStartedBackgroundFetch = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): boolean => state.hasStartedBackgroundFetch
);

export const selectIsBackgroundFetchPluginInitialized = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): boolean => state.isBackgroundPluginInitialized
);

export const selectPossibleThreateningAirTags = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): PossibleThreateningTrackerList => state.possibleMaliciousAirTags
);

export const selectPossibleThreateningSmartTags = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): PossibleThreateningTrackerList => state.possibleMaliciousSmartTags
);

export const selectPossibleThreateningTiles = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): PossibleThreateningTrackerList => state.possibleMaliciousTiles
);

export const selectSelectedPossibleThreat = createSelector(
  selectBackgroundFetchState,
  (state: BackgroundFetchState): PossibleThreateningTracker | null => state.selectedThreateningDevice
);
