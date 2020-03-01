import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../employes/employe";
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
  constructor(private bassinService: BassinService) { }

  ngOnInit() {
  }

  onDelete(){
    this.bassinService.deleteBassin(this.bassin.id).subscribe(
      data => this.deleteBassin.emit(this.bassin),
      error => console.log(error)
    )
  }


}
