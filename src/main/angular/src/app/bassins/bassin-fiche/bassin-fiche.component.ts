import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BassinService} from "../bassin.service";
import {Bassin} from "../bassin";
import {Role} from "../../employes/employe";
import {Secteur} from "../../secteurs/secteur";
import {Animal} from "../../animaux/animal";
import {SecteurService} from "../../secteurs/secteur.service";
import {AnimalService} from "../../animaux/animal.service";
@Component({
  selector: 'app-bassin-fiche',
  templateUrl: './bassin-fiche.component.html',
  styleUrls: ['./bassin-fiche.component.css']
})
export class BassinFicheComponent implements OnInit {
  role: Role;
  bassin: Bassin;
  secteur: Secteur;
  animaux : Array<Animal> = [];
  constructor(private secteurService : SecteurService, private animalService : AnimalService, private bassinService : BassinService, private route: ActivatedRoute) { }

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
    this.bassinService.getBassin(id).subscribe(data => {
      this.bassin = data;
      this.secteurService.getSecteurFromBassin(this.bassin.id).subscribe(
        data => {
          this.secteur = data;
          for(let i = 0; i < this.bassin.lst.length; i++){
            this.animalService.getAnimauxOfEspece(this.bassin.lst[i].id).subscribe(
              data => this.animaux = this.concatener(this.animaux, data)
            )
          }
        }
      )
    } );
  }
}
