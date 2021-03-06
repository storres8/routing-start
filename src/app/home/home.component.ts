import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  // Inject Router to allows router access to the button onClick event onLoadServers.
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onLoadServers(id: number) {
    // .navigate take as an argument an array of the different segments of your path.
    // Your path can be either absolute or relative.
    //
    // This also demonstrates how to programatically send query parameters and fragments.
    this.router.navigate(["/servers", id, "edit"], {
      queryParams: { allowEdit: 1 },
      fragment: "loading"
    });
  }

  onLogin() {
    this.authService.login();
    console.log("You have successfully logged in");
  }

  onLogout() {
    this.authService.logout();
    console.log("You have successfully logged out");
  }
}
