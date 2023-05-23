import {  hydrateSuccess, hydrate, hydrateFailure, saveStateOfStore } from '../actions/store-persistence.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, debounceTime, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { AppState } from '../state/app.state';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(hydrate),
      mergeMap(() => from(this.storage.get('state')).pipe(
        map(state => hydrateSuccess({ state })),
        catchError(() => of(hydrateFailure()))
      ))
    )
  );

  constructor(private action$: Actions, private storage: StorageService) {}

  ngrxOnInitEffects(): Action {
    return hydrate();
  }
}

@Injectable()
export class StorePersistenceEffects{
  saveState$ = createEffect(() =>
  this.action$.pipe(
    ofType(saveStateOfStore),
    debounceTime(1000),
    exhaustMap((state) => from(this.storage.set('state', state.state))),
  ), {dispatch: false}
  );

  constructor(private action$: Actions, private storage: StorageService) {}
}

