import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../employes/employe";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-bassin',
  templateUrl: './bassin.component.html',
  styleUrls: ['./bassin.component.css']
})
export class BassinComponent implements OnInit {
 @Input()
  bassin : Bassin;

 @Input()
 role : Role;

  @Output()
  deleteBassin = new EventEmitter<Bassin>();
  constructor(private snackBar : MatSnackBar, private bassinService: BassinService) { }

  ngOnInit() {
  }

  onDelete(){
    this.bassinService.deleteBassin(this.bassin.id).subscribe(
      data => {
        this.snackBar.open('Bassin supprimé !', 'OK', { verticalPosition: 'top', duration: 5000 });
        this.deleteBassin.emit(this.bassin)
      },
      error => this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })
    )
  }


}
