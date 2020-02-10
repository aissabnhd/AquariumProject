import { Component, OnInit } from '@angular/core';
import {Animal} from "./animal";
import {AnimalService} from "./animal.service";

@Component({
  selector: 'app-animaux',
  templateUrl: './animaux.component.html',
  styleUrls: ['./animaux.component.css']
})
export class AnimauxComponent implements OnInit {
  private animaux : Array<Animal>;
  constructor(private animalService : AnimalService) { }

  ngOnInit() {
    this.refreshAnimaux();
  }

  refreshAnimaux(){
    this.animalService.getAllAnimaux().subscribe(
      data => this.animaux = data


    );
  }


}
