import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { }

  public async set(key: string, value: any) {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    return this._storage?.get(key);
  }
}
