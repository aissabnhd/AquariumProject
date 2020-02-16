import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {Employe, Role} from "../employe";
import {EmployeService} from "../employe.service";

@Component({
  selector: 'app-employe-create',
  templateUrl: './employe-create.component.html',
  styleUrls: ['./employe-create.component.css']
})
export class EmployeCreateComponent implements OnInit {
  employeForm = this.formBuilder.group({
    nom: [null, Validators.required],
    prenom: [null, Validators.required],
    adresse: [null, Validators.required],
    role: [null, Validators.required],
    date_naissance: [null, Validators.required],
    num_secu_sociale: [null, Validators.required],
  });

  roles = [Role.admin, Role.gestionnaire, Role.employe];

  @Output()
  createEmploye = new EventEmitter<Employe>();
  constructor(private employeService : EmployeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(){
    let employe: Employe =  this.employeForm.value;
    this.employeService.createEmploye(employe).subscribe(
      data => this.createEmploye.emit(employe),
      error => console.log(error)
    );
  }




}
