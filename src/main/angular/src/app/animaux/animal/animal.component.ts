import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Espece} from "../../especes/espece";
import {EspeceService} from "../../especes/espece.service";
import {Animal} from "../animal";
import {AnimalService} from "../animal.service";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  @Input()
  animal : Animal;

  @Output()
  deleteAnimal = new EventEmitter<Animal>();
  constructor(private animalService: AnimalService) { }

  ngOnInit() {
  }

  onDelete(){
    this.animalService.deleteAnimal(this.animal.id).subscribe(
      data => this.deleteAnimal.emit(this.animal),
      error => console.log(error)
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
