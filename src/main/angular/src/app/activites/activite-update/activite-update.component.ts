import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Bassin} from "../../bassins/bassin";
import {BassinService} from "../../bassins/bassin.service";
import {Activite} from "../activite";
import {ActiviteService} from "../activite.service";
import {ActivatedRoute} from "@angular/router";
import {Employe, Role} from "../../employes/employe";
import {EmployeService} from "../../employes/employe.service";


@Component({
  selector: 'app-activite-update',
  templateUrl: './activite-update.component.html',
  styleUrls: ['./activite-update.component.css']
})
export class ActiviteUpdateComponent implements OnInit {

  activiteForm: FormGroup;
  bassins : Array<Bassin>;
  nbResponsable = [1];
  role : Role;

  employes : Array<Employe>;
  id:number;

  @Output()
  updateActivite = new EventEmitter<Activite>();
  constructor(private bassinService : BassinService, private employeService : EmployeService, private activiteService : ActiviteService, private route: ActivatedRoute, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let activite: Activite;

  this.role = this.route.snapshot.params['role']
      this.activiteService.getActivite(this.id).subscribe(data => {
        console.log(data);

        this.employeService.getAllEmployes().subscribe(
          data2 => this.employes = data2
        )
        this.activiteForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          public_act: new FormControl(data.public_act),
           bassin: new FormControl(data.bassin.id),
          date_debut: new FormControl(new Date(data.date_debut).toISOString().substring(0, 10)),
           heure_debut:  new FormControl( this.formatDate(new Date(data.date_debut).getHours(), 2)+":"+ this.formatDate(new Date(data.date_debut).getMinutes(), 2)),
          heure_fin:  new FormControl(this.formatDate(new Date(data.date_fin).getHours(), 2)+":"+ this.formatDate(new Date(data.date_fin).getMinutes(), 2)),
          employes: this.formBuilder.array([

          ])
        });
        const control = <FormArray>this.activiteForm.controls['employes'];
        for(let i = 0; i < data.responsables.length; i++){
          control.push(new FormControl(data.responsables[i].id))
        }

      }
    );


    this.bassinService.getAllBassins().subscribe(
      data => this.bassins = data

    )
  }

  formatDate(nombre : number, chiffre : number) {
    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {}
    return temp;
  }

    onSubmit(){
      let activite: Activite =  this.activiteForm.value;
      let d2: Date = new Date(activite.date_debut);
      let tab = this.activiteForm.get('heure_debut').value.split(':')
      d2.setHours(tab[0]);
      d2.setMinutes(tab[1]);

      let d3: Date = new Date(activite.date_debut);
          let tab2 = this.activiteForm.get('heure_fin').value.split(':')
          d3.setHours(tab2[0]);
          d3.setMinutes(tab2[1]);

      activite.date_debut = d2;
      activite.date_fin = d3;
      activite.bassin = null;
      this.activiteService.updateActivite(activite, activite.id, (this.activiteForm.get('bassin').value)).subscribe(
        data => {
          const control = <FormArray>this.activiteForm.controls['employes'];
          tab = [];
          for(let i = 0; i <  control.length; i++){
            tab.push(control.get(i.toString()).value);
            /*this.activiteService.addEmployes(activite, data.id, control.get(i.toString()).value).subscribe(
              data => console.log(data)
            )*/
          }
          console.log(data);
          this.activiteService.createActiviteBis(data.id, tab).subscribe(
            data => this.updateActivite.emit(activite)
          );
        },
        error => console.log(error)
      );


    }
  removeReponsable() {
    const control = <FormArray>this.activiteForm.controls['employes'];
    if(control.length  > 1){

      control.removeAt(0);
    }
  }

  addReponsable() {
    const control = <FormArray>this.activiteForm.controls['employes'];
    if(control.length < this.employes.length) {

      control.push(new FormControl())
    }
  }
}
