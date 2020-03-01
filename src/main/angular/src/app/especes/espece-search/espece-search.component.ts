import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-espece-search',
  templateUrl: './espece-search.component.html',
  styleUrls: ['./espece-search.component.css']
})
export class EspeceSearchComponent implements OnInit {
  especeForm = this.formBuilder.group({
         id : [null, Validators.required],
         nom: [null, Validators.required],
         esperance: [null, Validators.required],
         regime: [null, Validators.required],
         menace: [null, Validators.required],
       });

  role : Role;
  private especes: Array<Espece>;

  constructor(private especeService : EspeceService, private formBuilder: FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
       this.especeService.getAllEspeces().subscribe(
          data => this.especes = data
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




  searchEspeces(){
  let id_search = this.especeForm.get('id').value;
  let nom_search : string = null;
  if( this.especeForm.get('nom').value != null){
   nom_search = this.especeForm.get('nom').value.trim().toLowerCase();
   }
  let esperance_search = this.especeForm.get('esperance').value;
  let regime_search = null;
  if(this.especeForm.get('regime').value != null){
   regime_search = this.especeForm.get('regime').value.trim().toLowerCase();
   }
   let menace_search = this.especeForm.get('menace').value;

    let id : number;
    let nom : string;
    let esperance : number;
    let regime : string;
    let menace : number;


  for(let i = 0; i < this.especes.length; i++){
        id = this.especes[i].id;
        nom = this.especes[i].nom.toLowerCase();
        esperance = this.especes[i].esperance;
        regime = this.especes[i].regime.toLowerCase();
        menace = this.especes[i].menace;

        if(id_search != null &&  id != id_search){
            this.especes.splice(i, 1);
            i--;
        }
        else if(this.isNotEmpty(nom_search) && !nom.includes(nom_search)){
            this.especes.splice(i, 1);
             i--;
        }

        else if(esperance_search != null && esperance != esperance_search){
            this.especes.splice(i, 1);
            i--;
        }
        else if(this.isNotEmpty(regime_search) && !regime.includes(regime_search)){
            this.especes.splice(i, 1);
             i--;
        }
        else if(menace_search != null && menace != menace_search){
             this.especes.splice(i, 1);
             i--;
         }
      }
  }


  onSubmit(){

    this.especeService.getAllEspeces().subscribe(
              data => {
              this.especes = data,
              this.searchEspeces()
              }
     )


}

}









