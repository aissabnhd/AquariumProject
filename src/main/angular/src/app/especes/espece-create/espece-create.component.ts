import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'

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

   @Output()
   createEspece = new EventEmitter<Espece>();
  constructor(private especeService : EspeceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(){
        let espece: Espece =  this.especeForm.value;
        this.especeService.createEspece(espece).subscribe(
          data => this.createEspece.emit(espece),
          error => console.log(error)
        );
      }



}



