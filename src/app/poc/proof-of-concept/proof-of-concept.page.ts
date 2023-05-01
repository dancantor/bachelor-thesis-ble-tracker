import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { GenericDevice } from '@ble/data/generic-device';
import { ScanningService } from '@ble/services/scanning.service';
import { FirebaseCrashlytics } from '@capacitor-community/firebase-crashlytics';
import { BackgroundTaskSchedulerService } from '@core/services/background-task-scheduler.service';
import { IonicModule } from '@ionic/angular';
import { from, mergeMap, tap } from 'rxjs';


@Component({
  selector: 'app-proof-of-concept',
  templateUrl: './proof-of-concept.page.html',
  styleUrls: ['./proof-of-concept.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [AndroidPermissions]
})
export class ProofOfConceptPage implements OnInit, OnDestroy {
  constructor(private scanningService: ScanningService, private backgroundService: BackgroundTaskSchedulerService, private androidPermissions: AndroidPermissions) {}

  ngOnInit() {
    this.scanningService.initializeBLEUse().subscribe(() => {
      this.scanningService.startScanningForDevices();
    });

    this.scanningService.subscribeToScannedDevices().pipe(
      tap(() => console.log('yeee')),
      tap((result) => console.log(result)),
      mergeMap((result: GenericDevice) => from(FirebaseCrashlytics.addLogMessage({message: result.toString()})))
    ).subscribe(() => console.log('o murit'))
  }

  onSendDataToCrashlytics(): void {
    FirebaseCrashlytics.crash({message: `Execution ended at ${new Date()}`});
  }

  ngOnDestroy() {
    FirebaseCrashlytics.crash({message: `Execution ended at ${new Date()}`});
  }
}
