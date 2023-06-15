import { LiveScanningResult } from '@ble/data/live-scanning-result';
import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { LiveScanningState } from "../state/live-scanning.state";

export const selectLiveScanningState = (state: AppState) => state.liveScanningState;

export const selectScanResults = createSelector(
  selectLiveScanningState,
  (state: LiveScanningState): LiveScanningResult[] => state.scannedDevices
);
