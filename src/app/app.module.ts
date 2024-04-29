import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { LeaderboardComponent } from "./pages/leaderboard/leaderboard.component";
import { ResultComponent } from "./pages/result/result.component";
import { GameComponent } from "./pages/game/game.component";
import { NextButtonComponent } from "./components/next-button/next-button.component";
import { QuestionComponent } from "./components/question/question.component";
import { CancelButtonComponent } from "./components/cancel-button/cancel-button.component";
import { ScoreComponent } from "./components/score/score.component";
import { BackButtonComponent } from "./components/back-button/back-button.component";
import { LeaderboardItemComponent } from "./components/leaderboard-item/leaderboard-item.component";
import { SettingsQuestionTypeComponent } from "./components/settings-question-type/settings-question-type.component";
import { SettingsTextSizeComponent } from "./components/settings-text-size/settings-text-size.component";
import { SettingsVolumeComponent } from "./components/settings-volume/settings-volume.component";
import { CreateUserComponent } from "./pages/create-user/create-user.component";
import { TextInputComponent } from "./components/text-input/text-input.component";
import { PlayerComponent } from "./components/player/player.component";
import { Howl } from "howler";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "create-user", component: CreateUserComponent },
  { path: "settings", component: SettingsComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "game", component: GameComponent },
  { path: "result", component: ResultComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    LeaderboardComponent,
    ResultComponent,
    GameComponent,
    NextButtonComponent,
    QuestionComponent,
    CancelButtonComponent,
    ScoreComponent,
    BackButtonComponent,
    LeaderboardItemComponent,
    SettingsQuestionTypeComponent,
    SettingsTextSizeComponent,
    SettingsVolumeComponent,
    CreateUserComponent,
    TextInputComponent,
    PlayerComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
