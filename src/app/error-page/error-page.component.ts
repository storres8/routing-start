import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.css"]
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  // inject activated route to be able to access the data that is being passed within the route.
  constructor(private route: ActivatedRoute) {}

  // Now inside of ngOnInit we can access a snapshot of our current route and access the data.
  ngOnInit() {
    this.errorMessage = this.route.snapshot.data["message"];

    // we must also remeber that this only works if the component is not being updated from within.
    // if it is then we must subscribe to the data observable and get the updated data.

    this.route.data.subscribe((newData: Data) => {
      this.errorMessage = newData["message"];
    });
  }
}
