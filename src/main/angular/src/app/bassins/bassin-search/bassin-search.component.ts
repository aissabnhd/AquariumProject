import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {BassinService} from "../bassin.service";
import {Bassin, State} from "../bassin";

@Component({
  selector: 'app-bassin-search',
  templateUrl: './bassin-search.component.html',
  styleUrls: ['./bassin-search.component.css']
})
export class BassinSearchComponent implements OnInit {


    bassins : Array<Bassin>;

    states = [State.propre, State.sale];


  bassinForm : FormGroup;

  private especes: Array<Espece>;

  constructor(private bassinService : BassinService, private especeService : EspeceService, private formBuilder: FormBuilder) { }
  ngOnInit() {
       this.especeService.getAllEspeces().subscribe(
             data => {
               this.especes = data,
                 this.bassinService.getAllBassins().subscribe(
                             data =>   this.bassins = data

                    )
                 this.bassinForm = this.formBuilder.group({
                   id: [null, Validators.required],
                   nom: [null, Validators.required],
                   capacite_max:  [null, Validators.required],
                   volume:  [null, Validators.required],
                   etat: [null, Validators.required],
                   espece: [null, Validators.required],
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




  searchBassins(){


  let id_search = this.bassinForm.get('id').value;

  let nom_search : string = null;
  if( this.bassinForm.get('nom').value != null){
   nom_search = this.bassinForm.get('nom').value.trim().toLowerCase();
   }

   let capacite_max_search = this.bassinForm.get('capacite_max').value;

   let volume_search = this.bassinForm.get('volume').value;


   let etat_search = this.bassinForm.get('etat').value;

   let id_espece_search = this.bassinForm.get('espece').value;


    let id : number;
    let nom : string;
    let capacite_max : number;
    let volume : number;
    let etat : State;
    let lst_espece : Array<Espece>;

  for(let i = 0; i < this.bassins.length; i++){
        id = this.bassins[i].id;
        nom = this.bassins[i].nom.toLowerCase();
        capacite_max = this.bassins[i].capacite_max;
        volume = this.bassins[i].volume;
        lst_espece = this.bassins[i].lst;
        etat = this.bassins[i].etat;



        if(id_search != null &&  id != id_search){
            this.bassins.splice(i, 1);
            i--;
        }
        else if(this.isNotEmpty(nom_search) && !nom.includes(nom_search)){
            this.bassins.splice(i, 1);
             i--;
        }
        else if(etat_search != null && etat_search != "null" && etat != etat_search){
            this.bassins.splice(i, 1);
            i--;
         }
         else if(capacite_max_search != null &&  capacite_max != capacite_max_search){
                          this.bassins.splice(i, 1);
                          i--;
                      }
         else if(id_espece_search != null && id_espece_search != "null"){
                   let t = false;
                  for(let i = 0; i < lst_espece.length; i++){

                      if(lst_espece[i].id == id_espece_search){
                          t = true;
                       }

                  }
                  if(!t){
                      this.bassins.splice(i, 1);
                      i--;
                  }
          }
         else if(volume_search != null &&  volume_search != volume){
                  this.bassins.splice(i, 1);
                 i--;
         }
     }

  }


  onSubmit(){

    this.bassinService.getAllBassins().subscribe(
              data => {
              this.bassins = data,
              this.searchBassins()
              }
     )


}
}
