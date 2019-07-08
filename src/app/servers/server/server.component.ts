import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // using the + to convert the string to a number once we get the id.
    const id = +this.route.snapshot.params["id"];
    this.server = this.serversService.getServer(id);

    // subscribed to the event, but don't have to in this case b/c we are not changing our params in this
    // component. We are changing our params when we click a new server from the the servers component.
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
    });
  }

  onEdit() {
    // When you want to use a relative route with the navigate method we have to set up a relative to object
    // along side the relative array to show the current path that we are on.
    // This.route value inside the object houses are current path. We then use relative path to append edit
    // since we already have the id in the current path.
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
