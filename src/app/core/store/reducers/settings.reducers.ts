import { createReducer, on } from "@ngrx/store";
import { SettingsState } from "../state/settings.state";
import * as SettingsActions from "../actions/settings.actions";


export const initialLiveScanningState: SettingsState = {
  tileBlacklist: [],
  numberOfIgnoredAirTags: 0,
  numberOfIgnoredSmartTags: 0
};

export const settingsReducer = createReducer(
  initialLiveScanningState,
  on(SettingsActions.addTileToBlacklist, (settingsState: SettingsState, action) => ({
    ...settingsState,
    tileBlacklist: [...settingsState.tileBlacklist, action.tileId]
  })),
  on(SettingsActions.removeTileFromBlacklist, (settingsState: SettingsState, action) => ({
    ...settingsState,
    tileBlacklist: [...settingsState.tileBlacklist.filter((tileId) => tileId != action.tileId)]

  })),
  on(SettingsActions.updateNumberOfIgnoredAirTags, (settingsState: SettingsState, action) => {
    return {
      ...settingsState,
      numberOfIgnoredAirTags: action.numberofIgnoredAirTags
    }
  }),
  on(SettingsActions.updateNumberOfIgnoredSmartTags, (settingsState: SettingsState, action) => {
    return {
      ...settingsState,
      numberOfIgnoredSmartTags: action.numberofIgnoredSmartTags
    }
  })
);
