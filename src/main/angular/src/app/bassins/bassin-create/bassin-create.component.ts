import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Bassin, State} from "../bassin";
import {BassinService} from "../bassin.service";
import {Employe} from "../../employes/employe";
import {EmployeService} from "../../employes/employe.service";

@Component({
  selector: 'app-bassin-create',
  templateUrl: './bassin-create.component.html',
  styleUrls: ['./bassin-create.component.css']
})
export class BassinCreateComponent implements OnInit {
  bassinForm : FormGroup;

  employes : Array<Employe>;

  @Output()
  createBassin = new EventEmitter<Bassin>();
  states = [State.propre, State.sale];
  constructor(private bassinService : BassinService, private employeService : EmployeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.employeService.getAllEmployes().subscribe(
        data => {
          this.employes = data;
          this.bassinForm = this.formBuilder.group({
            nom: [null, Validators.required],
            etat: new FormControl(this.states[0]),
            capacite_max: [null, Validators.required],
            volume: [null, Validators.required],
            employe: new FormControl(this.employes[0].id)
          });
        }
       )
      }



  onSubmit(){
    let bassin: Bassin =  this.bassinForm.value;

    this.bassinService.createBassin(bassin, this.bassinForm.get('employe').value).subscribe(
      data => this.createBassin.emit(bassin),
      error => console.log(error)
    );
  }

}
