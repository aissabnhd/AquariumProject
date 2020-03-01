import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Bassin, State} from "../bassin";
import {BassinService} from "../bassin.service";
import {Employe, Role} from "../../employes/employe";
import {EmployeService} from "../../employes/employe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bassin-create',
  templateUrl: './bassin-create.component.html',
  styleUrls: ['./bassin-create.component.css']
})
export class BassinCreateComponent implements OnInit {
  bassinForm : FormGroup;

  employes : Array<Employe>;

  role : Role;

  @Output()
  createBassin = new EventEmitter<Bassin>();
  states = [State.propre, State.sale];
  constructor(private router : Router, private bassinService : BassinService, private employeService : EmployeService, private formBuilder: FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role']
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
      data => {
        this.router.navigate(['/bassins/'+this.role]);
        this.createBassin.emit(bassin)
      },
      error => console.log(error)
    );
  }

}
