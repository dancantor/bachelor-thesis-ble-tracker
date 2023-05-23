import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "./state/app.state";
import { backgroundFetchReducer } from "./reducers/background-fetch.reducers";
import { hydrationMetaReducer, storePersistenceReducer } from "./reducers/store-persistence.reducers";


export const reducers: ActionReducerMap<AppState> = {
  backgroundFetchState: backgroundFetchReducer,
  storePersistenceState: storePersistenceReducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer]
