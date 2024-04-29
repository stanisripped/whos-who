import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/services/session.service";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent implements OnInit {
  storedUsers = localStorage.getItem("users");
  users: string[] = [];
  username: string = "";


  constructor(private router: Router, private sessionService: SessionService) {}

  usernameEmpty = true;
  showError = false;
 

  ngOnInit(): void {
    if (this.storedUsers) {
      this.users = JSON.parse(this.storedUsers);
    }
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
    console.log(this.username);
  }

  checkEmpty() {
    this.username.length > 0
      ? (this.usernameEmpty = true)
      : (this.usernameEmpty = false);
  }

  onClick() {

    this.checkEmpty();
    if (this.usernameEmpty) {
      this.router.navigateByUrl("game");
      //this.users.push(this.username);
      this.sessionService.createCurrentUser(this.username);
      //localStorage.setItem("users", JSON.stringify(this.users));
    } else {
      this.showError = true;
    }

  }
}
