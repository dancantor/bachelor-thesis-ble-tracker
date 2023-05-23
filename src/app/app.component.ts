import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorePersistenceFacade } from '@core/store/facades/store-persistence.facade';
import { AppState } from '@core/store/state/app.state';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],

})
export class AppComponent implements OnInit, OnDestroy {
  private stateSubscription: Subscription = new Subscription();
  constructor(private appStateFacade: StorePersistenceFacade) {
  }
  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.stateSubscription = this.appStateFacade.hasStartedBackgroundFetch$.subscribe((appState: AppState) => this.appStateFacade.saveStateOfStore(appState))
  }
}
