import { AppState } from './../state/app.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BackgroundFetchSelectors from '../selectors/background-fetch.selectors';
import * as OfflineSupportSelectors from '../selectors/store-persistence.selectors';
import * as BackgroundFetchActions from '../actions/background-fetch.actions';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/effects';

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

  public changeStatusOfHasStartedBackgroundFetch(
    hasStartedBackgroundFetchStatus: boolean
  ): void {
    this.store.dispatch(
      BackgroundFetchActions.changeHasStartedBackgroundFetchStatus({
        hasStartedBackgroundFetchStatus,
      })
    );
  }

  public changeStatusOfIsBackgroundFetchPluginInitialized(
    isBackgroundFetchPluginInitialized: boolean
  ): void {
    this.store.dispatch(
      BackgroundFetchActions.changeisBackgroundFetchPluginInitializedStatus({
        isBackgroundPluginInitialized: isBackgroundFetchPluginInitialized,
      })
    );
  }

  constructor(private store: Store<AppState>) {}
}
