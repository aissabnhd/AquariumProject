import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Bassin, State} from "../bassin";
import {BassinService} from "../bassin.service";

@Component({
  selector: 'app-bassin-create',
  templateUrl: './bassin-create.component.html',
  styleUrls: ['./bassin-create.component.css']
})
export class BassinCreateComponent implements OnInit {
  bassinForm : FormGroup;

  @Output()
  createBassin = new EventEmitter<Bassin>();
  states = [State.propre, State.sale];
  constructor(private bassinService : BassinService, private formBuilder: FormBuilder) { }

  ngOnInit() {

      this.bassinForm = this.formBuilder.group({
            nom: [null, Validators.required],
            etat: new FormControl(this.states[0]),
            capacite_max: [null, Validators.required],
            volume: [null, Validators.required],
          });
      }



  onSubmit(){
    let bassin: Bassin =  this.bassinForm.value;

    this.bassinService.createBassin(bassin).subscribe(
      data => this.createBassin.emit(bassin),
      error => console.log(error)
    );
  }

}
