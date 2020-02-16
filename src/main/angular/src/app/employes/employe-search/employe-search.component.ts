import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {Employe, Role} from "../employe";
import {EmployeService} from "../employe.service";

@Component({
  selector: 'app-employe-search',
  templateUrl: './employe-search.component.html',
  styleUrls: ['./employe-search.component.css']
})
export class EmployeSearchComponent implements OnInit {

  employeForm = this.formBuilder.group({
    id : [null, Validators.required],
    nom: [null, Validators.required],
    prenom: [null, Validators.required],
    adresse: [null, Validators.required],
    date_naissance: [null, Validators.required],
    num_secu_sociale: [null, Validators.required],
    role: [null, Validators.required],
  });

  roles = [Role.employe, Role.gestionnaire, Role.admin];

  private employes: Array<Employe>;

  constructor(private employeService : EmployeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeService.getAllEmployes().subscribe(
      data => this.employes = data
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




  searchEmployes(){
    let id_search = this.employeForm.get('id').value;
    let nom_search : string = null;
    if( this.employeForm.get('nom').value != null){
      nom_search = this.employeForm.get('nom').value.trim().toLowerCase();
    }
    let prenom_search : string = null;
    if( this.employeForm.get('prenom').value != null){
      prenom_search = this.employeForm.get('prenom').value.trim().toLowerCase();
    }
    let adresse_search : string = null;
    if( this.employeForm.get('adresse').value != null){
      adresse_search = this.employeForm.get('adresse').value.trim().toLowerCase();
    }
    let date_naissance_search = new Date(this.employeForm.get('date_naissance').value).getTime();
    let num_secu_sociale_search = this.employeForm.get('num_secu_sociale').value;
    let role_search = this.employeForm.get('role').value;

    let id : number;
    let nom : string;
    let prenom : string;
    let adresse : string;
    let date_naissance : number;
    let num_secu_sociale : number;
    let role : Role;


    for(let i = 0; i < this.employes.length; i++){
      id = this.employes[i].id;
      nom = this.employes[i].nom.toLowerCase();
      prenom = this.employes[i].prenom.toLowerCase();
      adresse = this.employes[i].adresse.toLowerCase();
      date_naissance = new Date(this.employes[i].date_naissance).getTime();
      num_secu_sociale = this.employes[i].num_secu_sociale;
      role = this.employes[i].role;

      if(id_search != null &&  id != id_search){
        this.employes.splice(i, 1);
        i--;
      }
      else if(this.isNotEmpty(nom_search) && !nom.includes(nom_search)){
        this.employes.splice(i, 1);
        i--;
      }
      else if(this.isNotEmpty(prenom_search) && !prenom.includes(prenom_search)){
        this.employes.splice(i, 1);
        i--;
      }
      else if(this.isNotEmpty(adresse_search) && !adresse.includes(adresse_search)){
        this.employes.splice(i, 1);
        i--;
      }
      else if(date_naissance_search != 0 && this.employeForm.get('date_naissance').value != null && this.employeForm.get('date_naissance').value != "" && date_naissance != date_naissance_search){
        this.employes.splice(i, 1);
        i--;
      }
      else if(num_secu_sociale_search != null && num_secu_sociale != num_secu_sociale_search){
        this.employes.splice(i, 1);
        i--;
      }
      else if(role_search != null && role_search != "null" && role != role_search){
        this.employes.splice(i, 1);
        i--;
      }






    }
  }


  onSubmit(){

    this.employeService.getAllEmployes().subscribe(
      data => {
        this.employes = data,
          this.searchEmployes()
      }
    )


  }

}
