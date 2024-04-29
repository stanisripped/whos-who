import { Component, OnInit, Input, Output } from "@angular/core";
import { VolumeService } from "src/services/volume-service";

@Component({
  selector: "app-settings-volume",
  templateUrl: "./settings-volume.component.html",
  styleUrls: ["./settings-volume.component.css"],
})
export class SettingsVolumeComponent implements OnInit {
  @Input() min: number = 0;
  @Input() max: number = 10;
  @Input() amount: number = 5;

  increment() {
    this.amount = this.amount < this.max ? this.amount + 1 : this.amount;
    this.changeVolume(this.amount);
  }

  decrement() {
    this.amount = this.amount > this.min ? this.amount - 1 : this.amount;
    this.changeVolume(this.amount);
  }

  changeVolume(amount: number) {
    this.volumeService.setVolume(String(amount));
    console.log(amount);
  }

  constructor(private volumeService: VolumeService) {}

  ngOnInit(): void {
    this.amount = Number(localStorage.getItem("volume"));
  }
}
