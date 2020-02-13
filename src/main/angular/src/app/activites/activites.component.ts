import { Component, OnInit } from '@angular/core';
import {Activite} from "./activite";
import {ActiviteService} from "./activite.service";

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.css']
})
export class ActivitesComponent implements OnInit {

    private activites : Array<Activite>;
    constructor(private activiteService : ActiviteService) { }

    ngOnInit() {
      this.refreshActivites();
    }

    refreshActivites(){
      this.activiteService.getAllActivites().subscribe(
        data => this.activites = data


      );
    }
}
