import { Component } from '@angular/core';
import {Employe} from "./employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  role = "visiteur";

  constructor(private snackBar : MatSnackBar) {
  }

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
    this.role = this.employe.role;
    this.isConnected = true;
    this.tryToConnect = false;
  }

  disconnect(){
    this.snackBar.open("Déconnexion effectuée !", 'OK', { verticalPosition: 'top', duration:5000 })

    this.employe = null;
    this.role = "visiteur";
    this.isConnected = false;
    this.tryToConnect = false;

  }
}
