import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AndroidSettings, NativeSettings } from 'capacitor-native-settings';
import { NonThreateningModalPage } from './non-threatening-modal/non-threatening-modal.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, NonThreateningModalPage]
})
export class SettingsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  onOpenSettingsClick() {
    NativeSettings.openAndroid({
      option: AndroidSettings.ApplicationDetails
    });
  }

  async onOpenNonThreateningModal() {
    const modal = await this.modalController.create(
      {
        component: NonThreateningModalPage,
        breakpoints: [0, 0.8],
        initialBreakpoint: 0.8
      }
    )
    await modal.present();
  }
}
