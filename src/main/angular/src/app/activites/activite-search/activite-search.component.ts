import { Component, OnInit } from '@angular/core';
import {Animal, Sexe} from "../../animaux/animal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {AnimalService} from "../../animaux/animal.service";
import {Activite} from "../activite";
import {Bassin} from "../../bassins/bassin";
import {ActiviteService} from "../activite.service";
import {BassinService} from "../../bassins/bassin.service";


@Component({
  selector: 'app-activite-search',
  templateUrl: './activite-search.component.html',
  styleUrls: ['./activite-search.component.css']
})
export class ActiviteSearchComponent implements OnInit {


  activites : Array<Activite>;

  activiteForm : FormGroup;

  bassins: Array<Bassin>;

  constructor(private bassinService : BassinService, private activiteService : ActiviteService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bassinService.getAllBassins().subscribe(
      data => {
        this.bassins = data,
          this.activiteService.getAllActivites().subscribe(
            data =>   this.activites = data

          )
        this.activiteForm = this.formBuilder.group({
          id: [null, Validators.required],
          nom: [null, Validators.required],
          public_act: [null, Validators.required],
          bassin: [null, Validators.required],
          date_debut: [null, Validators.required],
          date_fin: [null, Validators.required],
          heure_debut: [null, Validators.required],
          heure_fin: [null, Validators.required]
        });

      }

    )


  }

  isNotEmpty(s : string){
    if(s == null)
      return false;
    for(let i = 0 ; i < s.length; i++){
      if(s[i] != ' ')
        return true;
    }
    return false;
  }

  dateValide(date_debut_search: number, date_fin_search: number, date_debut: number, date_fin: number) {
    if(date_debut_search > date_fin_search)
      return false;

    if(date_debut > date_fin_search)
      return false;

    if(date_debut_search > date_fin)
      return false;

    if(date_debut_search < date_debut && date_fin_search > date_debut)
      return true;

    if(date_debut_search < date_fin && date_fin_search > date_fin)
      return true;

    if(date_debut_search < date_debut && date_fin_search > date_debut
    && date_fin_search > date_fin && date_debut_search < date_fin)
      return true;

    return false;
  }





  searchActivites(){


    let id_search = this.activiteForm.get('id').value;

    let nom_search : string = null;
    if( this.activiteForm.get('nom').value != null){
      nom_search = this.activiteForm.get('nom').value.trim().toLowerCase();
    }

    let public_act_search = this.activiteForm.get('public_act').value;

    let id_bassin_search = this.activiteForm.get('bassin').value;

    let d2 = new Date(this.activiteForm.get('date_debut').value);

    if(this.activiteForm.get('heure_debut').value == null || this.activiteForm.get('heure_debut').value.split(':')[0] == ""){
      d2.setHours(0);
      d2.setMinutes(0);

    }
    else{
      let tab = this.activiteForm.get('heure_debut').value.split(':')
      d2.setHours(tab[0]);
      d2.setMinutes(tab[1]);

    }


    let date_debut_search = d2.getTime();

    d2 = new Date(this.activiteForm.get('date_fin').value);

    if( this.activiteForm.get('heure_fin').value == null || this.activiteForm.get('heure_fin').value.split(':')[0] == ""){
      d2.setHours(23);
      d2.setMinutes(59);

    }
    else {
      let tab = this.activiteForm.get('heure_fin').value.split(':')
      d2.setHours(tab[0]);
      d2.setMinutes(tab[1]);
    }
    let date_fin_search = d2.getTime();

    let id : number;
    let nom : string;
    let public_act : string;
    let id_bassin : number;
    let date_debut : number;
    let date_fin : number;

    for(let i = 0; i < this.activites.length; i++){
      id = this.activites[i].id;
      nom = this.activites[i].nom.toLowerCase();
      public_act = this.activites[i].public_act.toString();
      id_bassin = this.activites[i].bassin.id;
      date_debut = new Date(this.activites[i].date_debut).getTime();
      //heure_debut = this.activites[i].date_debut.get
      date_fin = new Date(this.activites[i].date_fin).getTime();



      if(id_search != null &&  id != id_search){
        this.activites.splice(i, 1);
        i--;
      }
      else if(this.isNotEmpty(nom_search) && !nom.includes(nom_search)){
        this.activites.splice(i, 1);
        i--;
      }
      else if(public_act_search != null && public_act_search != "null" && public_act_search != public_act){
        this.activites.splice(i, 1);
        i--;
      }
      else if(id_bassin_search != null && id_bassin_search != "null" && id_bassin_search != id_bassin){

        this.activites.splice(i, 1);
        i--;
      }
      else if(date_debut_search != 0 && this.activiteForm.get('date_debut').value != null
        && this.activiteForm.get('date_debut').value != ""
        && date_fin_search != 0 && this.activiteForm.get('date_fin').value != null
        && this.activiteForm.get('date_fin').value != ""
        && !this.dateValide(date_debut_search, date_fin_search, date_debut, date_fin)){
        this.activites.splice(i, 1);
        i--;
      }
    }

  }


  onSubmit(){

    this.activiteService.getAllActivites().subscribe(
      data => {
        this.activites = data,
          this.searchActivites()
      }
    )


  }


}
