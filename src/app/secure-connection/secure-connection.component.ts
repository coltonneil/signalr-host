import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';

@Component({
  selector: 'app-secure-connection',
  templateUrl: './secure-connection.component.html',
  styleUrls: ['./secure-connection.component.scss']
})
export class SecureConnectionComponent implements OnInit {
  groupId = '';
  cardData: string;
  connectedToGuest = false;
  paymentRequested = false;
  paymentProcessed = false;
  status = '';

  constructor(private signalrService: SignalrService) {}

  ngOnInit() {
    this.signalrService.connect();
    this.signalrService.cardDataRecieved.subscribe((cardData: string) => {
      this.cardData = cardData;
      this.processPayment();
    });
    this.signalrService.guestJoinedEvent.subscribe(() => {
      this.connectedToGuest = true;
    });
  }

  createGroup(): void {
    this.groupId = this.generateGroupId();
    this.signalrService.joinGroup(this.groupId);
  }

  generateGroupId(): string {
    let result = '';
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let index = 0; index < 6; index++) {
      result += validChars.charAt(
        Math.floor(Math.random() * validChars.length)
      );
    }
    return result;
  }

  promptForPayment(): void {
    this.signalrService.promptForPayment();
    this.paymentRequested = true;
    this.status = 'Payment requested';
  }

  processPayment(): void {
    setTimeout( () => {
      this.signalrService.notifyPaymentStatus();
      this.paymentProcessed = true;
      this.status = 'Payment successful';
    }, 1000 );
  }
}
