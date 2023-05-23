import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { saveStateOfStore } from '../actions/store-persistence.actions';
import * as OfflineSupportSelectors from '../selectors/store-persistence.selectors';
import { AppState } from '../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class StorePersistenceFacade {
  public hasStartedBackgroundFetch$: Observable<AppState> = this.store.select(OfflineSupportSelectors.selectAppState);

  public saveStateOfStore(appState: AppState): void {
    this.store.dispatch(saveStateOfStore({state: appState}));
  }

  constructor(private store: Store<AppState>) { }
}
