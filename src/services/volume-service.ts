import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class VolumeService {
  private volume: number = 5;

  constructor() {}

  getVolume() {
    return this.volume;
  }

  setVolume(amount: string): void {
    localStorage.setItem("volume", amount);
  }
}
