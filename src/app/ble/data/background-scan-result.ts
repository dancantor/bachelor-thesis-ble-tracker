import { PossibleThreateningTrackerList } from "ble-background-scan/dist/esm/models/possible-threatening-treacker";

export interface PossibleThreatsByDeviceModel {
  airTagThreats: PossibleThreateningTrackerList;
  smartTagThreats: PossibleThreateningTrackerList;
  tileThreats: PossibleThreateningTrackerList;
}
