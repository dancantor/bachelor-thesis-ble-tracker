import { BleDevice, ScanResult } from "@capacitor-community/bluetooth-le";
import { Position } from "@capacitor/geolocation";

export abstract class ScanResultAbstraction implements ScanResult {
  public device: BleDevice;
  public lastIdentifiedLocation: Position;
  public localName?: string | undefined;
  public rssi?: number | undefined;
  public txPower?: number | undefined;
  public manufacturerData?: { [key: string]: DataView; } | undefined;
  public serviceData?: { [key: string]: DataView; } | undefined;
  public uuids?: string[] | undefined;
  public rawAdvertisement?: DataView | undefined;

  public toString(): string {
    return `${new Date()} -> ${this.device.deviceId} - ${`${this.localName ?? ''}`}${
      `comp_ident-${
        this.manufacturerData ? Object.keys(this.manufacturerData)[0] : ''
      } ` ?? ''
    }->${
      `${
        this.manufacturerData
          ? this.dataViewToHexString(Object.values(this.manufacturerData)[0])
          : ''
      } ` ?? ''
    }`;
  }

  private dataViewToHexString(dataView: DataView): string {
    if (!dataView) {
      return '';
    }
    return [...new Uint8Array(dataView.buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }

  protected constructor(scanResult: ScanResult, location: Position) {
    this.device = scanResult.device;
    this.lastIdentifiedLocation = location;
    this.localName = scanResult.localName;
    this.rssi = scanResult.rssi;
    this.txPower = scanResult.txPower;
    this.manufacturerData = scanResult.manufacturerData;
    this.serviceData = scanResult.serviceData;
    this.uuids = scanResult.uuids;
    this.rawAdvertisement = scanResult.rawAdvertisement;
  }
}
