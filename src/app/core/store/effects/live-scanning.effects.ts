import { Injectable } from "@angular/core";
import { LiveScanningResult } from "@ble/data/live-scanning-result";
import { ScanningService } from "@ble/services/scanning.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, from, map, switchMap } from "rxjs";
import { addScanResult, beginScanningForDevices, initializeBleUse, stopScanningForDevices } from "../actions/live-scanning.actions";


@Injectable()
export class LiveScanningEffects {
  initializeBle$ = createEffect(() =>
    this.action$.pipe(
      ofType(initializeBleUse),
      exhaustMap(() => from(this.scanningService.initializeBLEUse()))
    ), {dispatch: false}
  );

  startScanning$ = createEffect(() =>
    this.action$.pipe(
      ofType(beginScanningForDevices),
      switchMap(() => {
        this.scanningService.startScanningForDevices();
        return this.scanningService.subscribeToScannedDevices();
      }),
      map((scanResult: LiveScanningResult) => addScanResult({scanResult: scanResult}))
    )
  );

  stopScanning$ = createEffect(() =>
    this.action$.pipe(
      ofType(stopScanningForDevices),
      exhaustMap(() => from(this.scanningService.stopScanningForDevices()))
    ), {dispatch: false}
  );

  constructor(private action$: Actions, private scanningService: ScanningService) {}

}

