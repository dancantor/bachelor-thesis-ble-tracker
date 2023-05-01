import { BleDevice, ScanResult } from "@capacitor-community/bluetooth-le";
import { Position } from "@capacitor/geolocation";

export abstract class ScanResultAbstraction implements ScanResult {
  private _device: BleDevice;
  private _lastIdentifiedLocation: Position;
  private _localName?: string | undefined;
  private _rssi?: number | undefined;
  private _txPower?: number | undefined;
  private _manufacturerData?: { [key: string]: DataView; } | undefined;
  private _serviceData?: { [key: string]: DataView; } | undefined;
  private _uuids?: string[] | undefined;
  private _rawAdvertisement?: DataView | undefined;


  public get device(): BleDevice {
    return this._device;
  }
  public set device(value: BleDevice) {
    this._device = value;
  }
  public get lastIdentifiedLocation(): Position {
    return this._lastIdentifiedLocation;
  }
  public set lastIdentifiedLocation(value: Position) {
    this._lastIdentifiedLocation = value;
  }
  public get localName(): string | undefined {
    return this._localName;
  }
  public set localName(value: string | undefined) {
    this._localName = value;
  }
  public get rssi(): number | undefined {
    return this._rssi;
  }
  public set rssi(value: number | undefined) {
    this._rssi = value;
  }
  public get txPower(): number | undefined {
    return this._txPower;
  }
  public set txPower(value: number | undefined) {
    this._txPower = value;
  }
  public get manufacturerData(): { [key: string]: DataView; } | undefined {
    return this._manufacturerData;
  }
  public set manufacturerData(value: { [key: string]: DataView; } | undefined) {
    this._manufacturerData = value;
  }
  public get serviceData(): { [key: string]: DataView; } | undefined {
    return this._serviceData;
  }
  public set serviceData(value: { [key: string]: DataView; } | undefined) {
    this._serviceData = value;
  }
  public get uuids(): string[] | undefined {
    return this._uuids;
  }
  public set uuids(value: string[] | undefined) {
    this._uuids = value;
  }
  public get rawAdvertisement(): DataView | undefined {
    return this._rawAdvertisement;
  }
  public set rawAdvertisement(value: DataView | undefined) {
    this._rawAdvertisement = value;
  }

  public toString(): string {
    return `${this.device.deviceId} - ${`${this.localName ?? ''}`}${
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

  constructor(scanResult: ScanResult, location: Position) {
    this._device = scanResult.device;
    this._lastIdentifiedLocation = location;
    this._localName = scanResult.localName;
    this._rssi = scanResult.rssi;
    this._txPower = scanResult.txPower;
    this._manufacturerData = scanResult.manufacturerData;
    this._serviceData = scanResult.serviceData;
    this._uuids = scanResult.uuids;
    this._rawAdvertisement = scanResult.rawAdvertisement;
  }
}
