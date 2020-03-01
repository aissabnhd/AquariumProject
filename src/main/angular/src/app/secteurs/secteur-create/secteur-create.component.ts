import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Secteur} from "../secteur";
import {SecteurService} from "../secteur.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-secteur-create',
  templateUrl: './secteur-create.component.html',
  styleUrls: ['./secteur-create.component.css']
})
export class SecteurCreateComponent implements OnInit {
  secteurForm : FormGroup;
  role : Role;
  @Output()
  createSecteur = new EventEmitter<Secteur>();
  constructor(private secteurService : SecteurService, private formBuilder: FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
      this.role = this.route.snapshot.params['role']
      this.secteurForm = this.formBuilder.group({
            nom: [null, Validators.required],
            localisation: [null, Validators.required]
          });
      }



  onSubmit(){
    let secteur: Secteur =  this.secteurForm.value;

    this.secteurService.createSecteur(secteur).subscribe(
      data => this.createSecteur.emit(secteur),
      error => console.log(error)
    );
  }

}
