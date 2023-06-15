import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import * as LiveScanningActions from '../actions/live-scanning.actions';
import * as LiveScanningSelectors from "../selectors/live-scanning.selectors";
import { LiveScanningResult } from "@ble/data/live-scanning-result";
import { AppState } from "../state/app.state";

@Injectable({
  providedIn: 'root',
})
export class LiveScanningFacade {
  public liveScanResults$: Observable<LiveScanningResult[]> = this.store.select(LiveScanningSelectors.selectScanResults);

  public initializeBleUse(): void {
    this.store.dispatch(LiveScanningActions.initializeBleUse());
  }

  public beginScanningForDevices(): void {
    this.store.dispatch(LiveScanningActions.beginScanningForDevices());
  }

  public stopScanningForDevices(): void {
    this.store.dispatch(LiveScanningActions.stopScanningForDevices());
  }

  constructor(private store: Store<AppState>) {}
}
