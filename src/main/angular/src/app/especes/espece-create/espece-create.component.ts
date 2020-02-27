import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'
import {BassinService} from "../../bassins/bassin.service";
import {Bassin} from "../../bassins/bassin";

@Component({
  selector: 'app-espece-create',
  templateUrl: './espece-create.component.html',
  styleUrls: ['./espece-create.component.css']
})
export class EspeceCreateComponent implements OnInit {
  especeForm : FormGroup;

   @Output()
   createEspece = new EventEmitter<Espece>();
   bassins: Array<Bassin>;
  constructor(private especeService : EspeceService, private formBuilder: FormBuilder, private bassinService : BassinService) { }

  ngOnInit() {
    this.bassinService.getAllBassins().subscribe(

      data => {
        this.bassins = data;
        this.especeForm = this.formBuilder.group({
          nom: [null, Validators.required],
          esperance: [null, Validators.required],
          regime: [null, Validators.required],
          menace: [null, Validators.required],
          bassin: new FormControl(this.bassins[0].id),
        });
      },
    );
  }

  onSubmit(){
        let espece: Espece =  this.especeForm.value;
        espece.bassin = null;
        this.especeService.createEspece(espece, this.especeForm.get('bassin').value).subscribe(
          data => this.createEspece.emit(espece),
          error => console.log(error)
        );
      }



}



