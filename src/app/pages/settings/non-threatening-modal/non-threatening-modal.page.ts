import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonicModule, ModalController } from '@ionic/angular';
import { SettingsFacade } from '@core/store/facades/settings.facade';
import { Observable, first } from 'rxjs';

@Component({
  selector: 'app-non-threatening-modal',
  templateUrl: './non-threatening-modal.page.html',
  styleUrls: ['./non-threatening-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NonThreateningModalPage implements OnInit {
  protected nrOfAirTags$: Observable<number> = this.settingsFacade.numberOfIgnoredAirTags$;
  protected nrOfSmartTags$: Observable<number> = this.settingsFacade.numberOfIgnoredSmartTags$;
  protected tileBlacklist$: Observable<string[]> = this.settingsFacade.tileBlacklist$;
  protected tilesNotInBlacklist$: Observable<string[]> = this.settingsFacade.tilesNotInBlacklist$;
  @ViewChild('select') addingSelect!: IonSelect;

  constructor(private settingsFacade: SettingsFacade, private modalController: ModalController) { }

  ngOnInit() {
  }

  newTileSelected(event: any) {
    if (!event.detail.value) {
      return;
    }
    this.settingsFacade.addTileToBlacklist(event.detail.value);
    this.addingSelect.value = undefined
  }

  removeTile(ignoredTile: string) {
    this.settingsFacade.removeTileFromBlacklist(ignoredTile);
  }

  updatePluginWithData() {
    this.settingsFacade.blacklist$.pipe(
      first()
    ).subscribe(blacklist => {
      this.settingsFacade.sendBlacklistToPlugin(blacklist);
      this.modalController.dismiss(null, 'done');
    })
  }

}
