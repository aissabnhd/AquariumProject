import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {Animal, Sexe} from "../animal";
import {AnimalService} from "../animal.service";
import {Role} from "../../employes/employe";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";




@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {
  especes : Array<Espece>;

  animalForm : FormGroup;

  role : Role;
  @Output()
  createAnimal = new EventEmitter<Animal>();
  sexes = [Sexe.F, Sexe.M];
  constructor(private snackBar : MatSnackBar, private router : Router, private animalService : AnimalService, private formBuilder: FormBuilder, private especeService : EspeceService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
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
      data => {
        this.snackBar.open('Animal créé !', 'OK', { verticalPosition: 'top', duration:5000 });
        this.router.navigate(['/animaux/'+this.role]);
        this.createAnimal.emit(animal)
      },
      error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })

  );
  }


}
