import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { QuestionComponent } from "src/app/components/question/question.component";
import Track from "src/app/models/Track";
import { SessionService } from "src/services/session.service";
const NUMBER_OF_CHOICES = 4;
const NUMBER_OF_QUESTIONS = 10;
@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
  @ViewChild(QuestionComponent) questionComponent:
    | QuestionComponent
    | undefined;

  // TODO
  @Input() playMode: string = "artist";

  // track question
  questionNumber = 1;

  // placeholder to hold artists after subscribing to service
  artists: string[] = [];

  // answerOptions to pass to question component
  answers: string[] = [];

  // URL To pass to player
  currentUrl: string = "abc";

  nextClicked: boolean = false;

  showError: boolean = false;

  // to pass
  currentTrack: Track = {
    id: 1,
    url: "string",
    artist: "string",
    album: "string",
    name: "string",
  };

  currentArtist: string = "400";

  // for subscribe
  tracks: Track[] = [];

  currentAnswers: string[] = ["A", "B", "C", "D"];

  currentName: string = "400";

  nextQuestion() {
    if (this.questionComponent?.submitClicked) {
      if (this.questionNumber == NUMBER_OF_QUESTIONS) {
        this.router.navigateByUrl("result");
      }
      //
      this.questionNumber += 1;
      if (this.questionNumber - 1 < this.tracks.length) {
        this.currentTrack = this.tracks[this.questionNumber - 1];
        this.currentUrl = this.currentTrack.url;
        this.currentAnswers = this.getAnswerOptions(this.currentTrack);
        this.currentName = this.currentTrack.name;
        this.currentArtist = this.currentTrack.artist;
      }

      if (this.questionComponent) {
        this.questionComponent.resetComponent();
      }
      this.showError = false;
    } else {
      this.showError = true;
    }
  }

  getAnswerOptions = (track: Track) => {
    this.artists.filter((item) => item != track.artist);
    let temp = this.artists
      .map((item, idx) => ({
        item: item,
        idx: Math.random() * this.artists.length,
      }))
      .sort((a, b) => (a.idx > b.idx ? 1 : -1))
      .map((item) => item.item)
      .slice(0, NUMBER_OF_CHOICES - 1);

    temp.push(this.currentTrack.artist);
    return temp
      .map((item, idx) => ({
        item: item,
        idx: Math.random() * this.artists.length,
      }))
      .sort((a, b) => (a.idx > b.idx ? 1 : -1))
      .map((item) => item.item);
  };

  constructor(private sessionService: SessionService, private router: Router) {
    this.sessionService.initTracks();
    this.sessionService.currentTracks.subscribe((data) => (this.tracks = data));
    if (this.playMode === "artist") {
      this.sessionService.artists.subscribe((data) => {
        this.artists = data;
      });
      //console.log(this.artists);
    }
    this.currentTrack = this.tracks[0];
    this.currentUrl = this.currentTrack.url;
    this.currentAnswers = this.getAnswerOptions(this.currentTrack);
    this.currentName = this.currentTrack.name;
    this.currentArtist = this.currentTrack.artist;
  }

  ngOnInit(): void {}
  //   //console.log(this.tracks);
  //   if (this.questionNumber >= this.tracks.length) {
  //     return;
  //   }

  //   this.artists.filter(
  //     (item) => item != this.tracks[this.questionNumber - 1].artist
  //   );

  //   this.answers = this.artists
  //     .map((item, idx) => ({
  //       item: item,
  //       idx: Math.random() * this.artists.length,
  //     }))
  //     .sort((a, b) => (a.idx > b.idx ? 1 : -1))
  //     .map((item) => item.item)
  //     .slice(0, NUMBER_OF_CHOICES - 1);

  //   this.answers.push(this.tracks[this.questionNumber - 1].artist);

  //   this.answers
  //     .map((item, idx) => ({
  //       item: item,
  //       idx: Math.random() * this.artists.length,
  //     }))
  //     .sort((a, b) => (a.idx > b.idx ? 1 : -1))
  //     .map((item) => item.item);
}
