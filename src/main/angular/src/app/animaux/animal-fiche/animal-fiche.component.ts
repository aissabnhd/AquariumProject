import { Component, OnInit } from '@angular/core';
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {ActivatedRoute} from "@angular/router";
import {AnimalService} from "../animal.service";
import {Animal} from "../animal";

@Component({
  selector: 'app-animal-fiche',
  templateUrl: './animal-fiche.component.html',
  styleUrls: ['./animal-fiche.component.css']
})
export class AnimalFicheComponent implements OnInit {

  animal: Animal;
  constructor(private animalService : AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.animalService.getAnimal(id).subscribe(data => this.animal = data );

  }
}
