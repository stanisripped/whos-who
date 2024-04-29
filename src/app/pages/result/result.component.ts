import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/services/session.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  username: string = "404";
  totalScore: number = -1;

  replay() {
    this.router.navigateByUrl("create-user");
  }
  constructor(private sessionService: SessionService, private router: Router) {
    this.sessionService.username.subscribe((data) => {
      this.username = data;
    });
    this.sessionService.currentScore.subscribe((data) => {
      this.totalScore = data;
    });

    let leaderboard = localStorage.getItem("leaderboard");
    if (leaderboard != null) {
      let parsed = JSON.parse(leaderboard);
      parsed.push({ username: this.username, score: this.totalScore });
      localStorage.setItem("leaderboard", JSON.stringify(parsed));
    } else {
      localStorage.setItem(
        "leaderboard",
        JSON.stringify([{ username: this.username, score: this.totalScore }])
      );
    }
  }

  ngOnInit(): void {}
}
