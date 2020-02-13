import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Bassin} from "../../bassins/bassin";
import {BassinService} from "../../bassins/bassin.service";
import {Activite} from "../activite";
import {ActiviteService} from "../activite.service";

@Component({
  selector: 'app-activite-create',
  templateUrl: './activite-create.component.html',
  styleUrls: ['./activite-create.component.css']
})
export class ActiviteCreateComponent implements OnInit {
  bassins : Array<Bassin>;

  activiteForm : FormGroup;

  @Output()
  createActivite = new EventEmitter<Activite>();
  constructor(private activiteService : ActiviteService, private formBuilder: FormBuilder, private bassinService : BassinService) { }

  ngOnInit() {
    this.bassinService.getAllBassins().subscribe(
      data => {
        this.bassins = data,

          this.activiteForm = this.formBuilder.group({
            nom: [null, Validators.required],
            public_act: new FormControl(true),
            bassin: new FormControl(this.bassins[0].id),
            date_debut: [null, Validators.required],
            date_fin: [null, Validators.required],
            heure_debut: [null, Validators.required],
            heure_fin: [null, Validators.required]
          });
      }

    )


  }

  onSubmit(){
    let activite: Activite =  this.activiteForm.value;
    activite.bassin = null;
    let d2: Date = new Date(activite.date_debut);
    let tab = this.activiteForm.get('heure_debut').value.split(':')
    d2.setHours(tab[0]);
    d2.setMinutes(tab[1]);

    let d3: Date = new Date(activite.date_fin);
        let tab2 = this.activiteForm.get('heure_fin').value.split(':')
        d3.setHours(tab2[0]);
        d3.setMinutes(tab2[1]);

    activite.date_debut = d2;
    activite.date_fin = d3;

    this.activiteService.createActivite(activite, (this.activiteForm.get('bassin').value)).subscribe(
      data => this.createActivite.emit(activite),
      error => console.log(error)
    );
  }

}
