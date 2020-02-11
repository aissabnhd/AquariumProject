import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {ActivatedRoute} from "@angular/router";
import {AnimalService} from "../animal.service";
import {Animal, Sexe} from "../animal";

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

  @Output()
  updateAnimal = new EventEmitter<Animal>();
  constructor(private especeService : EspeceService, private animalService : AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let animal: Animal;


      this.animalService.getAnimal(this.id).subscribe(data => {
        this.animalForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          sexe: new FormControl(data.sexe),
          espece: new FormControl(data.espece.id),
          signe_distinctif: new FormControl(data.signe_distinctif),
          date_arrive: new FormControl(data.date_arrive),
          date_depart: new FormControl(data.date_depart)
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
          data2 => this.updateAnimal.emit(animal),

          error => console.log(error)
        );
      }
    );


  }

}
