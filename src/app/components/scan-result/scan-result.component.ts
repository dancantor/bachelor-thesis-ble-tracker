import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ScanResultComponent  implements OnInit {
  @Input() deviceModel!: string;
  @Input() deviceId!: string;
  @Input() timeDiscovered: Date = new Date();

  constructor() { }

  ngOnInit() {}

}
