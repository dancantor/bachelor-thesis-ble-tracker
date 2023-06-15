import { Injectable } from '@angular/core';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PossibleThreateningTracker } from 'ble-background-scan/dist/esm/models/possible-threatening-treacker';
import { Observable, map } from 'rxjs';
import * as BackgroundFetchActions from '../actions/background-fetch.actions';
import * as BackgroundFetchSelectors from '../selectors/background-fetch.selectors';
import * as OfflineSupportSelectors from '../selectors/store-persistence.selectors';
import { AppState } from './../state/app.state';

@Injectable({
  providedIn: 'root',
})
export class BackgroundFetchFacade {
  public hasStartedBackgroundFetch$: Observable<boolean> = this.store.select(
    BackgroundFetchSelectors.selectHasStartedBackgroundFetch
  );

  public shouldBeginWorker$: Observable<boolean> = this.store
    .select(BackgroundFetchSelectors.selectIsBackgroundFetchPluginInitialized)
    .pipe(
      concatLatestFrom(() => [
        this.store.select(
          BackgroundFetchSelectors.selectHasStartedBackgroundFetch
        ),
        this.store.select(OfflineSupportSelectors.selectHasHydratedStore),
      ]),
      map(
        ([isPluginInitialized, hasStartedBackgroundFetch, hasHydratedStore]: [
          boolean,
          boolean,
          boolean
        ]) =>
          isPluginInitialized && hasHydratedStore && !hasStartedBackgroundFetch
      )
  );

  public possibleThreateningAirTags$: Observable<PossibleThreateningTracker[]> = this.store.select(BackgroundFetchSelectors.selectPossibleThreateningAirTags)
    .pipe(
      map((possibleAirTagThreats) => possibleAirTagThreats?.deviceList)
    );

  public possibleThreateningSmartTags$: Observable<PossibleThreateningTracker[]> = this.store.select(BackgroundFetchSelectors.selectPossibleThreateningSmartTags)
    .pipe(
      map((possibleSmartTagThreats) => possibleSmartTagThreats?.deviceList)
    );

  public possibleThreateningTiles$: Observable<PossibleThreateningTracker[]> = this.store.select(BackgroundFetchSelectors.selectPossibleThreateningTiles)
    .pipe(
      map((possibleTilesThreats) => possibleTilesThreats?.deviceList)
    );

  public selectedThreateningDevice$: Observable<PossibleThreateningTracker | null> = this.store.select(BackgroundFetchSelectors.selectSelectedPossibleThreat);

  public initializeBackgroundFetchPlugin(): void {
    this.store.dispatch(BackgroundFetchActions.initializeBackgroundScanPlugin())
  }

  public initializeWorkers(): void {
    this.store.dispatch(BackgroundFetchActions.initializeWorkers());
  }

  public fetchThreateningDevices(): void {
    this.store.dispatch(BackgroundFetchActions.fetchThreateningDevices());
  }

  public setSelectedThreateningDevice(possibleThreat: PossibleThreateningTracker): void {
    this.store.dispatch(BackgroundFetchActions.setSelectedThreateningDevice({possibleThreateningTracker: possibleThreat}));
  }

  constructor(private store: Store<AppState>) {}
}
