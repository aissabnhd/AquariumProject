import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../employe.service";
import {Employe, Role} from "../employe";

@Component({
  selector: 'app-employe-update',
  templateUrl: './employe-update.component.html',
  styleUrls: ['./employe-update.component.css']
})
export class EmployeUpdateComponent implements OnInit {
  employeForm: FormGroup;

  id:number;
  show = false;

  roles = [Role.employe, Role.gestionnaire, Role.responsable];
  role : Role;
  @Output()
  updateEmploye = new EventEmitter<Employe>();
  constructor(private  router : Router, private employeService : EmployeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role']
    this.employeService.getEmploye(this.id).subscribe(data => {

        this.employeForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          prenom: new FormControl(data.prenom),
          adresse: new FormControl(data.adresse),
          date_naissance: new FormControl(new Date(data.date_naissance).toISOString().substring(0, 10)),
          num_secu_sociale: new FormControl(data.num_secu_sociale),
          role: new FormControl(data.role),
          login: new FormControl(data.login),
          password: new FormControl(data.password)
        });
      }
    );
  }

  onSubmit(){
    let employe: Employe =  this.employeForm.value;
    employe.id = this.id;
    this.employeService.updateEmploye(employe, employe.id).subscribe(
      data => {
        this.router.navigate(['/employes/'+this.role]);
        this.updateEmploye.emit(employe)
      },
      error => console.log(error)
    );

  }

  showPassword() {
    this.show = !this.show;
  }
}
