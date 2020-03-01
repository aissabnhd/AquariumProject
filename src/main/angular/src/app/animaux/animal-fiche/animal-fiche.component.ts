import { Component, OnInit } from '@angular/core';
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {ActivatedRoute} from "@angular/router";
import {AnimalService} from "../animal.service";
import {Animal} from "../animal";
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-animal-fiche',
  templateUrl: './animal-fiche.component.html',
  styleUrls: ['./animal-fiche.component.css']
})
export class AnimalFicheComponent implements OnInit {

  animal: Animal;
  role : Role;
  constructor(private animalService : AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role'];
    this.animalService.getAnimal(id).subscribe(data => this.animal = data );

  }
}
