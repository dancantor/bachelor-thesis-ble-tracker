import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StorePersistenceState } from '../state/store-persistence.state';

const appState = (state: AppState) => state;
const storePersistenceState = (state: AppState) => state.storePersistenceState;

export const selectAppState = createSelector (
  appState,
  (appState: AppState) => appState
);

export const selectHasHydratedStore = createSelector (
  storePersistenceState,
  (state: StorePersistenceState) => state.hasHydratedStore
);
