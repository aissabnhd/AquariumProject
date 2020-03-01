import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-espece-update',
  templateUrl: './espece-update.component.html',
  styleUrls: ['./espece-update.component.css']
})
export class EspeceUpdateComponent implements OnInit {
 especeForm: FormGroup;

       id:number;

       role : Role;

       @Output()
       updateEspece = new EventEmitter<Espece>();
  constructor(private especeService : EspeceService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.role = this.route.snapshot.params['role'];
      let esp: Espece;
      this.especeService.getEspece(this.id).subscribe(data => {

       this.especeForm = new FormGroup({
              id: new FormControl(this.id),
              nom: new FormControl(data.nom),
              esperance: new FormControl(data.esperance),
              regime: new FormControl(data.regime),
              menace: new FormControl(data.menace)
            });
           }
            );
  }

  onSubmit(){
            let espece: Espece =  this.especeForm.value;
            espece.id = this.id;
            this.especeService.updateEspece(espece, espece.id).subscribe(
              data => this.updateEspece.emit(espece),
              error => console.log(error)
            );

          }

}









