import { PossibleThreateningTrackerList } from 'ble-background-scan/dist/esm/models/possible-threatening-treacker';
import { Injectable } from '@angular/core';
import { PossibleThreatsByDeviceModel } from '@ble/data/background-scan-result';

@Injectable({
  providedIn: 'root'
})
export class ThreatDetectionService {

  constructor() { }

  public splitDetectedThreatsBasedOnDeviceModel(possibleThreats: PossibleThreateningTrackerList): PossibleThreatsByDeviceModel {
    const possibleThreatsByDeviceModel: PossibleThreatsByDeviceModel = {
      airTagThreats: {deviceList: []},
      smartTagThreats: {deviceList: []},
      tileThreats: {deviceList: []}
    };
    possibleThreats.deviceList.forEach(possibleThreat => {
      if (possibleThreat.deviceModel === 'AirTag') {
        possibleThreatsByDeviceModel.airTagThreats.deviceList.push(possibleThreat);
      }
      if (possibleThreat.deviceModel === 'SmartTag') {
        possibleThreatsByDeviceModel.smartTagThreats.deviceList.push(possibleThreat);
      }
      if (possibleThreat.deviceModel === 'Tile') {
        possibleThreatsByDeviceModel.tileThreats.deviceList.push(possibleThreat);
      }
    })
    return possibleThreatsByDeviceModel;
  }
}
