import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {Animal} from "../animal";
import {AnimalService} from "../animal.service";
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  @Input()
  animal : Animal;

  @Input()
  role : Role;

  @Output()
  deleteAnimal = new EventEmitter<Animal>();
  constructor(private snackBar : MatSnackBar, private animalService: AnimalService) { }

  ngOnInit() {
  }

  onDelete(){
    this.animalService.deleteAnimal(this.animal.id).subscribe(
      data => {
        this.snackBar.open('Animal supprimé !', 'OK', { verticalPosition: 'top', duration: 5000 });
        this.deleteAnimal.emit(this.animal)
      },
      error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })
    )
  }



  formatDate(nombre : number, chiffre : number) {

    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {
    }
    return temp;
  }

  dateToString(d : Date){
    let d2 = new Date(d);
    return "" + this.formatDate(d2.getDate(), 2) + "/" + this.formatDate(d2.getMonth()+1, 2) + "/" + this.formatDate(d2.getFullYear(), 4);
  }


}
