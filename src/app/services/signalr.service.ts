import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  cardDataRecieved: EventEmitter<string>;
  guestJoinedEvent: EventEmitter<void>;
  guestJoined: boolean;
  guestId = '';
  connectionId: string;

  constructor() {
    this.createConnection();
    this.cardDataRecieved = new EventEmitter<string>();
    this.guestJoinedEvent = new EventEmitter<void>();
  }

  private createConnection(): void {
    console.log('creating connection');
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl(`https://signalr-demo-api.azurewebsites.net/messages`)
      .build();
  }

  public connect(): void {
    this.connection
      .start()
      .then(() => {
        this.connection.on(`RecieveCardData`, (payload: string) => {
          this.cardDataRecieved.emit(payload);
        });
        this.connection.on(`UserConnected`, (guestId: string) => {
          if (this.guestJoined) {
            console.log('MULTIPLE GUESTS CONNECTED');
          } else {
            this.guestJoined = true;
            this.guestId = guestId;
          }
          console.log('user connected?');
          this.guestJoinedEvent.emit();
        });
        this.connection.on(`Connected`, (connectionId: string) => {
          this.connectionId = connectionId;
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

  public promptForPayment(): void {
    this.connection.invoke(`PromptForPayment`, this.guestId, `$50.00|${this.connectionId}`).then(() => {
    });
  }
  public notifyPaymentStatus(): void {
    this.connection.invoke(`NotifyPaymentStatus`, this.guestId, `Payment successful`).then(() => {
    });
  }

}
