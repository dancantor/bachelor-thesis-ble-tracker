import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MarkerModalComponent  implements OnInit {
  @Input() marker!: {deviceId: string, datetime: string}
  constructor() { }

  ngOnInit() {}

}
