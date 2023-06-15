import { createReducer, on } from "@ngrx/store";
import { LiveScanningState } from "../state/live-scanning.state";
import * as LiveScanningActions from "../actions/live-scanning.actions"


export const initialLiveScanningState: LiveScanningState = {
  isScanning: false,
  scannedDevices: []
};

export const liveScanningReducer = createReducer(
  initialLiveScanningState,
  on(LiveScanningActions.beginScanningForDevices, (liveScanningState: LiveScanningState, _) => ({
    ...liveScanningState,
    isScanning: true
  })),
  on(LiveScanningActions.stopScanningForDevices, (liveScanningState: LiveScanningState, _) => ({
    ...liveScanningState,
    isScanning: false
  })),
  on(LiveScanningActions.addScanResult, (liveScanningState: LiveScanningState, action) => {
    return {
      ...liveScanningState,
      scannedDevices: [action.scanResult, ...liveScanningState.scannedDevices.filter((scanResult) => scanResult.deviceId !== action.scanResult.deviceId)]
    }
  })
);
