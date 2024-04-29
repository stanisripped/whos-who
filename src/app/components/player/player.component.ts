import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Howl } from "howler";
import { VolumeService } from "src/services/volume-service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})
export class PlayerComponent implements OnInit, OnChanges {
  @Input() url = "";
  playing: boolean = false;
  sound = new Howl({ src: [] });
  playbackPosition: number = 0;
  maxDuration: number = 0;
  progress: any;

  togglePlay() {
    if (this.playing) {
      this.sound.pause();
    } else {
      this.sound.play();
    }

    this.playing = !this.playing;
  }

  seek(event: any): void {
    const percent = event.target.value;
    this.sound.seek(this.sound.duration() * (percent / 100));
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["url"] && !changes["url"].firstChange) {
      this.createSound();
    }
  }

  setMaxDuration() {
    this.maxDuration = this.sound ? this.sound.duration() : 0;
  }

  createSound() {
    if (this.sound) {
      this.sound.unload(); // Unload the previous sound if it exists
    }
    this.sound = new Howl({
      src: this.url,
      html5: true,
    });

    this.setMaxDuration();
  }

  ngOnInit(): void {
    this.sound = new Howl({
      src: this.url,
      html5: true,
      volume: Number(localStorage.getItem("volume")) / 10,
    });

    this.setMaxDuration();

    this.progress = setInterval(() => {
      if (this.sound) {
        this.playbackPosition = this.sound.seek() || 0;
      }
    }, 1000);
  }
}
