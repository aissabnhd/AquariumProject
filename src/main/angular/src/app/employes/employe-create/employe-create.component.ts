import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {Employe, Role} from "../employe";
import {EmployeService} from "../employe.service";
import {ActivatedRoute} from "@angular/router";

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
    login: [null, Validators.required],
    password: [null, Validators.required]
  });

  show = false;

  roles = [Role.responsable, Role.gestionnaire, Role.employe];
  role : Role;

  @Output()
  createEmploye = new EventEmitter<Employe>();
  constructor(private employeService : EmployeService, private formBuilder: FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role']
  }

  onSubmit(){
    let employe: Employe =  this.employeForm.value;
    this.employeService.createEmploye(employe).subscribe(
      data => this.createEmploye.emit(employe),
      error => console.log(error)
    );
  }


  showPassword() {
    this.show = !this.show;
  }
}
