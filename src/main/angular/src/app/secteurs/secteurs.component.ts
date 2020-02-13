import { Component, OnInit } from '@angular/core';
import {Secteur} from "./secteur";
import {SecteurService} from "./secteur.service";

@Component({
  selector: 'app-secteurs',
  templateUrl: './secteurs.component.html',
  styleUrls: ['./secteurs.component.css']
})
export class SecteursComponent implements OnInit {
 private secteurs : Array<Secteur>;
  constructor(private secteurService : SecteurService) { }

  ngOnInit() {
    this.refreshSecteurs();
  }

  refreshSecteurs(){
    this.secteurService.getAllSecteurs().subscribe(
      data => this.secteurs = data


    );
  }


}
