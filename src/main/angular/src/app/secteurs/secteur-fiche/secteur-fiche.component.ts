import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SecteurService} from "../secteur.service";
import {Secteur} from "../secteur";

@Component({
  selector: 'app-secteur-fiche',
  templateUrl: './secteur-fiche.component.html',
  styleUrls: ['./secteur-fiche.component.css']
})
export class SecteurFicheComponent implements OnInit {

   secteur: Secteur;
    constructor(private secteurService : SecteurService, private route: ActivatedRoute) { }

    ngOnInit() {
      let id = this.route.snapshot.params['id'];
      this.secteurService.getSecteur(id).subscribe(data => this.secteur = data );

    }

}
