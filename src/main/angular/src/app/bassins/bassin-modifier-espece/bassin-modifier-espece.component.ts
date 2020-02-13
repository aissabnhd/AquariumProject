import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Espece} from "../../especes/espece";
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";
import {ActivatedRoute} from "@angular/router";
import {EspeceService} from "../../especes/espece.service";

@Component({
  selector: 'app-bassin-modifier-espece',
  templateUrl: './bassin-modifier-espece.component.html',
  styleUrls: ['./bassin-modifier-espece.component.css']
})
export class BassinModifierEspeceComponent implements OnInit {
  bassinAjoutForm: FormGroup;
  espece_ajout: Array<Espece>;
  bassin: Bassin;
  id : number;
  updateBassin = new EventEmitter<Bassin>();

  constructor(private bassinService : BassinService, private especeService : EspeceService, private route: ActivatedRoute) { }

  refresh(){
    this.bassinService.getBassin(this.id).subscribe(
      data => {

        this.especeService.getAllEspeces().subscribe(
          data2 => {
            this.bassin = data,
            this.espece_ajout = data2,
              this.extracted(),
              this.bassinAjoutForm.get('ajout').reset()
              console.log('espece_ajout :'),
              console.log(this.espece_ajout)

          }
        );
      }
    );
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.refresh();
    this.bassinAjoutForm = new FormGroup({
      ajout: new FormControl(this.espece_ajout)
    });
  }

   extracted() {
    for (let i = 0; i < this.espece_ajout.length; i++) {
      for (let j = 0; j < this.bassin.lst.length; j++) {
        if (this.espece_ajout[i].id == this.bassin.lst[j].id) {

          this.espece_ajout.splice(i, 1);
          i--;
          j = this.bassin.lst.length;
        }
      }

    }
  }
  onDelete(id : number) {
    this.bassinService.removeEspeceBassin(this.bassin.id, id).subscribe(
      data => {
        this.updateBassin.emit(data),
          this.refresh()
      }

    )

  }

   onAdd(id : number) {
      this.bassinService.assignEspeceBassin(this.bassin.id, id).subscribe(
        data => {
          this.updateBassin.emit(data),
            this.refresh()
        }

      )

    }
}
