// src/app/services/signalr/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private itemUpdateSubject = new BehaviorSubject<any>(null);

  itemUpdate$ = this.itemUpdateSubject.asObservable();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://192.168.29.46:5000/atsHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.start().catch(err => console.error('SignalR Connection Error: ', err));

    this.hubConnection.on('ReceiveItemUpdate', (userId: number, attendanceLogTime: Date, checkType: string) => {
      this.itemUpdateSubject.next({ userId, attendanceLogTime, checkType });
    });
  }
}
