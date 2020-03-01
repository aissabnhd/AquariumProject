import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SecteurService} from "../secteur.service";
import {Secteur} from "../secteur";
import {Role} from "../../employes/employe";
import {Espece} from "../../especes/espece";
import {Animal} from "../../animaux/animal";
import {AnimalService} from "../../animaux/animal.service";
import {BassinService} from "../../bassins/bassin.service";

@Component({
  selector: 'app-secteur-fiche',
  templateUrl: './secteur-fiche.component.html',
  styleUrls: ['./secteur-fiche.component.css']
})
export class SecteurFicheComponent implements OnInit {

   secteur: Secteur;
   role : Role;
   especes : Array<Espece> = [];
   animaux : Array<Animal> = [];
    constructor(private animalService :AnimalService, private bassinService : BassinService, private secteurService : SecteurService, private route: ActivatedRoute) { }

  concatener(tab, tab2){
    if(tab == [])
      return tab2
    if(tab2 == [])
      return tab
    return tab.concat(tab2);
  }

    ngOnInit() {
      let id = this.route.snapshot.params['id'];
      this.role = this.route.snapshot.params['role']
      this.secteurService.getSecteur(id).subscribe(data => {
        this.secteur = data;
        for(let a = 0; a < this.secteur.lstBassin.length; a++){
          this.especes = this.concatener(this.especes, this.secteur.lstBassin[a].lst);
        }
        for(let i = 0; i < this.especes.length; i++){
          this.animalService.getAnimauxOfEspece(this.especes[i].id).subscribe(
            data => this.animaux = this.concatener(this.animaux, data)
          )
        }
      } );

    }

}
