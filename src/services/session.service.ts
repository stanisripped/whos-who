import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, subscribeOn } from "rxjs";
import fetchFromSpotify, { request } from "./api";
import Track from "src/app/models/Track";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  tracks: Track[] = [];

  allArtists: string[] = [];

  private usernameSource = new BehaviorSubject<string>("");
  username = this.usernameSource.asObservable();

  private currentScoreSource = new BehaviorSubject<number>(0);
  currentScore = this.currentScoreSource.asObservable();

  private currentTracksSource = new BehaviorSubject<Track[]>([]);
  currentTracks = this.currentTracksSource.asObservable();

  private artistsSource = new BehaviorSubject<string[]>([]);
  artists = this.artistsSource.asObservable();

  initTracks() {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadTracks(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadTracks(newToken.value);
    });
  }

  loadTracks = async (t: any) => {
    this.configLoading = true;

    const response = await fetchFromSpotify({
      token: t,
      endpoint: "playlists/5ABHKGoOzxkaa28ttQV9sE",
    }).then((data) => {
      let id = 0;
      for (let trackItem of data.tracks.items) {
        if (trackItem.track.preview_url !== null) {
          this.tracks.push({
            id: id,
            url: trackItem.track.preview_url,
            artist: trackItem.track.artists[0].name,
            album: trackItem.track.album.name,
            name: trackItem.track.name,
          });
          id++;
          //console.log(trackItem.track.preview_url);
        }
        //this.artistsSource.next([...,]);
        this.allArtists = this.allArtists.includes(
          trackItem.track.artists[0].name
        )
          ? this.allArtists
          : [...this.allArtists, trackItem.track.artists[0].name];
      }
      //console.log(this.allArtists);
      this.artistsSource.next(this.allArtists);
    });
    let temp = this.tracks
      .map((track, idx) => ({
        track: track,
        idx: Math.random() * this.tracks.length,
      }))
      .sort((a, b) => (a.idx > b.idx ? -1 : 1))
      .map((track) => track.track)
      .slice(0, 10);
    this.currentTracksSource.next(temp);

    this.configLoading = false;
  };

  createCurrentUser(username: string) {
    this.usernameSource.next(username);
  }

  updateScore(score: number) {
    this.currentScoreSource.next(score);
  }
}
