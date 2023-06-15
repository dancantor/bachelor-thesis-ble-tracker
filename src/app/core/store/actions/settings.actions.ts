import { createAction, props } from "@ngrx/store";
import { SettingsState } from "../state/settings.state";

export const addTileToBlacklist = createAction(
  '[Settings] Add Tile to blacklist',
  props<{tileId: string}>()
)

export const removeTileFromBlacklist = createAction(
  '[Settings] Remove Tile from blacklist',
  props<{tileId: string}>()
)

export const updateNumberOfIgnoredAirTags = createAction(
  '[Settings] Update number of ignored AirTags',
  props<{numberofIgnoredAirTags: number}>()
)

export const updateNumberOfIgnoredSmartTags = createAction(
  '[Settings] Update number of ignored SmartTags',
  props<{numberofIgnoredSmartTags: number}>()
)

export const sendBlacklistToPlugin = createAction(
  '[Settings] Send blacklist to plugin',
  props<{blacklist: SettingsState}>()
)
