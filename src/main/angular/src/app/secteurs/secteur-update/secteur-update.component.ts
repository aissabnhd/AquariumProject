import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SecteurService} from "../secteur.service";
import {Secteur} from "../secteur";

@Component({
  selector: 'app-secteur-update',
  templateUrl: './secteur-update.component.html',
  styleUrls: ['./secteur-update.component.css']
})
export class SecteurUpdateComponent implements OnInit {

  secteurForm: FormGroup;
  id:number;

  @Output()
  updateSecteur = new EventEmitter<Secteur>();
  constructor(private secteurService : SecteurService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
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
            data => this.updateSecteur.emit(secteur),
            error => console.log(error)

    )


  }
}
