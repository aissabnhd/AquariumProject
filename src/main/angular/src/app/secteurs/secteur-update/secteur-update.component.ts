import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SecteurService} from "../secteur.service";
import {Secteur} from "../secteur";
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-secteur-update',
  templateUrl: './secteur-update.component.html',
  styleUrls: ['./secteur-update.component.css']
})
export class SecteurUpdateComponent implements OnInit {

  secteurForm: FormGroup;
  id:number;
  role : Role;

  @Output()
  updateSecteur = new EventEmitter<Secteur>();
  constructor(private router : Router, private snackBar : MatSnackBar, private secteurService : SecteurService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role']
    let secteur: Secteur;


      this.secteurService.getSecteur(this.id).subscribe(data => {
        this.secteurForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          localisation: new FormControl(data.localisation)
        });

      }
    );

  }

  onSubmit(){
    let secteur: Secteur =  this.secteurForm.value;
    this.secteurService.updateSecteur(secteur, secteur.id).subscribe(
            data => {
              this.snackBar.open('Secteur modifié !', 'OK', { verticalPosition: 'top', duration: 5000 });
              this.router.navigate(['/secteurs/'+this.role]);
              this.updateSecteur.emit(secteur)
            },
      error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })

    )


  }
}
