import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Espece} from "../../especes/espece";
import {Employe} from "../employe";
import {EmployeService} from "../employe.service";

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  @Input()
  employe : Employe;

  @Output()
  deleteEmploye = new EventEmitter<Employe>();
  constructor(private employeService: EmployeService) { }

  ngOnInit() {
  }

  formatDate(nombre : number, chiffre : number) {
    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {}
    return temp;
  }

  dateToString(d : Date){
    let d2 = new Date(d);
    return "" + this.formatDate(d2.getDate(), 2) + "/" + this.formatDate(d2.getMonth()+1, 2) + "/" + this.formatDate(d2.getFullYear(), 4);
  }

  onDelete(){
    this.employeService.deleteEmploye(this.employe.id).subscribe(
      data => this.deleteEmploye.emit(this.employe),
      error => console.log(error)
    )
  }

}
