import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PossibleThreateningTracker } from 'ble-background-scan/dist/esm/models/possible-threatening-treacker';
import { BackgroundFetchFacade } from '@core/store/facades/background-fetch.facade';
import { Observable, from } from 'rxjs';
import { GoogleMap } from '@capacitor/google-maps';
import { MarkerModalComponent } from './marker-modal/marker-modal.component';

@Component({
  selector: 'app-threat-details',
  templateUrl: './threat-details.page.html',
  styleUrls: ['./threat-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThreatDetailsPage implements OnInit {
  selectedThreateningDevice$: Observable<PossibleThreateningTracker | null> = this.backgroundFetchFacade.selectedThreateningDevice$;
  selectedThreateningDevice!: PossibleThreateningTracker | null;
  markersInfo: {[markerId: string]: {deviceId: string; datetime: string}} = {}
  private API_KEY = "AIzaSyAj09UHSXlchRgVc7Ypig3NFeVDkZJUpG0"
  isMapLoaded = false;
  map!: GoogleMap;
  @ViewChild('map') mapRef!: ElementRef;
  constructor(private backgroundFetchFacade: BackgroundFetchFacade, private modal: ModalController) { }

  ngOnInit(): void {
    this.selectedThreateningDevice$.subscribe((selectedThreateningDevice) => {
      this.selectedThreateningDevice = selectedThreateningDevice;
    })
  }

  ionViewDidEnter() {
    if (!this.isMapLoaded) {
      this.loadMap()
    }
  }

  async loadMap() {
    console.log(this.mapRef)
    if (this.mapRef !== undefined && this.selectedThreateningDevice !== null) {
      this.map = await GoogleMap.create({
        id: 'my-map', // Unique identifier for this map instance
        element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
        apiKey: this.API_KEY, // Your Google Maps API Key
        forceCreate: true,
        config: {
          center: {
            // The initial position to be rendered by the map
            lat: this.selectedThreateningDevice.locations[0].latitude,
            lng: this.selectedThreateningDevice.locations[0].longitude,
          },
          zoom: 14, // The initial zoom level to be rendered by the map
        },
      });
      this.isMapLoaded = true;
      this.selectedThreateningDevice.locations.forEach(location => {
        this.map.addMarker({coordinate: {lat: location.latitude, lng: location.longitude}}).then((markerId) => {
          this.markersInfo[markerId] = {datetime: location.datetime, deviceId: location.locationDeviceId};
        })
      })
      this.map.setOnMarkerClickListener(async (marker) => {
        const modal = await this.modal.create({
          component: MarkerModalComponent,
          componentProps: {
            marker: this.markersInfo[marker.markerId]
          },
          breakpoints: [0, 0.1],
          initialBreakpoint: 0.1
        });
        await modal.present();
      })

    }
  }

}
