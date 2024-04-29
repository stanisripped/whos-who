import { Component, Input, OnInit } from "@angular/core";
interface Result {
  username: string;
  totalScore: number;
}
@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"],
})
export class LeaderboardComponent implements OnInit {
  @Input() forResultPage: boolean = false;
  hiddenClass = "";
  storedUsers = localStorage.getItem("users");
  leaderboard = "";
  display: any[] = [];
  constructor() {
    let temp = localStorage.getItem("leaderboard");
    if (temp != null) {
      let leadeboard = JSON.parse(temp);
      console.log(leadeboard);
      for (let item of leadeboard) {
        this.display.push({ username: item.username, score: item.score });
      }
      this.display.sort((a, b) => (a.score < b.score ? 1 : -1));
    } else {
      console.log("nothin");
    }
  }

  ngOnInit(): void {
    if (this.forResultPage) {
      this.display = this.display.slice(0, 3);
      this.hiddenClass = "hidden";
    }
  }
}
