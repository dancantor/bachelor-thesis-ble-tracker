import { createReducer, on } from "@ngrx/store";
import { BackgroundFetchState } from "../state/background-fetch.state";
import * as BackgroundFetchActions from "../actions/background-fetch.actions"

// deviceList: [
//   {
//     deviceId: "03:D3:C2:4A:53",
//     deviceModel: "AirTag",
//     locations: [
//       {
//         datetime: "2023-06-15 14:00:00",
//         latitude: 46.766154879158385,
//         longitude: 23.629581474305557,
//         locationDeviceId: "03:D3:C2:4A:53"
//       },
//       {
//         datetime: "2023-06-15 14:15:00",
//         latitude: 46.771320,
//         longitude: 23.582447,
//         locationDeviceId: "13:D3:C2:4A:53"
//       },
//       {
//         datetime: "2023-06-15 14:30:00",
//         latitude: 46.78038590997958,
//         longitude: 23.63439803662073,
//         locationDeviceId: "23:D3:C2:4A:53"
//       },
//     ]
//   }
// ]

const initialBackgroundFetchState: BackgroundFetchState = {
  hasStartedBackgroundFetch: false,
  isBackgroundPluginInitialized: false,
  hasErrorOnInitializingState: false,
  possibleMaliciousAirTags: {deviceList: []},
  possibleMaliciousSmartTags: {deviceList: []},
  possibleMaliciousTiles: {deviceList: []},
  selectedThreateningDevice: null
};

export const backgroundFetchReducer = createReducer(
  initialBackgroundFetchState,
  on(BackgroundFetchActions.initializedBackgroundScanPluginSuccess, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    isBackgroundPluginInitialized: true,
    hasErrorOnInitializingState: false
  })),
  on(BackgroundFetchActions.initializedBackgroundScanPluginFail, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    hasErrorOnInitializingState: true
  })),
  on(BackgroundFetchActions.initializedWorkersSuccess, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    hasStartedBackgroundFetch: true,
  })),
  on(BackgroundFetchActions.initializedWorkersFail, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    hasStartedBackgroundFetch: false
  })),
  on(BackgroundFetchActions.fetchedThreateningDevicesSuccessfully, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    possibleMaliciousAirTags: action.possibleThreatsByDeviceModel.airTagThreats,
    possibleMaliciousSmartTags: action.possibleThreatsByDeviceModel.smartTagThreats,
    possibleMaliciousTiles: action.possibleThreatsByDeviceModel.tileThreats,
  })),
  on(BackgroundFetchActions.setSelectedThreateningDevice, (backgroundFetchState: BackgroundFetchState, action) => ({
    ...backgroundFetchState,
    selectedThreateningDevice: action.possibleThreateningTracker
  })),
);
