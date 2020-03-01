import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Espece} from '../espece';
import {EspeceService} from '../espece.service';
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-espece',
  templateUrl: './espece.component.html',
  styleUrls: ['./espece.component.css']
})
export class EspeceComponent implements OnInit {

  @Input()
  espece : Espece;

  @Input()
  role : Role;

  @Output()
  deleteEspece = new EventEmitter<Espece>();
  constructor(private snackBar : MatSnackBar, private especeService: EspeceService) { }

  ngOnInit() {
  }

  onDelete(){
      this.especeService.deleteEspece(this.espece.id).subscribe(
        data => {
          this.snackBar.open('Espèce supprimée !', 'OK', { verticalPosition: 'top', duration: 5000 });
          this.deleteEspece.emit(this.espece)
        },
        error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })
      )
    }

}
