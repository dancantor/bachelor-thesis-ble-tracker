import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import * as SettingsActions from "../actions/settings.actions";
import * as SettingsSelectors from "../selectors/settings.selectors";
import { Observable, combineLatest, filter } from "rxjs";
import { AppState } from "../state/app.state";
import { Store } from "@ngrx/store";
import { SettingsState } from "../state/settings.state";
import * as LiveScanningSelectors from "../selectors/live-scanning.selectors";
import { LiveScanningResult } from '@ble/data/live-scanning-result';
import { concatLatestFrom } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacade {
  public numberOfIgnoredAirTags$: Observable<number> = this.store.select(SettingsSelectors.selectNumberOfIgnoredAirTags);
  public numberOfIgnoredSmartTags$: Observable<number> = this.store.select(SettingsSelectors.selectNumberOfIgnoredSmartTags);
  public tileBlacklist$: Observable<string[]> = this.store.select(SettingsSelectors.selectTileBlacklist);
  public tilesNotInBlacklist$: Observable<string[]> = combineLatest([this.tileBlacklist$, this.store.select(LiveScanningSelectors.selectScanResults)]).pipe(
    map(([tileBlacklist, scanResults]) => ({tileBlacklist, scanResults: scanResults.filter((scanResult: LiveScanningResult) => scanResult.deviceModel === 'Tile')})),
    map(({tileBlacklist, scanResults}) => ({tileBlacklist, scanResultsIds: scanResults.map(scanResult => scanResult.deviceId)})),
    map(({tileBlacklist, scanResultsIds}) => scanResultsIds.filter((scanResultId) => !tileBlacklist?.some(tileId => tileId === scanResultId)))
  )
  // .pipe(
  //   map((scanResults: LiveScanningResult[]) => scanResults.map(()))
  // )
  public blacklist$: Observable<SettingsState> = this.store.select(SettingsSelectors.selectBlacklist)

  public addTileToBlacklist(tileId: string): void {
    this.store.dispatch(SettingsActions.addTileToBlacklist({tileId}));
  }

  public removeTileFromBlacklist(tileId: string): void {
    this.store.dispatch(SettingsActions.removeTileFromBlacklist({tileId}));
  }

  public updateNumberOfIgnoredAirTags(numberofIgnoredAirTags: number): void {
    this.store.dispatch(SettingsActions.updateNumberOfIgnoredAirTags({numberofIgnoredAirTags}));
  }

  public updateNumberOfIgnoredSmartTags(numberofIgnoredSmartTags: number): void {
    this.store.dispatch(SettingsActions.updateNumberOfIgnoredSmartTags({numberofIgnoredSmartTags}));
  }

  public sendBlacklistToPlugin(blacklist: SettingsState): void {
    this.store.dispatch(SettingsActions.sendBlacklistToPlugin({blacklist}));
  }

  constructor(private store: Store<AppState>) {}
}
