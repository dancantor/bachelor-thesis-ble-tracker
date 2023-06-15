import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ThreateningDeviceComponent } from 'src/app/components/threatening-device/threatening-device.component';
import { BackgroundFetchFacade } from '@core/store/facades/background-fetch.facade';
import { PossibleThreateningTracker } from 'ble-background-scan/dist/esm/models/possible-threatening-treacker';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-threat-detection',
  templateUrl: './threat-detection.page.html',
  styleUrls: ['./threat-detection.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, ThreateningDeviceComponent]
})
export class ThreatDetectionPage implements OnInit {
  protected possibleThreateningAirTags$: Observable<PossibleThreateningTracker[]> = this.backgroundFetchFacade.possibleThreateningAirTags$;
  protected possibleThreateningSmartTags$: Observable<PossibleThreateningTracker[]> = this.backgroundFetchFacade.possibleThreateningSmartTags$;
  protected possibleThreateningTiles$: Observable<PossibleThreateningTracker[]> = this.backgroundFetchFacade.possibleThreateningTiles$;

  constructor(private backgroundFetchFacade: BackgroundFetchFacade, private router: Router) { }

  ngOnInit() {
    this.backgroundFetchFacade.fetchThreateningDevices();
  }

  onCardClick(possibleThreat: PossibleThreateningTracker) {
    this.backgroundFetchFacade.setSelectedThreateningDevice(possibleThreat);
    this.router.navigate(['threat-details'])
  }

}
