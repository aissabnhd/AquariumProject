import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Secteur} from "../secteur";
import {SecteurService} from "../secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.css']
})
export class SecteurComponent implements OnInit {
 @Input()
  secteur : Secteur;

 @Input()
 role : Role;

  @Output()
  deleteSecteur = new EventEmitter<Secteur>();
  constructor(private secteurService: SecteurService) { }

  ngOnInit() {
  }

  onDelete(){
    this.secteurService.deleteSecteur(this.secteur.id).subscribe(
      data => this.deleteSecteur.emit(this.secteur),
      error => console.log(error)
    )
  }


}
