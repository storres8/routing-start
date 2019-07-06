import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      // snapshot is great for first time approaches such as when the component is initialized.
      // The problem is snapshot doesn't cause a re-render so any new data that would come it,
      // you won't have access too.
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"]
    };
    // params is an observable, meaning that we can subscribe to the event, and when the params change,
    // the first function that we pass into subscribe will be fired off.
    this.route.params.subscribe(params => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }
}
