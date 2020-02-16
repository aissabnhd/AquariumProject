import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Employe} from "../employe";
import {EmployeService} from "../employe.service";

@Component({
  selector: 'app-employe-fiche',
  templateUrl: './employe-fiche.component.html',
  styleUrls: ['./employe-fiche.component.css']
})
export class EmployeFicheComponent implements OnInit {


  employe: Employe;
  constructor(private employeService : EmployeService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.employeService.getEmploye(id).subscribe(data => this.employe = data );

  }


}
