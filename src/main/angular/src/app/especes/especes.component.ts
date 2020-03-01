import { Component, OnInit } from '@angular/core';
import {Espece} from './espece';
import {EspeceService} from './espece.service';
import {ActivatedRoute} from "@angular/router";
import {Role} from "../employes/employe";

@Component({
  selector: 'app-especes',
  templateUrl: './especes.component.html',
  styleUrls: ['./especes.component.css']
})
export class EspecesComponent implements OnInit {
  private especes : Array<Espece>;
  role : Role;
  constructor(private especeService : EspeceService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
    this.refreshEspeces();
  }

   refreshEspeces(){
       this.especeService.getAllEspeces().subscribe(
            data => this.especes = data


            );
     }

}
