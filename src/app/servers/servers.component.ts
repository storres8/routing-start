import { Component, OnInit } from "@angular/core";
import { ServersService } from "./servers.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"]
})
export class ServersComponent implements OnInit {
  private servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    // ActivatedRoute hold the absolute path to this component.
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // .navigate() method does not know what current route we are on. So we can pass to it a second argument
    // which is an object that tells is the current absolute path to get to this component. We can then use
    // the first argument, the array of relative paths, to add to the absolute path to initiate a new url.
    // With this.route from our constructor angular now knows the exact url path to this component.
    //
    // this.router.navigate(["servers"], { relativeTo: this.route });
  }
}
