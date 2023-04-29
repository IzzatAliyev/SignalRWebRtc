import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private baseUrl: string = environment.signalingServerUrl;

  private hubConnection: HubConnection | undefined;

  constructor() { }

  async connect(path: string, withToken: boolean): Promise<void> {
    console.log("SignalrService.connect");
    const url = this.baseUrl + path;

    const builder = new HubConnectionBuilder();
    if (!withToken) {
      builder.withUrl(url);
    } else {
      builder.withUrl(url, {
        accessTokenFactory: () => {
          return sessionStorage.getItem('token');
        }
      } as IHttpConnectionOptions);
    }
    this.hubConnection = builder.withAutomaticReconnect().build();

    return this.hubConnection.start()
      .then(() => {
        if (this.isConnected()) {
          console.log('SignalR: Connected to the server: ' + url);
        }
      })
      .catch(err => {
        console.error('SignalR: Failed to start with error: ' + err.toString());
      });
  }

  async define(methodName: string, newMethod: (...args: any[]) => void): Promise<void> {
    console.log("SignalrService.define");
    if (this.hubConnection) {
      this.hubConnection.on(methodName, newMethod);
    }
  }

  async invoke(methodName: string, ...args: any[]): Promise<any> {
    console.log("SignalrService.invoke");
    if (this.isConnected()) {
      // @ts-ignore
      return this.hubConnection.invoke(methodName, ...args);
    }
  }

  disconnect(): void {
    console.log("SignalrService.disconnect");
    if (this.isConnected()) {
      // @ts-ignore
      this.hubConnection.stop();
    }
  }

  isConnected(): boolean {
    console.log("SignalrService.isConnected");
    // @ts-ignore
    return this.hubConnection && this.hubConnection.state === HubConnectionState.Connected;
  }
}
