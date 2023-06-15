import { PossibleThreatsByDeviceModel } from "@ble/data/background-scan-result";
import { createAction, props } from "@ngrx/store";
import { PossibleThreateningTracker } from "ble-background-scan/dist/esm/models/possible-threatening-treacker";

export const initializeBackgroundScanPlugin = createAction(
  '[Background Fetch] Initialize background scan plugin'
);

export const initializedBackgroundScanPluginSuccess = createAction(
  '[Background Fetch] Initialized background scan plugin successfully'
);

export const initializedBackgroundScanPluginFail = createAction(
  '[Background Fetch] Error on initializing background scan plugin'
);

export const initializeWorkers = createAction(
  '[Background Fetch] Initialize workers'
);

export const initializedWorkersSuccess = createAction(
  '[Background Fetch] Initialized workers successfully'
);

export const initializedWorkersFail = createAction(
  '[Background Fetch] Error on initializing workers'
);

export const fetchThreateningDevices = createAction(
  '[Background Fetch] Fetch threatening devices'
);

export const fetchedThreateningDevicesSuccessfully = createAction(
  '[Background Fetch] Get threatening devices',
  props<{possibleThreatsByDeviceModel: PossibleThreatsByDeviceModel}>()
);

export const fetchedThreateningDevicesFail = createAction(
  '[Background Fetch] Get threatening devices'
);

export const setSelectedThreateningDevice = createAction(
  '[Background Fetch] Set selected threatening device',
  props<{possibleThreateningTracker: PossibleThreateningTracker}>()
)
