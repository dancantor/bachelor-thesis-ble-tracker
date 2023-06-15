import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { StorePersistenceFacade } from '@core/store/facades/store-persistence.facade';
import { AppState } from '@core/store/state/app.state';
import { Subscription } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { LiveScanningFacade } from '@core/store/facades/live-scanning.facade';
import { BackgroundFetchFacade } from '@core/store/facades/background-fetch.facade';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private stateSubscription: Subscription = new Subscription();
  constructor(
    private storePersistanceFacade: StorePersistenceFacade,
    private liveScanningFacade: LiveScanningFacade,
    private backgroundFetchFacade: BackgroundFetchFacade,
    private platform: Platform) {
  }
  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.backgroundFetchFacade.isBackgroundFetchPluginInitialized$.pipe(
      filter((result) => result),
      first(),
    ).subscribe(() => this.liveScanningFacade.initializeBleUse())
    this.stateSubscription = this.storePersistanceFacade.hasStartedBackgroundFetch$.subscribe((appState: AppState) => this.storePersistanceFacade.saveStateOfStore(appState))
    if (this.platform.is("android")) {
      this.backgroundFetchFacade.initializeBackgroundFetchPlugin();
      this.backgroundFetchFacade.shouldBeginWorker$.subscribe((shouldBeginWorker: boolean) => {
        if (shouldBeginWorker) {
          this.backgroundFetchFacade.initializeWorkers();
        }
      })
    }
    // if (this.platform.is("android")) {
    //   BleBackgroundScan.initialize().then(() =>
    //     this.backgroundFetchFacade.changeStatusOfIsBackgroundFetchPluginInitialized(true),
    //   );
    //   this.backgroundFetchFacade.shouldBeginWorker$.subscribe((shouldBeginWorker: boolean) => {
    //     if (shouldBeginWorker) {
    //       this.backgroundFetchFacade.changeStatusOfHasStartedBackgroundFetch(true);
    //       BleBackgroundScan.initiateBackgroundScan();
    //       BleBackgroundScan.initiateThreatDetection();
    //     }
    //   })
    // }
  }
}
