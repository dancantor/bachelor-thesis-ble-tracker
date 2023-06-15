import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AndroidSettings, NativeSettings } from 'capacitor-native-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onOpenSettingsClick() {
    NativeSettings.openAndroid({
      option: AndroidSettings.ApplicationDetails
    });
  }

}
