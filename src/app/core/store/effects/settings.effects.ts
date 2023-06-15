import { BleBackgroundScan } from 'ble-background-scan';
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { exhaustMap, from } from "rxjs";
import { sendBlacklistToPlugin } from "../actions/settings.actions";


@Injectable()
export class LiveScanningEffects {
  initializeBle$ = createEffect(() =>
    this.action$.pipe(
      ofType(sendBlacklistToPlugin),
      exhaustMap((action) => from(BleBackgroundScan.setBlacklistForDevices({
        airTagThreshold: action.blacklist.numberOfIgnoredAirTags,
        smartTagThreshold: action.blacklist.numberOfIgnoredSmartTags,
        tilesID: action.blacklist.tileBlacklist.join(';')
      }
      )))
    ), {dispatch: false}
  );

  constructor(private action$: Actions) {}

}
