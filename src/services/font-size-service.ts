import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FontSizeService {
  private fontSize: string = "medium"; // Default font size

  constructor() {}

  getFontSize() {
    return this.fontSize;
  }

  setFontSize(size: string): void {
    const root = document.documentElement;
    root.style.setProperty("--font-size", this.getPixelValue(size));
    localStorage.setItem("fontSize", size);
  }

  private getPixelValue(size: string): string {
    switch (size) {
      case "Small":
        return "16px";
      case "Medium":
        return "24px";
      case "Large":
        return "30px";
      default:
        return "24px"; // Default size
    }
  }
}
