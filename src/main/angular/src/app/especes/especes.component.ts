import { Component, OnInit } from '@angular/core';
import {Espece} from './espece';
import {EspeceService} from './espece.service';

@Component({
  selector: 'app-especes',
  templateUrl: './especes.component.html',
  styleUrls: ['./especes.component.css']
})
export class EspecesComponent implements OnInit {
  private especes : Array<Espece>;
  constructor(private especeService : EspeceService) { }

  ngOnInit() {
    this.refreshEspeces();
  }

   refreshEspeces(){
       this.especeService.getAllEspeces().subscribe(
            data => this.especes = data


            );
     }

}
