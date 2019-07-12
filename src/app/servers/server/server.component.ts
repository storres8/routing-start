import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";

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
    // the commented out code below is how we origianlly loaded a server- through the params.

    // // using the + to convert the string to a number once we get the id.
    // const id = +this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(id);

    // // subscribed to the event, but don't have to in this case b/c we are not changing our params in this
    // // component. We are changing our params when we click a new server from the the servers component.
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params["id"]);
    // });

    // we are now using our server resolver to access our server data. The server key used in the newData object
    // is the same as the resolver key that we placed in our routes. So once the route loads, it will also
    // initiate the method that we build into our resolver and thus load the specific server. We then save
    // this new server as a value to the server key in our resolve object which is accessed here.
    this.route.data.subscribe((newData: Data) => {
      this.server = newData["server"];
    });
  }

  onEdit() {
    // When you want to use a relative route with the navigate method we have to set up a relative to object
    // along side the relative array to show the current path that we are on.
    // This.route value inside the object houses are current path. We then use relative path to append edit
    // since we already have the id in the current path.

    // we added queryParamsHandling which does as the name suggests. It has two values: merge or preserve. The
    // default behavior of switching routes is to eliminate any existing QPs in the route when we render
    // a new route. But with queryParamsHandling we can merge any old QPs with new ones set here, or simply
    // preserve the old ones into this component with the preserve value.
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve"
    });
  }
}
