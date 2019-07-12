import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // snapshot works only once, and is used if you know you won't be changing your fragment or QPs from
    // inside this component.
    //
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    // using .subscribe allows you to react to changed query/fragment parameters.
    this.route.queryParams.subscribe((queryParams: Params) => {
      // queryParams is just an object so we access it my providing the key.
      this.allowEdit = queryParams["allowEdit"] === "1" ? true : false;
    });
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params["id"];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }
}
