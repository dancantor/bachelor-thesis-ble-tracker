import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ScanResultComponent } from 'src/app/components/scan-result/scan-result.component';
import { LiveScanningFacade } from '@core/store/facades/live-scanning.facade';
import { LiveScanningResult } from '@ble/data/live-scanning-result';
import { Observable, interval, Subscription, filter, first, tap } from 'rxjs';

@Component({
  selector: 'app-live-scanning',
  templateUrl: './live-scanning.page.html',
  styleUrls: ['./live-scanning.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, ScanResultComponent]
})
export class LiveScanningPage implements OnInit {
  protected liveScanningResults$: Observable<LiveScanningResult[]> = this.liveScanningFacade.liveScanResults$;
  private intervalSubscription!: Subscription;
  constructor(private liveScanningFacade: LiveScanningFacade) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.liveScanningFacade.isBluetoothLEInitialized$.pipe(
      filter((isBluetoothLEInitialized) => isBluetoothLEInitialized),
      first()
    ).subscribe(() => {
      this.liveScanningFacade.beginScanningForDevices();
    })
    this.intervalSubscription = interval(10000).subscribe(() => {
      this.liveScanningFacade.stopScanningForDevices();
      this.liveScanningFacade.beginScanningForDevices();
    })
  }

  ionViewDidLeave() {
    this.intervalSubscription.unsubscribe();
    this.liveScanningFacade.stopScanningForDevices();
  }

  protected identifyScanResult(index: number, item: LiveScanningResult) {
    return item.deviceId;
  }
}
