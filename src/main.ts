import { HydrationEffects, StorePersistenceEffects } from './app/core/store/effects/store-persistence.effects';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { ForegroundService } from '@awesome-cordova-plugins/foreground-service/ngx';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers, reducers } from '@core/store';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideEffects } from '@ngrx/effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    ForegroundService,
    provideStore(reducers, {metaReducers: metaReducers}),
    provideStoreDevtools(),
    provideEffects([HydrationEffects, StorePersistenceEffects]),
    importProvidersFrom(IonicStorageModule.forRoot())
  ],
});
