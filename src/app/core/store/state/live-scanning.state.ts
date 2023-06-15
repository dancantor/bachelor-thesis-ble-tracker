import { LiveScanningResult } from "@ble/data/live-scanning-result";

export interface LiveScanningState {
  scannedDevices: LiveScanningResult[];
  isScanning: boolean;
}
