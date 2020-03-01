import { Component, OnInit } from '@angular/core';
import {Activite} from "./activite";
import {ActiviteService} from "./activite.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../employes/employe";

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.css']
})
export class ActivitesComponent implements OnInit {

    private activites : Array<Activite>;
    role : Role;
    constructor(private activiteService : ActiviteService, private route : ActivatedRoute) { }

    ngOnInit() {
        this.role = this.route.snapshot.params['role']
      this.refreshActivites();
    }

    refreshActivites(){
      this.activiteService.getAllActivites().subscribe(
        data => this.activites = data


      );
    }
}
