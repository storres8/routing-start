import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  // Inject Router to allows router access to the button onClick event onLoadServers.
  constructor(private router: Router) {}

  ngOnInit() {}

  onLoadServers() {
    // .navigate take as an argument an array of the different segments of your path.
    // Your path can be either absolute or relative.
    this.router.navigate(["/servers"]);
  }
}
