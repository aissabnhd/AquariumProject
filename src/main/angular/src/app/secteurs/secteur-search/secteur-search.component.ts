import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Secteur} from "../secteur";
import {SecteurService} from "../secteur.service";
import {BassinService} from "../../bassins/bassin.service";
import {Bassin, State} from "../../bassins/bassin";

@Component({
  selector: 'app-secteur-search',
  templateUrl: './secteur-search.component.html',
  styleUrls: ['./secteur-search.component.css']
})
export class SecteurSearchComponent implements OnInit {


    bassins : Array<Bassin>;

    states = [State.propre, State.sale];


  secteurForm : FormGroup;

  secteurs: Array<Secteur>;

  constructor(private bassinService : BassinService, private secteurService : SecteurService, private formBuilder: FormBuilder) { }
  ngOnInit() {
       this.bassinService.getAllBassins().subscribe(
             data => {
               this.bassins = data,
                 this.secteurService.getAllSecteurs().subscribe(
                             data =>   this.secteurs = data

                    )
                 this.secteurForm = this.formBuilder.group({
                   id: [null, Validators.required],
                   nom: [null, Validators.required],
                   localisation:  [null, Validators.required],
                   bassin_id:  [null, Validators.required]
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




  searchSecteurs(){


  let id_search = this.secteurForm.get('id').value;

  let nom_search : string = null;
  if( this.secteurForm.get('nom').value != null){
   nom_search = this.secteurForm.get('nom').value.trim().toLowerCase();
   }

   let localisation_search = this.secteurForm.get('localisation').value;

   let bassin_id_search = this.secteurForm.get('bassin_id').value;


    let id : number;
    let nom : string;
    let localisation : string;
    let lst_bassin : Array<Bassin>;

  for(let i = 0; i < this.secteurs.length; i++){
        id = this.secteurs[i].id;
        nom = this.secteurs[i].nom.toLowerCase();
        localisation = this.secteurs[i].localisation.toLowerCase();
        lst_bassin = this.secteurs[i].lstBassin;


        if(id_search != null &&  id != id_search){
            this.secteurs.splice(i, 1);
            i--;
        }
        else if(this.isNotEmpty(nom_search) && !nom.includes(nom_search)){
            this.secteurs.splice(i, 1);
             i--;
        }
        else if(this.isNotEmpty(localisation_search) && !localisation.includes(localisation_search)){
              this.secteurs.splice(i, 1);
              i--;
        }
         else if(bassin_id_search != null && bassin_id_search != "null"){
                   let t = false;
                  for(let j = 0; j < lst_bassin.length; j++){

                      if(lst_bassin[j].id == bassin_id_search){
                          t = true;
                       }

                  }
                  if(!t){
                      this.secteurs.splice(i, 1);
                      i--;
                  }
          }
     }

  }


  onSubmit(){

    this.secteurService.getAllSecteurs().subscribe(
              data => {
              this.secteurs = data,
              this.searchSecteurs()
              }
     )


}

}
