import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PossibleThreateningTracker } from 'ble-background-scan/dist/esm/models/possible-threatening-treacker';

@Component({
  selector: 'app-threatening-device',
  templateUrl: './threatening-device.component.html',
  styleUrls: ['./threatening-device.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ThreateningDeviceComponent  implements OnInit {
  @Input() possibleThreat!: PossibleThreateningTracker;
  @Output() onClick: EventEmitter<PossibleThreateningTracker> = new EventEmitter<PossibleThreateningTracker>();
  constructor() { }

  ngOnInit() {}

  onCardClick() {
    this.onClick.emit(this.possibleThreat);
  }

}
