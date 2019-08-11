import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'signalr-client';

  constructor() { }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Trace)
      .withUrl(`http://localhost:5000/notify`)
      .build();

    connection.start().then(() => {
      console.log('Connected!');
    }).catch(err => {
      return console.error(err.toString());
    });

    connection.on(`BroadcastMessage`, (type: string, payload: string) => {
      console.log(`message recieved: ` + payload);
    });
  }
}
