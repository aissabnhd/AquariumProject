import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Secteur} from "../secteur";
import {SecteurService} from "../secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Bassin} from "../../bassins/bassin";
import {BassinService} from "../../bassins/bassin.service";
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-secteur-modifier-bassin',
  templateUrl: './secteur-modifier-bassin.component.html',
  styleUrls: ['./secteur-modifier-bassin.component.css']
})
export class SecteurModifierBassinComponent implements OnInit {
  bassin_ajout: Array<Bassin>;
  secteur: Secteur;
  id : number;
  role : Role;
  updateSecteur = new EventEmitter<Secteur>();

  constructor(private secteurService : SecteurService, private snackBar : MatSnackBar, private bassinService : BassinService, private route: ActivatedRoute) { }

  refresh(){
    this.secteurService.getSecteur(this.id).subscribe(
      data => {

        this.bassinService.getAllBassins().subscribe(
          data2 => {
            this.secteur = data,
            this.bassin_ajout = data2,
              this.extracted()

          }
        );
      }
    );
  }

  ngOnInit() {
    this.role = this.route.snapshot.params['role']
    this.id = this.route.snapshot.params['id'];
    this.refresh();
  }

   extracted() {
    for (let i = 0; i < this.bassin_ajout.length; i++) {
      for (let j = 0; j < this.secteur.lstBassin.length; j++) {
        if (this.bassin_ajout[i].id == this.secteur.lstBassin[j].id) {

          this.bassin_ajout.splice(i, 1);
          i--;
          j = this.secteur.lstBassin.length;
        }
      }

    }
  }
  onDelete(id : number) {
    this.secteurService.removeBassinSecteur(this.secteur.id, id).subscribe(
      data => {
        this.snackBar.open('Bassin retiré !', 'OK', { verticalPosition: 'top', duration: 5000 });
        this.updateSecteur.emit(data),
          this.refresh()
      },
    error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })


  )

  }

   onAdd(id : number) {
      this.secteurService.assignBassinSecteur(this.secteur.id, id).subscribe(
        data => {
          this.snackBar.open('Bassin ajouté !', 'OK', { verticalPosition: 'top', duration: 5000 });
          this.updateSecteur.emit(data),
            this.refresh()
        },
        error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })


      )

    }

}
