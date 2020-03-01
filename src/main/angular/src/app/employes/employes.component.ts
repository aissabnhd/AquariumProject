import { Component, OnInit } from '@angular/core';
import {Employe, Role} from "./employe";
import {EmployeService} from "./employe.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  private employes : Array<Employe>;
  role : Role;
  constructor(private employeService : EmployeService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role']
    this.refreshEmployes();
  }

  refreshEmployes(){
    this.employeService.getAllEmployes().subscribe(
      data => this.employes = data


    );
  }
}
