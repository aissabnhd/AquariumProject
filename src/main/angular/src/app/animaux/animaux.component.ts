import { Component, OnInit } from '@angular/core';
import {Animal} from "./animal";
import {AnimalService} from "./animal.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../employes/employe";

@Component({
  selector: 'app-animaux',
  templateUrl: './animaux.component.html',
  styleUrls: ['./animaux.component.css']
})
export class AnimauxComponent implements OnInit {
  private animaux : Array<Animal>;
  role : Role;
  constructor(private animalService : AnimalService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
    this.refreshAnimaux();
  }

  refreshAnimaux(){
    this.animalService.getAllAnimaux().subscribe(
      data => this.animaux = data


    );
  }


}
