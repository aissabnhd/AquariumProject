import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalService} from "../animal.service";
import {Animal, Sexe} from "../animal";
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-animal-update',
  templateUrl: './animal-update.component.html',
  styleUrls: ['./animal-update.component.css']
})
export class AnimalUpdateComponent implements OnInit {

  animalForm: FormGroup;
  especes : Array<Espece>;
  sexes = [Sexe.F, Sexe.M];
  id:number;

  role : Role;

  @Output()
  updateAnimal = new EventEmitter<Animal>();
  constructor(private router : Router, private especeService : EspeceService, private animalService : AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role'];
    let animal: Animal;


      this.animalService.getAnimal(this.id).subscribe(data => {
        this.animalForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          sexe: new FormControl(data.sexe),
          espece: new FormControl(data.espece.id),
          signe_distinctif: new FormControl(data.signe_distinctif),
          date_arrive: new FormControl(new Date(data.date_arrive).toISOString().substring(0, 10)),
          date_depart: new FormControl(new Date(data.date_depart).toISOString().substring(0, 10))
        });

      }
    );


    this.especeService.getAllEspeces().subscribe(
      data => this.especes = data

    )
  }

  onSubmit(){
    let animal: Animal =  this.animalForm.value;
    animal.id = this.id;
    let espece = this.especeService.getEspece(this.animalForm.get('espece').value)
    espece.subscribe(
      data => {
        animal.espece = data,
        this.animalService.updateAnimal(animal, animal.id).subscribe(
          data2 => {
            this.router.navigate(['/animaux/'+this.role]);
            this.updateAnimal.emit(animal)
          },

          error => console.log(error)
        );
      }
    );


  }

}
