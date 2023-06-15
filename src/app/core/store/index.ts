import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "./state/app.state";
import { backgroundFetchReducer } from "./reducers/background-fetch.reducers";
import { hydrationMetaReducer, storePersistenceReducer } from "./reducers/store-persistence.reducers";
import { liveScanningReducer } from "./reducers/live-scanning.reducers";


export const reducers: ActionReducerMap<AppState> = {
  backgroundFetchState: backgroundFetchReducer,
  storePersistenceState: storePersistenceReducer,
  liveScanningState: liveScanningReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer]
