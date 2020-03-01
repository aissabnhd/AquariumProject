import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-espece-create',
  templateUrl: './espece-create.component.html',
  styleUrls: ['./espece-create.component.css']
})
export class EspeceCreateComponent implements OnInit {
  especeForm = this.formBuilder.group({
        nom: [null, Validators.required],
        esperance: [null, Validators.required],
        regime: [null, Validators.required],
        menace: [null, Validators.required],
      });

  role : Role;
   @Output()
   createEspece = new EventEmitter<Espece>();
  constructor(private snackBar : MatSnackBar, private router : Router, private especeService : EspeceService, private formBuilder: FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
  }

  onSubmit(){
        let espece: Espece =  this.especeForm.value;
        this.especeService.createEspece(espece).subscribe(
          data => {
            this.snackBar.open('Espèce créée !', 'OK', { verticalPosition: 'top', duration: 5000 });
            this.router.navigate(['/especes/'+this.role]);
            this.createEspece.emit(espece)
          },
          error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })
        );
      }



}



