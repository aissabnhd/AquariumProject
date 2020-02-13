import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Bassin} from "../../bassins/bassin";
import {BassinService} from "../../bassins/bassin.service";
import {Activite} from "../activite";
import {ActiviteService} from "../activite.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-activite-update',
  templateUrl: './activite-update.component.html',
  styleUrls: ['./activite-update.component.css']
})
export class ActiviteUpdateComponent implements OnInit {

  activiteForm: FormGroup;
  bassins : Array<Bassin>;

  id:number;

  @Output()
  updateActivite = new EventEmitter<Activite>();
  constructor(private bassinService : BassinService, private activiteService : ActiviteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let activite: Activite;


      this.activiteService.getActivite(this.id).subscribe(data => {
        this.activiteForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          public_act: new FormControl(data.public_act),
           bassin: new FormControl(data.bassin.id),
          date_debut: new FormControl(data.date_debut),
           heure_debut:  new FormControl(),
          date_fin: new FormControl(data.date_fin),
          heure_fin:  new FormControl(),
        });

      }
    );


    this.bassinService.getAllBassins().subscribe(
      data => this.bassins = data

    )
  }

    onSubmit(){
      let activite: Activite =  this.activiteForm.value;
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
      activite.bassin = null;
      this.activiteService.updateActivite(activite, activite.id, (this.activiteForm.get('bassin').value)).subscribe(
        data => this.updateActivite.emit(activite),
        error => console.log(error)
      );
    }
}
