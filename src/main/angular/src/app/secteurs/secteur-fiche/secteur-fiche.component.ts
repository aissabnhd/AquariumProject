import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SecteurService} from "../secteur.service";
import {Secteur} from "../secteur";
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-secteur-fiche',
  templateUrl: './secteur-fiche.component.html',
  styleUrls: ['./secteur-fiche.component.css']
})
export class SecteurFicheComponent implements OnInit {

   secteur: Secteur;
   role : Role;
    constructor(private secteurService : SecteurService, private route: ActivatedRoute) { }

    ngOnInit() {
      let id = this.route.snapshot.params['id'];
      this.role = this.route.snapshot.params['role']
      this.secteurService.getSecteur(id).subscribe(data => this.secteur = data );

    }

}
