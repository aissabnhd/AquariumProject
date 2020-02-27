import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BassinService} from "../bassin.service";
import {Bassin, State} from "../bassin";
import {Employe} from "../../employes/employe";
import {EmployeService} from "../../employes/employe.service";

@Component({
  selector: 'app-bassin-update',
  templateUrl: './bassin-update.component.html',
  styleUrls: ['./bassin-update.component.css']
})
export class BassinUpdateComponent implements OnInit {

  bassinForm: FormGroup;
  states = [State.propre, State.sale];
  id:number;
  employes : Array<Employe>;

  @Output()
  updateBassin = new EventEmitter<Bassin>();
  constructor(private bassinService : BassinService, private employeService : EmployeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let bassin: Bassin;


      this.bassinService.getBassin(this.id).subscribe(data => {
        this.bassinForm = new FormGroup({
          id: new FormControl(this.id),
          nom: new FormControl(data.nom),
          etat: new FormControl(data.etat),
          volume: new FormControl(data.volume),
          capacite_max: new FormControl(data.capacite_max),
          employe: new FormControl(data.responsable.id)
        });

      }
    );


      this.employeService.getAllEmployes().subscribe(
        data => this.employes = data
      )

  }

  onSubmit(){
    let bassin: Bassin =  this.bassinForm.value;
    this.bassinService.updateBassin(bassin, bassin.id, this.bassinForm.get('employe').value).subscribe(
            data => this.updateBassin.emit(bassin),
            error => console.log(error)

    )


  }
}
