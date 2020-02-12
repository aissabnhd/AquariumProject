import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";
@Component({
  selector: 'app-bassin',
  templateUrl: './bassin.component.html',
  styleUrls: ['./bassin.component.css']
})
export class BassinComponent implements OnInit {
 @Input()
  bassin : Bassin;

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
