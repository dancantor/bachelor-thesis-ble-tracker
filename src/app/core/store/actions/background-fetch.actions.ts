import { createAction, props } from "@ngrx/store";

export const changeHasStartedBackgroundFetchStatus = createAction(
  '[App state] Change hasStartedBackgroundFetch status',
  props<{hasStartedBackgroundFetchStatus: boolean}>()
);

export const changeisBackgroundFetchPluginInitializedStatus = createAction(
  '[App state] Change isBackgroundPluginInitialized status',
  props<{isBackgroundPluginInitialized: boolean}>()
);
