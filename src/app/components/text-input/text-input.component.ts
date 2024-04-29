import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"],
})
export class TextInputComponent implements OnInit {
  @Input() placeHolder: string = "";
  text: string = "";

  constructor() {}

  ngOnInit(): void {}

  setText(text: string) {
    this.text = text;
    this.textChange.emit(this.text);
  }

  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();
}
