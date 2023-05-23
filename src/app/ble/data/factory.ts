import { ScanResult } from "@capacitor-community/bluetooth-le";
import { ScanResultAbstraction } from "./scan-result.abstraction";
import { Position } from "@capacitor/geolocation";
import { GenericDevice } from "./generic-device";

export abstract class Creator {
  public abstract factoryMethod(scanResult: ScanResult, location: Position): ScanResultAbstraction;
}

export class GenericDeviceCreator extends Creator {
  public override factoryMethod(scanResult: ScanResult, location: Position): ScanResultAbstraction {
    return new GenericDevice(scanResult, location);
  }
}
