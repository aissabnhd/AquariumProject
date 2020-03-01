import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {Employe, Role} from "../employe";
import {EmployeService} from "../employe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(private router : Router, private snackBar : MatSnackBar, private employeService : EmployeService, private formBuilder: FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role']
  }

  onSubmit(){
    let employe: Employe =  this.employeForm.value;
    this.employeService.createEmploye(employe).subscribe(
      data => {
        this.snackBar.open('Employé créé !', 'OK', { verticalPosition: 'top', duration: 5000 });
        this.router.navigate(['/employes/'+this.role]);
        this.createEmploye.emit(employe)
      },
      error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })
    );
  }


  showPassword() {
    this.show = !this.show;
  }
}
