import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'

@Component({
  selector: 'app-espece-update',
  templateUrl: './espece-update.component.html',
  styleUrls: ['./espece-update.component.css']
})
export class EspeceUpdateComponent implements OnInit {
 especeForm = new FormGroup({
        id : new FormControl(''),
        nom: new FormControl(''),
        esperance: new FormControl(''),
        regime: new FormControl(''),
        menace: new FormControl('')
      });

       @Output()
       updateEspece = new EventEmitter<Espece>();
  constructor(private especeService : EspeceService) { }

  ngOnInit() {
  }

  onSubmit(){
            let espece: Espece =  this.especeForm.value;
            this.especeService.updateEspece(espece, espece.id).subscribe(
              data => this.updateEspece.emit(espece),
              error => console.log(error)
            );

          }

}









