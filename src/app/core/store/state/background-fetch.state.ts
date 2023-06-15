import { PossibleThreateningTracker, PossibleThreateningTrackerList } from "ble-background-scan/dist/esm/models/possible-threatening-treacker";

export interface BackgroundFetchState {
  hasStartedBackgroundFetch: boolean;
  isBackgroundPluginInitialized: boolean;
  hasErrorOnInitializingState: boolean;
  possibleMaliciousAirTags: PossibleThreateningTrackerList;
  possibleMaliciousSmartTags: PossibleThreateningTrackerList;
  possibleMaliciousTiles: PossibleThreateningTrackerList;
  selectedThreateningDevice: PossibleThreateningTracker | null;
}
