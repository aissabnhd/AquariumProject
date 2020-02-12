import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BassinService} from "../bassin.service";
import {Bassin, State} from "../bassin";

@Component({
  selector: 'app-bassin-update',
  templateUrl: './bassin-update.component.html',
  styleUrls: ['./bassin-update.component.css']
})
export class BassinUpdateComponent implements OnInit {

  bassinForm: FormGroup;
  states = [State.propre, State.sale];
  id:number;

  @Output()
  updateBassin = new EventEmitter<Bassin>();
  constructor(private bassinService : BassinService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let bassin: Bassin;


      this.bassinService.getBassin(this.id).subscribe(data => {
        this.bassinForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          etat: new FormControl(data.etat),
          volume: new FormControl(data.volume),
          capacite_max: new FormControl(data.capacite_max)
        });

      }
    );

  }

  onSubmit(){
    let bassin: Bassin =  this.bassinForm.value;
    this.bassinService.updateBassin(bassin, bassin.id).subscribe(
            data => this.updateBassin.emit(bassin),
            error => console.log(error)

    )


  }
}
