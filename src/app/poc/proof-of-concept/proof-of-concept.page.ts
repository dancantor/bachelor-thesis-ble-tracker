import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-proof-of-concept',
  templateUrl: './proof-of-concept.page.html',
  styleUrls: ['./proof-of-concept.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProofOfConceptPage implements OnInit {
  constructor() {}

  async ngOnInit() {
    try {
      await BleClient.initialize();

      const device = await BleClient.requestLEScan({}, (result: ScanResult) => {
        if (result?.manufacturerData !== undefined) {
          if (Object.keys(result.manufacturerData)[0] === 0x4C.toString()) {
            console.log(`Result from scan`);
            console.log(result);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
