import { BackgroundFetchState } from "./background-fetch.state";
import { LiveScanningState } from "./live-scanning.state";
import { SettingsState } from "./settings.state";
import { StorePersistenceState } from "./store-persistence.state";

export interface AppState {
  backgroundFetchState: BackgroundFetchState;
  storePersistenceState: StorePersistenceState
  liveScanningState: LiveScanningState;
  settingsState: SettingsState;
}
