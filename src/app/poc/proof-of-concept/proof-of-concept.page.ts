import { ForegroundService } from '@awesome-cordova-plugins/foreground-service/ngx';
import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScanningService } from '@ble/services/scanning.service';
import { FirebaseCrashlytics } from '@capacitor-community/firebase-crashlytics';
import { IonicModule, Platform } from '@ionic/angular';
import { from, interval, mergeMap, tap } from 'rxjs';
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
export class ProofOfConceptPage implements OnInit {
  constructor(
    private scanningService: ScanningService,
    private backgroundFetchFacade: BackgroundFetchFacade,
    private platform: Platform
    )
    {}

  ngOnInit() {
    
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
}
