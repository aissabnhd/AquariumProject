import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activite} from "../activite";
import {ActiviteService} from "../activite.service";

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  @Input()
  activite : Activite;

  @Output()
  deleteActivite = new EventEmitter<Activite>();
  constructor(private activiteService: ActiviteService) { }

  ngOnInit() {
  }

  onDelete(){
    this.activiteService.deleteActivite(this.activite.id).subscribe(
      data => this.deleteActivite.emit(this.activite),
      error => console.log(error)
    )
  }



  formatDate(nombre : number, chiffre : number) {
    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {}
    return temp;
  }

  dateToString(d : Date){
    let d2 = new Date(d);
    return "" + this.formatDate(d2.getDay(), 2) + "/" + this.formatDate(d2.getMonth(), 2) + "/" + this.formatDate(d2.getFullYear(), 4) + '-> ' + this.formatDate(d2.getHours(), 2) + 'h' + this.formatDate(d2.getMinutes(), 2);
  }

}
