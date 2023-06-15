import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "./state/app.state";
import { backgroundFetchReducer } from "./reducers/background-fetch.reducers";
import { hydrationMetaReducer, storePersistenceReducer } from "./reducers/store-persistence.reducers";
import { liveScanningReducer } from "./reducers/live-scanning.reducers";
import { settingsReducer } from "./reducers/settings.reducers";


export const reducers: ActionReducerMap<AppState> = {
  backgroundFetchState: backgroundFetchReducer,
  storePersistenceState: storePersistenceReducer,
  liveScanningState: liveScanningReducer,
  settingsState: settingsReducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer]
