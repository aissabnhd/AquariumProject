import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service'
import {BassinService} from "../../bassins/bassin.service";
import {Bassin} from "../../bassins/bassin";

@Component({
  selector: 'app-espece-update',
  templateUrl: './espece-update.component.html',
  styleUrls: ['./espece-update.component.css']
})
export class EspeceUpdateComponent implements OnInit {
 especeForm: FormGroup;

       id:number;

       @Output()
       updateEspece = new EventEmitter<Espece>();
   bassins: Array<Bassin>;
  constructor(private especeService : EspeceService, private bassinService: BassinService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      let esp: Espece;
      this.especeService.getEspece(this.id).subscribe(data => {

       this.especeForm = new FormGroup({
              id: new FormControl(this.id),
              nom: new FormControl(data.nom),
              esperance: new FormControl(data.esperance),
              regime: new FormControl(data.regime),
              menace: new FormControl(data.menace),
              bassin: new FormControl(data.bassin.id)

       });
           }
            );
      this.bassinService.getAllBassins().subscribe(
        data => this.bassins = data

      )
  }

  onSubmit(){
            let espece: Espece =  this.especeForm.value;
            espece.id = this.id;
            espece.bassin = null;
            this.especeService.updateEspece(espece, this.especeForm.get("bassin").value).subscribe(
              data => this.updateEspece.emit(espece),
              error => console.log(error)
            );

          }

}









