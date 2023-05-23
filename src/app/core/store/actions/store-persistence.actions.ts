import { createAction, props } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const hydrate = createAction('[Store Persistance] Hydrate');

export const hydrateSuccess = createAction(
  '[Store Persistance] Hydrate Success',
  props<{ state: AppState }>()
);

export const hydrateFailure = createAction('[Store Persistance] Hydrate Failure');

export const saveStateOfStore = createAction(
  '[Store Persistance] Save state of store',
  props<{state: AppState}>()
);

