import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActiviteService} from "../../activites/activite.service";
import {Activite} from "../../activites/activite";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  id:number;
  activites : Array<Activite>;
  heures : Array<String> = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  semaines : Array<number> = [];
  annees : Array<number> = [2019, 2020];
  calendrierForm: FormGroup;
  begin : Date;
  end : Date;
  role : Role;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private activiteService : ActiviteService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role'];
    for(let i = 0; i < 54; i++){
      this.semaines.push(i);
    }
    this.calendrierForm = this.formBuilder.group({
      semaine : new FormControl(this.semaines[0]),
      annee : new FormControl(this.annees[0])

      }
    )
  }

  formatDate(nombre : number, chiffre : number) {

    var temp = '' + nombre;
    while ((temp.length < chiffre) && (temp = '0' + temp)) {
    }
    return temp;
  }

  dateToString(d : Date){
    let d2 = new Date(d);
    return "" + this.formatDate(d2.getDate(), 2) + "/" + this.formatDate(d2.getMonth()+1, 2) + "/" + this.formatDate(d2.getFullYear(), 4);
  }

  filterActivities(){
    let lst = []
    for(let i = 0; i < this.activites.length; i++){
      if(this.containsDate(new Date(this.activites[i].date_debut))) {
        lst.push(this.activites[i]);
      }
    }
    this.activites = lst;

  }

  containsDate(d : Date){
    return this.begin < d && this.end > d;

  }

  getBeginEndOfWeek(semaine, an){
    if(semaine == 0){
      this.begin = new Date();
      this.begin.setFullYear(an, 0, 1);
      let firstDay =  this.begin.getDay();
      let lgth = (8 - firstDay);
      let ajout = (semaine)*7 + (lgth + 1);
      this.end = new Date();
      this.end.setFullYear(an, 0, ajout-1);
      return this.dateToString(this.begin)+" - " +this.dateToString(this.end);
    }
    let debut = new Date();
    debut.setUTCFullYear(an,0,1);
    let firstDay =  debut.getDay();
    let lgth = (8 - firstDay);
    let ajout = (semaine - 1)*7 + (lgth + 1);
    this.begin = new Date();
    this.begin.setFullYear(an, 0, ajout);
    this.begin.setHours(0);
    this.begin.setMinutes(0);
    this.end = new Date();
    this.end.setFullYear(an,0,ajout+6);

    let fin = new Date();
    fin.setFullYear(an, 11, 31);
    if(this.end.getTime() > fin.getTime()) {
      this.end.setFullYear(an, 11, 31);
    }
      this.end.setHours(23);
      this.end.setMinutes(59);
    if(this.begin.getFullYear() == an+1){
      this.semaines.splice(semaine);
    }
    return this.dateToString(this.begin)+" - " +this.dateToString(this.end);
  }

  onSubmit() {
    this.activiteService.getActivitesOfEmploye(this.id).subscribe(
      data => {
        this.activites = data,
          this.getBeginEndOfWeek(this.calendrierForm.get('semaine').value, this.calendrierForm.get('annee').value),
        this.filterActivities()
      });


  }
}
