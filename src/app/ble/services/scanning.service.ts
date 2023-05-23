import { Position, Geolocation } from '@capacitor/geolocation';
import { Injectable } from '@angular/core';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';
import { Observable, Subject, first, from } from 'rxjs';
import { ScanResultAbstraction } from '@ble/data/scan-result.abstraction';
import { ScanningServiceException } from '@core/exceptions/scanning-service.exception';
import { GenericDevice } from '@ble/data/generic-device';
import { GenericDeviceCreator } from '@ble/data/factory';


@Injectable({
  providedIn: 'root'
})
export class ScanningService {
  private _scannedBLEDevice: Subject<ScanResultAbstraction> = new Subject<ScanResultAbstraction>();
  constructor() { }

  public initializeBLEUse(): Observable<void> {
    return from(BleClient.initialize())
  }

  public startScanningForDevices(): void {
    from(BleClient.isEnabled()).pipe(first()).subscribe((isEnabled: boolean) => {
      if (!isEnabled) {
        throw new ScanningServiceException('Bluetooth is not enabled on device');
      }
      BleClient.requestLEScan({}, async (result: ScanResult) => {
        const currentUserLocation: Position = await Geolocation.getCurrentPosition();
        const genericDeviceCreator: GenericDeviceCreator = new GenericDeviceCreator();
        const scannedDevice: ScanResultAbstraction = genericDeviceCreator.factoryMethod(result, currentUserLocation);
        this._scannedBLEDevice.next(scannedDevice);
      })
    })
  }

  public async stopScanningForDevices(): Promise<void> {
    return await BleClient.stopLEScan();
  }

  public subscribeToScannedDevices(): Observable<ScanResultAbstraction> {
    return this._scannedBLEDevice.asObservable();
  }
}
