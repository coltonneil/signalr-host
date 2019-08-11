import { Component, OnInit } from "@angular/core";
import * as signalR from "@aspnet/signalr";

@Component({
  selector: `app-root`,
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.scss`]
})
export class AppComponent implements OnInit {
  title = `signalr-client`;

  constructor() {}

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl(`http://localhost:5000/messages`)
      .build();

    connection
      .start()
      .then(() => {
        console.log(`Connected!`);
      })
      .catch(err => {
        return console.error(err.toString());
      });

    connection.on(`ReceiveMessage`, (payload: string) => {
      console.log(`message recieved: ${payload}`);
    });

    connection.on(`UserConnected`, (connectionId: string) => {
      console.log(`connected: ${connectionId}`);
      connection.invoke(`JoinGroup`, `PrivateGroup`).then(() => {
        console.log(`joining group: PrivateGroup`);
      });
    });

  }
}
