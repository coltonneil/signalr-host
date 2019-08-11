import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';

@Component({
  selector: 'app-secure-connection',
  templateUrl: './secure-connection.component.html',
  styleUrls: ['./secure-connection.component.scss']
})
export class SecureConnectionComponent implements OnInit {

  groupId: string;
  message: string;

  constructor(private signalrService: SignalrService) {}

  ngOnInit() {
    this.signalrService.connect();
    this.signalrService.messageRecieved.subscribe((message: string) => {
      this.message = message;
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
      result += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    return result;
  }
}
