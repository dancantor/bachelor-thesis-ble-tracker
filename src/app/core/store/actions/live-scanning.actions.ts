import { LiveScanningResult } from "@ble/data/live-scanning-result";
import { createAction, props } from "@ngrx/store";

export const initializeBleUse = createAction(
  '[Live Scan] Initialize BLE use'
);

export const beginScanningForDevices = createAction(
  '[Live Scan] Begin scanning for devices'
);

export const stopScanningForDevices = createAction (
  '[Live Scan] Stop scanning for devices'
)

export const addScanResult = createAction (
  '[Live Scan] Add scan result',
  props<{scanResult: LiveScanningResult}>()
)
