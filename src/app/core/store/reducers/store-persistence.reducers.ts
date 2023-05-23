import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as HydrationActions from '../actions/store-persistence.actions';
import { AppState } from '../state/app.state';
import { StorePersistenceState } from '../state/store-persistence.state';

export const storePersistenceInitialState: StorePersistenceState = {
  hasHydratedStore: false
};

export const storePersistenceReducer = createReducer(
  storePersistenceInitialState,
  on(HydrationActions.hydrateSuccess, (storePersistenceState: StorePersistenceState) => ({
    ...storePersistenceState,
    hasHydratedStore: true
  }))
);

const isHydrateSuccess = (
  action: Action
): action is ReturnType<typeof HydrationActions.hydrateSuccess> =>
  action.type === HydrationActions.hydrateSuccess.type;

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => (state: AppState | undefined, action: Action) => {
    if (isHydrateSuccess(action) && action.state !== null) {
      return {
        ...state,
        backgroundFetchState: {
          ...action.state.backgroundFetchState,
          isBackgroundPluginInitialized: false
        },
        storePersistenceState: {
          hasHydratedStore: true
        }
      };
    } else {
      return reducer(state, action);
    }
  };
