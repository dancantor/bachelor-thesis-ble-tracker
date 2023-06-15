import { Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
  {
    path: '',
    component: FooterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'live-scanning',
      },
      {
        path: 'live-scanning',
        loadComponent: () => import('./pages/live-scanning/live-scanning.page').then( m => m.LiveScanningPage)
      },
      {
        path: 'threat-detection',
        loadComponent: () => import('./pages/threat-detection/threat-detection.page').then( m => m.ThreatDetectionPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
      },
      {
        path: 'threat-details',
        loadComponent: () => import('./pages/threat-detection/threat-details/threat-details.page').then( m => m.ThreatDetailsPage)
      },
    ]
  },
  {
    path: 'non-threatening-modal',
    loadComponent: () => import('./pages/settings/non-threatening-modal/non-threatening-modal.page').then( m => m.NonThreateningModalPage)
  },


];
