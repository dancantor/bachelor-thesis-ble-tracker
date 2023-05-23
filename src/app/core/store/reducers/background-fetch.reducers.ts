import { createReducer, on } from "@ngrx/store";
import { BackgroundFetchState } from "../state/background-fetch.state";
import * as BackgroundFetchActions from "../actions/background-fetch.actions"

const initialBackgroundFetchState: BackgroundFetchState = {
  hasStartedBackgroundFetch: false,
  isBackgroundPluginInitialized: false
};

export const backgroundFetchReducer = createReducer(
  initialBackgroundFetchState,
  on(BackgroundFetchActions.changeHasStartedBackgroundFetchStatus, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    hasStartedBackgroundFetch: action.hasStartedBackgroundFetchStatus
  })),
  on(BackgroundFetchActions.changeisBackgroundFetchPluginInitializedStatus, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    isBackgroundPluginInitialized: action.isBackgroundPluginInitialized
  }))
);
