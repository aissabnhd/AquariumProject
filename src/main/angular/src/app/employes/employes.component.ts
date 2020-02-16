import { Component, OnInit } from '@angular/core';
import {Employe} from "./employe";
import {EmployeService} from "./employe.service";

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  private employes : Array<Employe>;
  constructor(private employeService : EmployeService) { }

  ngOnInit() {
    this.refreshEmployes();
  }

  refreshEmployes(){
    this.employeService.getAllEmployes().subscribe(
      data => this.employes = data


    );
  }
}
