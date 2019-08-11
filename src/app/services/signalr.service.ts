import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  messageRecieved: EventEmitter<string>;
  constructor() {
    this.createConnection();
    this.messageRecieved = new EventEmitter<string>();
  }

  private createConnection(): void {
    console.log('creating connection');
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl(`http://localhost:5000/messages`)
      .build();
  }

  public connect(): void {
    this.connection
      .start()
      .then(() => {
        this.connection.on(`ReceiveMessage`, (payload: string) => {
          this.messageRecieved.emit(payload);
          console.log(`message recieved: ${payload}`);
        });
        this.connection.on(`UserConnected`, (connectionId: string) => {
          console.log(`connected: ${connectionId}`);
        });
      })
      .catch(err => {
        return console.error(err.toString());
      });
  }

  public joinGroup(groupName: string): void {
    this.connection.invoke(`JoinGroup`, groupName).then(() => {
      console.log(`created group: ${groupName}`);
    });
  }
}
