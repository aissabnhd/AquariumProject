import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(private router : Router, private snackBar : MatSnackBar, private especeService : EspeceService, private route: ActivatedRoute) { }

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
              data => {
                this.snackBar.open('Espèce modifiée !', 'OK', { verticalPosition: 'top', duration: 5000 });
                this.router.navigate(['/especes/'+this.role]);
                this.updateEspece.emit(espece)
              },
              error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })
            );

          }

}









