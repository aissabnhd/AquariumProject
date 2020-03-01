import { Component, OnInit } from '@angular/core';
import {Secteur} from "./secteur";
import {SecteurService} from "./secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../employes/employe";

@Component({
  selector: 'app-secteurs',
  templateUrl: './secteurs.component.html',
  styleUrls: ['./secteurs.component.css']
})
export class SecteursComponent implements OnInit {
 private secteurs : Array<Secteur>;
 role : Role;
  constructor(private secteurService : SecteurService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
    this.refreshSecteurs();
  }

  refreshSecteurs(){
    this.secteurService.getAllSecteurs().subscribe(
      data => this.secteurs = data


    );
  }


}
