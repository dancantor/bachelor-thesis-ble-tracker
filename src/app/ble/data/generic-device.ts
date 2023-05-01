import { ScanResult } from "@capacitor-community/bluetooth-le";
import { ScanResultAbstraction } from "./scan-result.abstraction";
import { Position } from "@capacitor/geolocation";


export class GenericDevice extends ScanResultAbstraction {
  constructor(scanResult: ScanResult, location: Position) {
    super(scanResult, location);
  }
}
