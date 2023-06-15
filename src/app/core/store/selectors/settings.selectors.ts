import { AppState } from '@core/store/state/app.state';
import { createSelector } from "@ngrx/store";
import { SettingsState } from "../state/settings.state";

export const selectSettingsState = (state: AppState) => state.settingsState;

export const selectNumberOfIgnoredAirTags = createSelector(
  selectSettingsState,
  (state: SettingsState): number => state.numberOfIgnoredAirTags
);

export const selectNumberOfIgnoredSmartTags = createSelector(
  selectSettingsState,
  (state: SettingsState): number => state.numberOfIgnoredSmartTags
);

export const selectTileBlacklist = createSelector(
  selectSettingsState,
  (state: SettingsState): string[] => state.tileBlacklist
)

export const selectBlacklist = createSelector(
  selectSettingsState,
  (state: SettingsState): SettingsState => state
)
