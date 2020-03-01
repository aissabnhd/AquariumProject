import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Secteur} from "../secteur";
import {SecteurService} from "../secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(private snackBar : MatSnackBar, private secteurService: SecteurService) { }

  ngOnInit() {
  }

  onDelete(){
    this.secteurService.deleteSecteur(this.secteur.id).subscribe(
      data => {
        this.snackBar.open('Secteur supprimé !', 'OK', { verticalPosition: 'top', duration: 5000 });
        this.deleteSecteur.emit(this.secteur)
      },
      error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })
    )
  }


}
