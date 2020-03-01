import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BassinService} from "../bassins/bassin.service";
import {EmployeService} from "../employes/employe.service";
import {Employe, Role} from "../employes/employe";
import {Bassin} from "../bassins/bassin";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-calendriers',
  templateUrl: './calendriers.component.html',
  styleUrls: ['./calendriers.component.css']
})
export class CalendriersComponent implements OnInit {

  employeForm : FormGroup;
  bassinForm : FormGroup;
  private employes: Array<Employe>;
  private bassins: Array<Bassin>;
  role : Role;

  constructor(private bassinService : BassinService, private employeService : EmployeService, private formBuilder : FormBuilder, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role']
    this.employeService.getAllEmployes().subscribe(
      data => {
        this.employes = data,
          this.employeForm = this.formBuilder.group({
            employe: new FormControl(this.employes[0].id)
          });
      }
    )
    this.bassinService.getAllBassins().subscribe(
      data => {
        this.bassins = data,
          this.bassinForm = this.formBuilder.group({
            bassin: new FormControl(this.bassins[0].id)
          });
      }
    )
  }

  onSubmitEmploye() {
    console.log(this.employeForm.get('employe').value)
    this.router.navigate(['/calendrier/' + this.role + '/'  + this.employeForm.get('employe').value ]);
  }

  onSubmitBassin() {
    console.log(this.bassinForm.get('bassin').value)
    this.router.navigate(['/calendrierBassin/' + this.bassinForm.get('bassin').value + '/' + this.role]);

  }
}
