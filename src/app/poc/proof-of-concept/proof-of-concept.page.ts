import { ForegroundService } from '@awesome-cordova-plugins/foreground-service/ngx';
import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScanningService } from '@ble/services/scanning.service';
import { FirebaseCrashlytics } from '@capacitor-community/firebase-crashlytics';
import { IonicModule, Platform } from '@ionic/angular';
import { from, interval, mergeMap, tap } from 'rxjs';
import { ScanResultAbstraction } from '@ble/data/scan-result.abstraction';
import { Store } from '@ngrx/store';
import { AppState } from '@core/store/state/app.state';
import { BackgroundFetchFacade } from '@core/store/facades/background-fetch.facade';
import { BleBackgroundScan } from 'ble-background-scan';

@Component({
  selector: 'app-proof-of-concept',
  templateUrl: './proof-of-concept.page.html',
  styleUrls: ['./proof-of-concept.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProofOfConceptPage implements OnInit, OnDestroy, AfterContentInit {
  constructor(
    private scanningService: ScanningService,
    private foregroundService: ForegroundService,
    private backgroundFetchFacade: BackgroundFetchFacade,
    private platform: Platform
    )
    {}
  ngAfterContentInit(): void {
    // this.foregroundService.start('Scanning for devices', 'Background Task', 'bluetooth', 3, 19);
  }

  ngOnInit() {
    if (this.platform.is("android")) {
      BleBackgroundScan.initialize().then(() =>
        this.backgroundFetchFacade.changeStatusOfIsBackgroundFetchPluginInitialized(true),
      );
      this.backgroundFetchFacade.shouldBeginWorker$.subscribe((shouldBeginWorker: boolean) => {
        if (shouldBeginWorker) {
          this.backgroundFetchFacade.changeStatusOfHasStartedBackgroundFetch(true);
          BleBackgroundScan.initiateBackgroundScan();
          BleBackgroundScan.initiateThreatDetection();
        }
      })
    }
    //   this.scanningService.initializeBLEUse().subscribe(() => {
  //     this.scanningService.startScanningForDevices();
  //   });

  //   this.scanningService.subscribeToScannedDevices().pipe(
  //     tap(() => console.log('yeee')),
  //     tap((result) => console.log(result)),
  //     mergeMap((result: ScanResultAbstraction) => from(FirebaseCrashlytics.addLogMessage({message: result.toString()}))),
  //   ).subscribe({
  //     next: () => console.log('New device found'),
  //     complete: () => console.log('Device scanning complete'),
  //     error: () => console.log('Error on scanning devices')
  //   });
  //   interval(10000).subscribe(() => {
  //     console.log('still emiting');
  //   })
  }

  onSendDataToCrashlytics(): void {
    this.foregroundService.stop();
    FirebaseCrashlytics.crash({message: `Execution ended at ${new Date()}`});
  }

  ngOnDestroy() {
    this.foregroundService.stop();
    FirebaseCrashlytics.crash({message: `Execution ended at ${new Date()}`});
  }
}
