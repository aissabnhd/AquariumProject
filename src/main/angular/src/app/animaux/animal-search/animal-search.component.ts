import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {Animal, Sexe} from "../animal";
import {AnimalService} from "../animal.service";
import {Role} from "../../employes/employe";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-animal-search',
  templateUrl: './animal-search.component.html',
  styleUrls: ['./animal-search.component.css']
})
export class AnimalSearchComponent implements OnInit {

    animaux : Array<Animal>;

    sexes = [Sexe.F, Sexe.M];

  animalForm : FormGroup;

  role : Role;

  private especes: Array<Espece>;

  constructor(private especeService : EspeceService, private animalService : AnimalService, private formBuilder: FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
       this.especeService.getAllEspeces().subscribe(
             data => {
               this.especes = data,
                 this.animalService.getAllAnimaux().subscribe(
                             data =>   this.animaux = data

                    )
                 this.animalForm = this.formBuilder.group({
                   id: [null, Validators.required],
                   nom: [null, Validators.required],
                   sexe:  [null, Validators.required],
                   espece:  [null, Validators.required],
                   signe_distinctif: [null, Validators.required],
                   date_arrive: [null, Validators.required],
                   date_depart: [null, Validators.required]
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




  searchAnimaux(){



  let id_search = this.animalForm.get('id').value;

  let nom_search : string = null;
  if( this.animalForm.get('nom').value != null){
   nom_search = this.animalForm.get('nom').value.trim().toLowerCase();
   }

  let sexe_search = this.animalForm.get('sexe').value;

  let signe_distinctif_search = null;
  if(this.animalForm.get('signe_distinctif').value != null){
   signe_distinctif_search = this.animalForm.get('signe_distinctif').value.trim().toLowerCase();
   }

   let id_espece_search = this.animalForm.get('espece').value;

    let date_arrive_search = new Date(this.animalForm.get('date_arrive').value).getTime();

    let date_depart_search = new Date(this.animalForm.get('date_depart').value).getTime();

    let id : number;
    let nom : string;
    let sexe : Sexe;
    let signe_distinctif : string;
    let id_espece : number;
    let date_arrive : number;
    let date_depart : number;

  for(let i = 0; i < this.animaux.length; i++){
  console.log(this.animaux[i])
        id = this.animaux[i].id;
        nom = this.animaux[i].nom.toLowerCase();
        sexe = this.animaux[i].sexe;
        signe_distinctif = this.animaux[i].signe_distinctif.toLowerCase();
        id_espece = this.animaux[i].espece.id;
        date_arrive = new Date(this.animaux[i].date_arrive).getTime();
        date_depart = new Date(this.animaux[i].date_depart).getTime();



        if(id_search != null &&  id != id_search){
            this.animaux.splice(i, 1);
            i--;
        }
        else if(this.isNotEmpty(nom_search) && !nom.includes(nom_search)){
            this.animaux.splice(i, 1);
             i--;
        }
        else if(sexe_search != null && sexe_search != "null" && sexe != sexe_search){
            this.animaux.splice(i, 1);
            i--;
         }
         else if(this.isNotEmpty(signe_distinctif_search) && !signe_distinctif.includes(signe_distinctif_search)){
                     this.animaux.splice(i, 1);
                      i--;
                 }
         else if(id_espece_search != null && id_espece_search != "null" && id_espece != id_espece_search){
                     this.animaux.splice(i, 1);
                     i--;
                  }
         else if(date_arrive_search != 0 && this.animalForm.get('date_arrive').value != null && this.animalForm.get('date_arrive').value != "" && date_arrive != date_arrive_search){
                  console.log(date_arrive_search)
                  console.log(this.animalForm.get('date_arrive').value)
                  this.animaux.splice(i, 1);
                  i--;
         }
         else if(date_depart_search != 0 && this.animalForm.get('date_depart').value != null && this.animalForm.get('date_depart').value != "" && date_depart != date_depart_search){
                 this.animaux.splice(i, 1);
                  i--;
         }
     }

  }


  onSubmit(){

    this.animalService.getAllAnimaux().subscribe(
              data => {
              this.animaux = data,
              this.searchAnimaux()
              }
     )


}

}
