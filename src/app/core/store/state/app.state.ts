import { BackgroundFetchState } from "./background-fetch.state";
import { StorePersistenceState } from "./store-persistence.state";

export interface AppState {
  backgroundFetchState: BackgroundFetchState;
  storePersistenceState: StorePersistenceState
}
