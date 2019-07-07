import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // snapshot works only once, and is used if you know you won't be changing your fragment or QPs from
    // inside this component.
    //
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    // using .subscribe allows you to react to changed query/fragment parameters.
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
  }
}
