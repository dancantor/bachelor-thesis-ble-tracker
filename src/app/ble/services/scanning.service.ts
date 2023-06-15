import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';
import { Observable, Subject, first, from } from 'rxjs';
import { ScanningServiceException } from '@core/exceptions/scanning-service.exception';
import { LiveScanningResult } from '@ble/data/live-scanning-result';
import { Injectable, NgZone } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ScanningService {
  private _scannedBLEDevice: Subject<LiveScanningResult> = new Subject<LiveScanningResult>();
  constructor(private ngZone: NgZone) { }

  public initializeBLEUse(): Observable<void> {
    return from(BleClient.initialize())
  }

  public startScanningForDevices(): void {
    from(BleClient.isEnabled()).pipe(first()).subscribe((isEnabled: boolean) => {
      if (!isEnabled) {
        throw new ScanningServiceException('Bluetooth is not enabled on device');
      }
      BleClient.requestLEScan({}, async (result: ScanResult) => {
        const scannedDevice: LiveScanningResult = {
          deviceId: result.device.deviceId,
          deviceModel: this.getDeviceModelBasedOnScanResult(result),
          scanTime: new Date()
        }
        if (scannedDevice.deviceModel === '') return;
        this.ngZone.run(() => this._scannedBLEDevice.next(scannedDevice));
      })
    })
  }

  public async stopScanningForDevices(): Promise<void> {
    return await BleClient.stopLEScan();
  }

  public subscribeToScannedDevices(): Observable<LiveScanningResult> {
    return this._scannedBLEDevice.asObservable();
  }

  public getDeviceModelBasedOnScanResult(scanResult: ScanResult): string {
    if (this.isTileDevice(scanResult)) {
      return 'Tile';
    }
    if (this.isAirTagDevice(scanResult)) {
      return 'AirTag';
    }
    if (this.isSmartTagDevice(scanResult)) {
      return 'SmartTag';
    }
    return '';
  }

  isSmartTagDevice(scanResult: ScanResult) {
    if (!scanResult.serviceData) {
      return false;
    }
    return Object.keys(scanResult.serviceData).some((serviceUUID: string) => serviceUUID.includes("fd59") || serviceUUID.includes("fd5a"));
  }

  isAirTagDevice(scanResult: ScanResult) {
    if (!scanResult.manufacturerData || !scanResult.rawAdvertisement || !scanResult.manufacturerData['76']) {
      return false;
    }
    const deviceType = (scanResult.manufacturerData['76'].getUint8(2) & 0x30) >> 4;
    return scanResult.rawAdvertisement.getUint8(1) === 255 && scanResult.rawAdvertisement.getUint8(4) === 18 && deviceType === 1;
  }

  isTileDevice(scanResult: ScanResult) {
    if (!scanResult.serviceData) {
      return false;
    }
    return Object.keys(scanResult.serviceData).some((serviceUUID: string) => serviceUUID.includes("feed"));
  }
}
