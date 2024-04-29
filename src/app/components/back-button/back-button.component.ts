import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-back-button",
  templateUrl: "./back-button.component.html",
  styleUrls: ["./back-button.component.css"],
})
export class BackButtonComponent implements OnInit {
  constructor(private location: Location) {}

  goBack() {
    const currentUrl = this.location.path();
    console.log(currentUrl);
    let relative_path = "../";

    this.location.back();
  }

  ngOnInit(): void {}
}
