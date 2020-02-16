import { Component } from '@angular/core';
import {Employe} from "./employes/employe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aquarium';
  isConnected = false;
  tryToConnect = false;
  employe : Employe = null;

  tryConnect() {
    this.tryToConnect = true;
  }

  isNowConnected($event){
    if($event == false){
      this.tryToConnect = false;
      return;
    }

    if($event == null)
      return;

    this.employe = $event;
    this.isConnected = true;
    this.tryToConnect = false;
  }

  disconnect(){
    this.employe = null;
    this.isConnected = false;
    this.tryToConnect = false;

  }
}
