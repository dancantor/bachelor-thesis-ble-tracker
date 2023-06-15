import * as BackgroundFetchActions from '../actions/background-fetch.actions';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, from, map, of } from "rxjs";
import { BleBackgroundScan } from "ble-background-scan";
import { ThreatDetectionService } from '@ble/services/threat-detection.service';


@Injectable()
export class BackgroundFetchEffects {
  initializeBackgroundScanPlugin$ = createEffect(() =>
    this.action$.pipe(
      ofType(BackgroundFetchActions.initializeBackgroundScanPlugin),
      exhaustMap(() => from(BleBackgroundScan.initialize())),
      map(() => BackgroundFetchActions.initializedBackgroundScanPluginSuccess()),
      // catchError((er) => of(BackgroundFetchActions.initializedBackgroundScanPluginFail()))
    )
  );

  initializeWorkers$ = createEffect(() =>
    this.action$.pipe(
      ofType(BackgroundFetchActions.initializeWorkers),
      exhaustMap(() => from(BleBackgroundScan.initiateBackgroundScan())),
      exhaustMap(() => from(BleBackgroundScan.initiateThreatDetection())),
      exhaustMap(() => from(BleBackgroundScan.initiatePeriodicDataPurging())),
      map(() => BackgroundFetchActions.initializedWorkersSuccess()),
      // catchError((er) => of(BackgroundFetchActions.initializedWorkersFail()))
    )
  );

  fetchThreateningDevices$ = createEffect(() =>
    this.action$.pipe(
      ofType(BackgroundFetchActions.fetchThreateningDevices),
      exhaustMap(() => from(BleBackgroundScan.getThreateningDevices())),
      map((possibleThreateningTrackerList) => this.threatDetectionService.splitDetectedThreatsBasedOnDeviceModel(possibleThreateningTrackerList)),
      map((possibleThreatsByDeviceModel) => BackgroundFetchActions.fetchedThreateningDevicesSuccessfully({possibleThreatsByDeviceModel})),

      // catchError((er) => of(BackgroundFetchActions.fetchedThreateningDevicesFail()))
    )
  );

  constructor(private action$: Actions, private threatDetectionService: ThreatDetectionService) {}
}
