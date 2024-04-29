import { Component, Input, OnInit } from "@angular/core";
import Track from "src/app/models/Track";
import { SessionService } from "src/services/session.service";

const POINTS_PER_CORRECT_ANSWER = 100;

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  @Input() answerOptions = ["1", "2", "3", "4"];

  @Input() playMode = "artist";

  @Input() track: Track = {
    id: 1,
    url: "string",
    artist: "string",
    album: "string",
    name: "string",
  };

  @Input() trackName: string = "404";

  @Input() correctAnswer: string = "404";

  @Input() trackUrl: string = "";

  @Input() nextClicked: boolean = false;

  correctSelected: boolean = false;
  currentScore: number = 0;
  answerChosen: boolean = false;
  showError: boolean = false;
  submitClicked: boolean = false;

  check(answer: string) {
    this.correctSelected = answer === this.correctAnswer;
    this.answerChosen = true;
  }

  showCorrect() {
    if (this.answerChosen === false) {
      this.showError = true;
    } else {
      if (this.correctSelected) {
        this.sessionService.updateScore(
          this.currentScore + POINTS_PER_CORRECT_ANSWER
        );
      }
      console.log(this.correctSelected);
      this.submitClicked = true;
      this.answerChosen = true;
      this.showError = false;
    }
  }

  resetComponent() {
    this.correctSelected = false;
    this.answerChosen = false;
    this.showError = false;
    this.submitClicked = false;
    this.nextClicked = false;
    console.log("Reset component called!");
  }

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.currentScore.subscribe(
      (data) => (this.currentScore = data)
    );

    // this.artists.filter((item) => item != this.track.artist);
    // this.answers = this.artists
    //   .map((item, idx) => ({
    //     item: item,
    //     idx: Math.random() * this.artists.length,
    //   }))
    //   .sort((a, b) => (a.idx > b.idx ? 1 : -1))
    //   .map((item) => item.item)
    //   .slice(0, NUMBER_OF_CHOICES - 1);
    // this.answers.push(this.track.artist);
    // this.answers
    //   .map((item, idx) => ({
    //     item: item,
    //     idx: Math.random() * this.artists.length,
    //   }))
    //   .sort((a, b) => (a.idx > b.idx ? 1 : -1))
    //   .map((item) => item.item);
  }
}
