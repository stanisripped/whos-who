import { Component, OnInit } from "@angular/core";
import { FontSizeService } from "src/services/font-size-service";

@Component({
  selector: "app-settings-text-size",
  templateUrl: "./settings-text-size.component.html",
  styleUrls: ["./settings-text-size.component.css"],
})
export class SettingsTextSizeComponent implements OnInit {
  selectedSize: string = "";

  changeFontSize(event: any) {
    this.fontSizeService.setFontSize(event.target.value);
  }

  constructor(private fontSizeService: FontSizeService) {}

  ngOnInit(): void {
    this.selectedSize = localStorage.getItem("fontSize") || "";
    this.fontSizeService.setFontSize(this.selectedSize);
  }
}
