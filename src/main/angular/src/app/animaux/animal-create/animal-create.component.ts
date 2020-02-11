import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {Animal, Sexe} from "../animal";
import {AnimalService} from "../animal.service";

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {
  especes : Array<Espece>;

  animalForm : FormGroup;

  @Output()
  createAnimal = new EventEmitter<Animal>();
  sexes = [Sexe.F, Sexe.M];
  constructor(private animalService : AnimalService, private formBuilder: FormBuilder, private especeService : EspeceService) { }

  ngOnInit() {
    this.especeService.getAllEspeces().subscribe(
      data => {
        this.especes = data,

          this.animalForm = this.formBuilder.group({
            nom: [null, Validators.required],
            sexe: new FormControl(this.sexes[0]),
            espece: new FormControl(this.especes[0].id),
            signe_distinctif: [null, Validators.required],
            date_arrive: [null, Validators.required],
            date_depart: [null, Validators.required]
          });
      }

    )


  }

  onSubmit(){
    let animal: Animal =  this.animalForm.value;
    animal.espece = null;

    this.animalService.createAnimal(animal, (this.animalForm.get('espece').value)).subscribe(
      data => this.createAnimal.emit(animal),
      error => console.log(error)
    );
  }


}
