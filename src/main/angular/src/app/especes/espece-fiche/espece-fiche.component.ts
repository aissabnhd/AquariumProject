import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service';
import {Role} from "../../employes/employe";
import {Secteur} from "../../secteurs/secteur";
import {Bassin} from "../../bassins/bassin";
import {SecteurService} from "../../secteurs/secteur.service";
import {BassinService} from "../../bassins/bassin.service";
import {Animal} from "../../animaux/animal";
import {AnimalService} from "../../animaux/animal.service";

@Component({
  selector: 'app-espece-fiche',
  templateUrl: './espece-fiche.component.html',
  styleUrls: ['./espece-fiche.component.css']
})
export class EspeceFicheComponent implements OnInit {

  espece: Espece;
  bassin : Bassin;
  secteur : Secteur;
  animaux : Array<Animal>;

  role : Role;
  constructor(private animalService : AnimalService, private especeService : EspeceService, private secteurService : SecteurService, private bassinService : BassinService, private route: ActivatedRoute) { }

  ngOnInit() {
      let id = this.route.snapshot.params['id'];
      this.role = this.route.snapshot.params['role'];
      this.especeService.getEspece(id).subscribe(data => {

        this.espece = data;
        this.bassinService.getBassinFromEspece(this.espece.id).subscribe(
          data => {
            this.bassin = data;
            this.secteurService.getSecteurFromBassin(this.bassin.id).subscribe(
              data => {
                this.secteur = data;
                this.animalService.getAnimauxOfEspece(this.espece.id).subscribe(
                  data => this.animaux = data
                )
              }
            )
          }
        )
      } );

  }

}
