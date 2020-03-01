import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Espece} from '../espece';
import {EspeceService} from '../espece.service';
import {Role} from "../../employes/employe";

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
  constructor(private especeService: EspeceService) { }

  ngOnInit() {
  }

  onDelete(){
      this.especeService.deleteEspece(this.espece.id).subscribe(
        data => this.deleteEspece.emit(this.espece),
        error => console.log(error)
      )
    }

}
