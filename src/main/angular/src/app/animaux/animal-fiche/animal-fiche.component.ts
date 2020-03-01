import { Component, OnInit } from '@angular/core';
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {ActivatedRoute} from "@angular/router";
import {AnimalService} from "../animal.service";
import {Animal} from "../animal";
import {Role} from "../../employes/employe";
import {BassinService} from "../../bassins/bassin.service";
import {Bassin} from "../../bassins/bassin";
import {SecteurService} from "../../secteurs/secteur.service";
import {Secteur} from "../../secteurs/secteur";

@Component({
  selector: 'app-animal-fiche',
  templateUrl: './animal-fiche.component.html',
  styleUrls: ['./animal-fiche.component.css']
})
export class AnimalFicheComponent implements OnInit {

  animal: Animal;
  role : Role;
  bassin: Bassin;
  private secteur: Secteur;
  constructor(private animalService : AnimalService, private bassinService : BassinService, private secteurService : SecteurService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role'];
    this.animalService.getAnimal(id).subscribe(data => {
      this.animal = data;
      this.getBassinName();

    } );

  }

  formatDate(nombre : number, chiffre : number) {

    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {
    }
    return temp;
  }

  dateToString(d : Date){
    let d2 = new Date(d);
    return "" + this.formatDate(d2.getDate(), 2) + "/" + this.formatDate(d2.getMonth()+1, 2) + "/" + this.formatDate(d2.getFullYear(), 4);
  }

  getBassinName() {
    let b = this.bassinService.getBassinFromEspece(this.animal.espece.id).subscribe(
      data => {
        this.bassin = data;
        this.secteurService.getSecteurFromBassin(this.bassin.id).subscribe(
          data => this.secteur = data
        )
      }
    )
  }
}
